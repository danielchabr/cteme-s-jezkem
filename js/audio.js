/* =========================================================================
 * audio.js — Czech speech (Web Speech API) + happy SFX (Web Audio API).
 * No downloaded media; everything is synthesized in the browser.
 * Exposes a global `Sound`.
 * ========================================================================= */

const Sound = (function () {
  /* ---- Speech: prefer a real cs-CZ voice, fall back to lang hint ------- */
  let czVoice = null;
  let hasCzech = false;

  function pickVoice() {
    const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    // Prefer an explicitly Czech voice (macOS: "Zuzana").
    czVoice = voices.find(v => /cs(-|_)?CZ/i.test(v.lang)) ||
              voices.find(v => /^cs/i.test(v.lang)) ||
              voices.find(v => /zuzana|czech|česk/i.test(v.name)) || null;
    hasCzech = !!czVoice;
    return czVoice;
  }

  if (window.speechSynthesis) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  /* Speak Czech text, kid-slow and clear. cb() runs when finished. */
  function say(text, opts) {
    opts = opts || {};
    if (!window.speechSynthesis) { if (opts.onend) opts.onend(); return; }
    try { speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(text);
    if (czVoice) u.voice = czVoice;
    u.lang = "cs-CZ";
    u.rate = opts.rate != null ? opts.rate : 0.8; // a touch slow for a 6yo
    u.pitch = opts.pitch != null ? opts.pitch : 1.05;
    if (opts.onend) u.onend = opts.onend;
    speechSynthesis.speak(u);
  }

  /* Say a word syllable-by-syllable, then the whole word (used on words). */
  function sayHint(parts, whole) {
    if (!parts || parts.length < 2) { say(whole, { rate: 0.75 }); return; }
    let i = 0;
    (function next() {
      if (i < parts.length) {
        say(parts[i++], { rate: 0.7, onend: () => setTimeout(next, 140) });
      } else {
        setTimeout(() => say(whole, { rate: 0.85 }), 220);
      }
    })();
  }

  function czechAvailable() { return hasCzech; }

  /* ---- SFX: small pleasant tones via Web Audio --------------------------- */
  let ac = null;
  function ctx() {
    if (!ac) {
      try { ac = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { ac = null; }
    }
    if (ac && ac.state === "suspended") ac.resume();
    return ac;
  }

  function tone(freq, start, dur, type, gain) {
    const c = ctx(); if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    const t0 = c.currentTime + start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.2, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  const SFX = {
    tap()    { tone(520, 0, 0.09, "triangle", 0.12); },
    correct() {                       // happy rising arpeggio
      tone(523, 0.00, 0.14, "triangle", 0.2);
      tone(659, 0.10, 0.14, "triangle", 0.2);
      tone(784, 0.20, 0.20, "triangle", 0.22);
      tone(1047,0.32, 0.28, "sine",     0.18);
    },
    star()   { tone(880, 0, 0.1, "sine", 0.2); tone(1319, 0.08, 0.22, "sine", 0.18); },
    nudge()  { tone(300, 0, 0.16, "sine", 0.14); }, // gentle, not a buzzer
    win()    {                        // little fanfare
      [523,659,784,1047,1319].forEach((f, i) => tone(f, i * 0.12, 0.3, "triangle", 0.2));
    }
  };

  return { say, sayHint, czechAvailable, sfx: SFX, warm: ctx };
})();
