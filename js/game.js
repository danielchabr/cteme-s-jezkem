/* =========================================================================
 * game.js — Čteme s Ježkem
 * Screen flow + per-island activities + rewards. Plain globals, no modules
 * (so it runs from file://). Depends on DATA (data.js) and Sound (audio.js).
 * ========================================================================= */
(function () {
  "use strict";

  /* ---------- friendly hedgehog mascot (inline SVG) --------------------- */
  const HEDGEHOG = `
  <svg class="hedgehog bounce" viewBox="0 0 120 120" aria-hidden="true">
    <g>
      <!-- spikes -->
      <g fill="#8a5a33">
        ${Array.from({length:11}).map((_,i)=>{
          const a=(Math.PI)*(i/10)+Math.PI; const cx=60+Math.cos(a)*44; const cy=70+Math.sin(a)*44;
          const tx=60+Math.cos(a)*70; const ty=70+Math.sin(a)*70;
          return `<path d="M${60+Math.cos(a-0.09)*40} ${70+Math.sin(a-0.09)*40}
            L${tx} ${ty} L${60+Math.cos(a+0.09)*40} ${70+Math.sin(a+0.09)*40} Z"/>`;
        }).join("")}
      </g>
      <ellipse cx="60" cy="72" rx="46" ry="40" fill="#b9793f"/>
      <!-- face -->
      <ellipse cx="60" cy="86" rx="34" ry="28" fill="#f4d8b0"/>
      <circle cx="48" cy="82" r="5.5" fill="#3a2a1f"/>
      <circle cx="72" cy="82" r="5.5" fill="#3a2a1f"/>
      <circle cx="46.4" cy="80.4" r="1.8" fill="#fff"/>
      <circle cx="70.4" cy="80.4" r="1.8" fill="#fff"/>
      <ellipse cx="60" cy="93" rx="6" ry="4.6" fill="#3a2a1f"/>
      <circle cx="38" cy="92" r="5" fill="#ff9db0" opacity=".7"/>
      <circle cx="82" cy="92" r="5" fill="#ff9db0" opacity=".7"/>
      <path d="M52 100 Q60 106 68 100" stroke="#3a2a1f" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;

  /* ---------- persistent state ----------------------------------------- */
  const SAVE_KEY = "cteme-s-jezkem-v1";
  const State = load();

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (s && typeof s.stars === "number") return s;
    } catch (e) {}
    return { stars: 0, best: {} }; // best[islandId] = stars earned there
  }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(State)); } catch (e) {} }

  /* ---------- tiny DOM + util helpers ---------------------------------- */
  const $ = sel => document.querySelector(sel);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let seed = 1; function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
  function reseed() { seed = (Date.now() % 2147483647) || 1; }
  const pick = a => a[Math.floor(rnd() * a.length)];
  const sample = (a, n, exclude) => shuffle(a.filter(x => x !== exclude)).slice(0, n);

  const screen = () => $("#screen");
  const starBadge = () => $("#starCount");

  /* ---------- top bar / stars ------------------------------------------ */
  function refreshStars() { starBadge().textContent = State.stars; }

  function addStar() {
    State.stars += 1; save(); refreshStars();
    Sound.sfx.star();
    const b = $(".stars-badge"); b.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
      { duration: 320, easing: "ease" });
  }

  /* =====================================================================
   *  HOME / MAP
   * ===================================================================== */
  function goHome() {
    reseed();
    const s = screen(); s.innerHTML = "";
    const scr = el("div", "screen");

    const hero = el("div", "home-hero");
    hero.innerHTML = HEDGEHOG;
    const bubble = el("div", "speech", "Ahoj! Já jsem ježek <b>Bodlinka</b>. Pojď si číst! 📖");
    hero.appendChild(bubble);
    scr.appendChild(hero);

    const map = el("div", "map");
    DATA.islands.forEach(is => {
      const unlocked = State.stars >= is.need;
      const done = (State.best[is.id] || 0) > 0;
      const card = el("button", "island" + (unlocked ? "" : " locked"));
      card.style.background = `linear-gradient(180deg, ${lighten(is.color)}, ${is.color})`;
      card.innerHTML =
        `<span class="emo">${is.emoji}</span>
         <span class="nm">${is.name}</span>
         <span class="stat">${unlocked ? "⭐ " + (State.best[is.id] || 0) : "Potřebuješ " + is.need + " ⭐"}</span>
         ${done ? '<span class="done">✅</span>' : ""}`;
      if (unlocked) card.onclick = () => { Sound.warm(); Sound.sfx.tap(); startIsland(is.id); };
      else card.onclick = () => { Sound.sfx.nudge(); Sound.say("Nasbírej víc hvězdiček!"); };
      map.appendChild(card);
    });
    scr.appendChild(map);

    if (!Sound.czechAvailable()) {
      scr.appendChild(el("div", "tip",
        "Tip pro rodiče: pro <b>český hlas</b> zapněte v macOS Nastavení → Zpřístupnění → " +
        "Mluvený obsah → Systémový hlas → Zuzana (čeština). Hra funguje i bez toho."));
    }
    s.appendChild(scr);
  }

  function lighten(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + 40), g = Math.min(255, ((n >> 8) & 255) + 40), b = Math.min(255, (n & 255) + 40);
    return `rgb(${r},${g},${b})`;
  }

  /* =====================================================================
   *  ROUND FRAMEWORK
   * ===================================================================== */
  const ROUND_LEN = 6;

  function startIsland(id) {
    reseed();
    const questions = buildQuestions(id);
    runRound(id, questions, 0, 0);
  }

  function buildQuestions(id) {
    if (id === "vowels")     return times(ROUND_LEN, vowelQ);
    if (id === "consonants") return times(ROUND_LEN, consonantQ);
    if (id === "syllables")  return times(ROUND_LEN, syllableQ);
    if (id === "words")      return times(ROUND_LEN, wordQ);
    if (id === "sentences")  return DATA.sentences.map(sentenceQ);
    return [];
  }
  const times = (n, fn) => Array.from({ length: n }, fn);

  /* ---- question generators (each returns a render() into a container) --- */

  // 1. Vowels: hear a vowel, tap it among 3.
  function vowelQ() {
    const target = pick(DATA.vowels);
    const opts = shuffle([target, ...sample(DATA.vowels, 2, target)]);
    return { kind: "choose", say: target, prompt: null,
      choices: opts.map(v => ({ big: v, value: v })), answer: target,
      instr: "Poslouchej a najdi písmenko." };
  }

  // 2. Consonants: hear a keyword (picture shown), tap its starting letter.
  function consonantQ() {
    const target = pick(DATA.consonants);
    const others = sample(DATA.consonants, 2, target);
    const opts = shuffle([target, ...others]);
    // Say ONLY the word (e.g. "Slunce"); the child works out the first letter.
    // We deliberately don't speak the isolated letter: Czech TTS reads it as the
    // letter *name* ("es", "el"), not the sound, and it also gave away the answer.
    return { kind: "choose",
      say: target.word,
      prompt: { pic: target.emoji, cap: "?" },
      choices: opts.map(c => ({ big: c.letter, value: c.letter })),
      answer: target.letter,
      instr: "Kterým písmenkem začíná?" };
  }

  // 3. Syllables: build the spoken target from consonant + vowel tiles.
  function syllableQ() {
    const grp = pick(DATA.syllableGroups);
    const target = pick(grp.syllables);
    const otherC = pick(DATA.syllableGroups.filter(g => g.c !== grp.c)).c;
    return { kind: "build", target: target, cons: shuffle([grp.c, otherC]),
      vowels: DATA.vowels.slice(), instr: "Postav slabiku, kterou slyšíš." };
  }

  // 4. Words: read the word, pick the matching picture (of 3).
  function wordQ() {
    const target = pick(DATA.words);
    const others = sample(DATA.words, 2, target);
    const opts = shuffle([target, ...others]);
    return { kind: "choose", three: true,
      hint: target.hint, say: target.text,
      prompt: { big: target.text, cap: null },
      choices: opts.map(w => ({ big: w.emoji, value: w.text })),
      answer: target.text, instr: "Přečti slovo a najdi obrázek." };
  }

  // 5. Sentences: read the sentence, pick the matching picture.
  function sentenceQ(s) {
    const others = sample(DATA.sentences, 2, s);
    const opts = shuffle([s, ...others]);
    return { kind: "choose", three: true, say: s.text,
      prompt: { sentence: s.text },
      choices: opts.map(x => ({ big: x.emoji, value: x.text })),
      answer: s.text, instr: "Přečti větu a vyber obrázek." };
  }

  /* ---- the round runner ------------------------------------------------ */
  function runRound(id, qs, idx, correctCount) {
    if (idx >= qs.length) return finishRound(id, correctCount, qs.length);

    const q = qs[idx];
    const s = screen(); s.innerHTML = "";
    const scr = el("div", "screen");

    // header: back + progress pips
    const head = el("div", "topbar");
    const back = el("button", "iconbtn", "🏠");
    back.onclick = () => { Sound.sfx.tap(); goHome(); };
    head.appendChild(back);
    head.appendChild(el("div", "spacer"));
    const pips = el("div", "progress");
    for (let i = 0; i < qs.length; i++) pips.appendChild(el("div", "pip" + (i < correctCount ? " on" : "")));
    head.appendChild(pips);
    scr.appendChild(head);

    scr.appendChild(el("div", "speech", q.instr));

    if (q.kind === "choose") renderChoose(scr, q, onDone);
    else if (q.kind === "build") renderBuild(scr, q, onDone);

    s.appendChild(scr);

    function onDone() { runRound(id, qs, idx + 1, correctCount + 1); }
  }

  /* ---- CHOOSE activity ------------------------------------------------- */
  function renderChoose(scr, q, done) {
    // prompt card (letter / picture / word / sentence)
    if (q.prompt) {
      const card = el("div", "prompt-card");
      if (q.prompt.pic)      card.innerHTML = `<div class="pic">${q.prompt.pic}</div><div class="cap">${q.prompt.cap}</div>`;
      else if (q.prompt.big) card.innerHTML = `<div class="big">${q.prompt.big}</div>`;
      else if (q.prompt.sentence) card.innerHTML = `<div class="big" style="font-size:clamp(28px,7vw,46px)">${q.prompt.sentence}</div>`;
      scr.appendChild(card);
    }

    const speak = () => {
      if (q.hint) Sound.sayHint(q.hint, q.say);
      else Sound.say(q.say, { rate: q.say.length <= 2 ? 0.7 : 0.85 });
    };
    const listen = el("button", "listen", "🔊 Poslech");
    listen.onclick = () => { Sound.warm(); Sound.sfx.tap(); speak(); };
    scr.appendChild(listen);

    const choices = el("div", "choices" + (q.three ? " three" : ""));
    q.choices.forEach(c => {
      const btn = el("button", "choice");
      btn.innerHTML = c.big.length > 2 && !/\p{Emoji}/u.test(c.big)
        ? `<span class="wd">${c.big}</span>`
        : `<span class="lg">${c.big}</span>`;
      btn.onclick = () => {
        if (btn.dataset.locked) return;
        if (c.value === q.answer) {
          lockAll(choices);
          btn.classList.add("correct");
          Sound.sfx.correct();
          addStar();
          confetti(10);
          setTimeout(done, 900);
        } else {
          btn.classList.add("wrong");
          btn.dataset.locked = "1";
          Sound.sfx.nudge();
          setTimeout(() => { btn.classList.remove("wrong"); btn.dataset.locked = ""; }, 500);
        }
      };
      choices.appendChild(btn);
    });
    scr.appendChild(choices);

    // auto-speak the prompt shortly after render
    setTimeout(speak, 350);
  }

  function lockAll(container) { container.querySelectorAll(".choice").forEach(b => b.dataset.locked = "1"); }

  /* ---- BUILD activity (syllable synthesis) ----------------------------- */
  function renderBuild(scr, q, done) {
    const target = q.target;                 // e.g. "MI"
    const tCons = target[0], tVow = target.slice(1);
    let cSlot = null, vSlot = null;

    const listen = el("button", "listen", "🔊 Poslech");
    listen.onclick = () => { Sound.warm(); Sound.sfx.tap(); Sound.say(target, { rate: 0.7 }); };
    scr.appendChild(listen);

    const builder = el("div", "builder");
    const slotC = el("div", "slot");
    const slotV = el("div", "slot");
    builder.appendChild(slotC);
    builder.appendChild(el("div", "plus", "+"));
    builder.appendChild(slotV);
    scr.appendChild(builder);

    const consRow = el("div", "tile-row");
    q.cons.forEach(c => {
      const t = el("button", "tile", c);
      t.onclick = () => { if (builder.dataset.locked) return; Sound.sfx.tap(); cSlot = c; slotC.textContent = c; slotC.classList.add("filled"); check(); };
      consRow.appendChild(t);
    });
    const vowRow = el("div", "tile-row");
    q.vowels.forEach(v => {
      const t = el("button", "tile vowel", v);
      t.onclick = () => { if (builder.dataset.locked) return; Sound.sfx.tap(); vSlot = v; slotV.textContent = v; slotV.classList.add("filled"); check(); };
      vowRow.appendChild(t);
    });
    scr.appendChild(consRow);
    scr.appendChild(vowRow);

    function check() {
      if (cSlot == null || vSlot == null) return;
      const made = cSlot + vSlot;
      if (made === target) {
        builder.dataset.locked = "1";
        slotC.classList.add("filled"); slotV.classList.add("filled");
        Sound.say(target, { rate: 0.7 });
        Sound.sfx.correct(); addStar(); confetti(10);
        setTimeout(done, 1100);
      } else if (cSlot === tCons && vSlot !== tVow) {
        // consonant ok, wrong vowel — gently clear the vowel to try again
        Sound.sfx.nudge(); slotV.classList.remove("filled"); slotV.textContent = ""; vSlot = null;
      } else if (vSlot === tVow && cSlot !== tCons) {
        Sound.sfx.nudge(); slotC.classList.remove("filled"); slotC.textContent = ""; cSlot = null;
      } else {
        Sound.sfx.nudge();
        slotC.classList.remove("filled"); slotC.textContent = ""; cSlot = null;
        slotV.classList.remove("filled"); slotV.textContent = ""; vSlot = null;
      }
    }

    setTimeout(() => Sound.say(target, { rate: 0.7 }), 400);
  }

  /* =====================================================================
   *  END OF ROUND
   * ===================================================================== */
  function finishRound(id, correct, total) {
    const island = DATA.islands.find(i => i.id === id);
    State.best[id] = Math.max(State.best[id] || 0, correct);
    save();
    Sound.sfx.win(); confetti(80);
    setTimeout(() => Sound.say("Výborně! Skvělá práce!", { rate: 0.9 }), 300);

    const s = screen(); s.innerHTML = "";
    const scr = el("div", "screen");
    const hero = el("div", "home-hero"); hero.innerHTML = HEDGEHOG;
    hero.querySelector(".hedgehog").classList.add("cheer");
    scr.appendChild(hero);

    const card = el("div", "win-card");
    card.innerHTML =
      `<div class="win-stars">${"⭐".repeat(Math.max(1, Math.min(5, Math.round(correct / total * 5))))}</div>
       <h2>Hotovo, ${island.name}!</h2>
       <div style="font-weight:700;font-size:20px">Získal jsi ${correct} ⭐</div>`;
    scr.appendChild(card);

    const nextIsland = nextUnlockable(id);
    const btns = el("div", "rowbtns");
    const again = el("button", "btn ghost", "🔁 Znovu");
    again.onclick = () => { Sound.sfx.tap(); startIsland(id); };
    btns.appendChild(again);
    if (nextIsland && State.stars >= nextIsland.need) {
      const nx = el("button", "btn primary", `▶️ ${nextIsland.name}`);
      nx.onclick = () => { Sound.sfx.tap(); startIsland(nextIsland.id); };
      btns.appendChild(nx);
    }
    const home = el("button", "btn primary", "🏠 Mapa");
    home.onclick = () => { Sound.sfx.tap(); goHome(); };
    btns.appendChild(home);
    scr.appendChild(btns);
    s.appendChild(scr);
  }

  function nextUnlockable(id) {
    const idx = DATA.islands.findIndex(i => i.id === id);
    return DATA.islands[idx + 1] || null;
  }

  /* =====================================================================
   *  CONFETTI (pure DOM, no assets)
   * ===================================================================== */
  const CONF_COLORS = ["#ff8a3d", "#ffcf3f", "#3ad07a", "#8a6cff", "#ff5d8f", "#4bc0c8"];
  function confetti(n) {
    for (let i = 0; i < n; i++) {
      const c = el("div", "confetti");
      c.style.left = (rnd() * 100) + "vw";
      c.style.background = pick(CONF_COLORS);
      const dur = 1.4 + rnd() * 1.2;
      c.style.animation = `fall ${dur}s linear forwards`;
      c.style.transform = `rotate(${rnd() * 360}deg)`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), dur * 1000 + 100);
    }
  }

  /* =====================================================================
   *  BOOT
   * ===================================================================== */
  window.addEventListener("DOMContentLoaded", () => {
    refreshStars();
    // Warm up audio + voices on the very first tap anywhere (autoplay policy).
    const warm = () => { Sound.warm(); document.removeEventListener("pointerdown", warm); };
    document.addEventListener("pointerdown", warm);
    goHome();
  });
})();
