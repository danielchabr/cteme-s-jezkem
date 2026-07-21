# Čteme s Ježkem 🦔 — Design & Research

A browser game that teaches a 6-year-old Czech native speaker to read, grounded in how
Czech first-graders are actually taught and in evidence on early-literacy gamification.

## 1. Why this design (research → decisions)

### Czech is a *shallow / transparent* orthography
Czech has a near one-to-one mapping between letters (graphemes) and sounds (phonemes).
Unlike English, once a child can (a) recognize letters and (b) blend sounds, they can
decode almost *any* word. Neuroimaging of Czech readers confirms fast, regular
grapheme→phoneme decoding
([Frontiers, 2022](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.1037365/full)).

**→ Decision:** The whole game is built around **blending (slabikování)** — the single
highest-leverage skill in a transparent language. We spend most time on *syllables → words*,
not on memorizing whole words.

### Czech schools: analyticko-syntetická metoda
The dominant Czech method goes **hláska/písmeno → slabika → slovo → věta**
(sound/letter → syllable → word → sentence), with a long "slabikář" phase
([profiskoly.cz](https://profiskoly.cz/blog/analyticko-synteticka-metoda-cteni/),
[eduall.cz](https://eduall.cz/prehled-metod-vyuky-cteni-vyberte-tu-ktera-je-pro-vase-zaky-nejprinosnejsi/)).
The **genetická metoda** starts children on **UPPERCASE print letters** and the first
syllable **MÁ** ([nns.cz](https://nns.cz/agata/metoda-tri-startu/)).

**→ Decision:** Levels mirror this exact progression. We use **VELKÁ TISKACÍ PÍSMENA
(uppercase print)** everywhere — this is what Czech kids read first and recognize most
easily. Letters are introduced in the classic primer order: **M, L, S, P, T + samohlásky**
([doucuji.eu](https://www.doucuji.eu/blog-doucovatelu/1707-geneticka-metoda-cteni)).

### Phonemic awareness is the #1 predictor
Hearing and manipulating sounds predicts reading success better than anything else, and
gamified apps that build it produce measurable gains
([Sage, 2025](https://journals.sagepub.com/doi/10.1177/00472395251337095)).

**→ Decision:** Every level is **audio-first**. The child always *hears* the target
(Czech text-to-speech, `cs-CZ`) before/while choosing. Nothing depends on already reading.

### What makes gamification actually work for young kids
Evidence points to: **reward systems, progress tracking, immediate feedback, short rounds,
adaptive difficulty, and no punishing "fail" states**
([ResearchGate meta-analysis](https://www.researchgate.net/publication/387531773_The_Mobile_Gamification_for_Early_Literacy_An_Analysis_of_Learning_Outcomes_and_Engagement)).

**→ Decision:** Stars ⭐ as the reward currency, an island map showing progress, instant
happy/gentle feedback with sound + animation, 6-question rounds, a warm mascot that
celebrates, and **you can never "lose"** — a wrong tap just gently re-asks.

## 2. Learning progression (the 5 islands)

| # | Island (Ostrov) | Skill | Task |
|---|---|---|---|
| 1 | **Samohlásky** (Vowels) A E I O U | Letter–sound for vowels | Hear a vowel, tap it |
| 2 | **Písmenka** (Consonants) M L S P T … | Letter–sound + keyword picture | Hear a sound, tap its letter |
| 3 | **Slabiky** (Syllables) MA ME MI … | **Blending** — the core skill | Build a syllable, then hear-and-pick |
| 4 | **Slova** (Words) MÁMA, LES, PES … | Decode & comprehend | Match the written word to its picture |
| 5 | **Věty** (Sentences) TO JE PES. | Read for meaning | Read a short sentence, pick the picture |

Islands unlock in order; each needs a small number of stars to open the next, so the child
always plays inside their zone of competence (adaptive gating).

## 3. Czech-specific care
- **Uppercase print first** (velká tiskací) — matches Czech Grade 1.
- Diacritics introduced gently: short vowels first; **á/é/í** long marks and **háčky
  (č, š, ž)** appear only once the base letters are solid, and only inside whole words the
  TTS voice pronounces correctly.
- Keyword pictures use **emoji** (no asset files, always colorful) with words whose *initial
  sound* matches the letter (M → 🐭 MYŠ, L → 🦁 LEV, S → ☀️ SLUNCE, P → 🐶 PES, T → 🐯 TYGR).
- We pronounce letters **in the context of syllables/words**, never as isolated distorted
  phonemes, so the child hears authentic Czech.

## 4. Tech
- **Zero-build, offline, double-click `index.html`.** Classic scripts (no ES modules/fetch)
  so it runs from `file://`.
- **Audio:** Web Speech API (`speechSynthesis`, `cs-CZ`; macOS voice *Zuzana*) for speech;
  Web Audio API for happy chimes. No downloaded media.
- **Progress** saved in `localStorage`.
- Big touch targets, high contrast, works on tablet or laptop.

> If the browser has no Czech voice, the game still runs and shows a one-time tip on how to
> add the Czech voice (macOS: System Settings → Accessibility → Spoken Content → System Voice).
