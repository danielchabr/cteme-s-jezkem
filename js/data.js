/* =========================================================================
 * data.js — veškerý český obsah hry (all Czech learning content)
 * Uppercase print letters (velká tiskací) throughout — as in Czech Grade 1.
 * later loaded by game.js as a plain global `DATA`.
 * ========================================================================= */

const DATA = {

  /* Ostrov 1 — Samohlásky (vowels). Their name == their sound in Czech. */
  vowels: ["A", "E", "I", "O", "U"],

  /* Ostrov 2 — Souhlásky (consonants) in the classic Czech primer order.
   * Each has a keyword whose FIRST sound is the letter, plus an emoji picture. */
  consonants: [
    { letter: "M", word: "MYŠ",    emoji: "🐭" },
    { letter: "L", word: "LEV",    emoji: "🦁" },
    { letter: "S", word: "SLUNCE", emoji: "☀️" },
    { letter: "P", word: "PES",    emoji: "🐶" },
    { letter: "T", word: "TYGR",   emoji: "🐯" },
    { letter: "J", word: "JABLKO", emoji: "🍎" },
    { letter: "V", word: "VLAK",   emoji: "🚂" },
    { letter: "K", word: "KOČKA",  emoji: "🐱" },
    { letter: "R", word: "RYBA",   emoji: "🐟" },
    { letter: "N", word: "NOS",    emoji: "👃" },
    { letter: "D", word: "DŮM",    emoji: "🏠" },
    { letter: "B", word: "BALON",  emoji: "🎈" }
  ],

  /* Ostrov 3 — Slabiky (open CV syllables) grouped by consonant.
   * These are the heart of Czech reading: consonant + vowel = slabika. */
  syllableGroups: [
    { c: "M", syllables: ["MA", "ME", "MI", "MO", "MU"] },
    { c: "L", syllables: ["LA", "LE", "LI", "LO", "LU"] },
    { c: "S", syllables: ["SA", "SE", "SI", "SO", "SU"] },
    { c: "P", syllables: ["PA", "PE", "PI", "PO", "PU"] },
    { c: "T", syllables: ["TA", "TE", "TI", "TO", "TU"] }
  ],

  /* Ostrov 4 — Slova (words) with pictures, ordered easy → harder.
   * `hint` lets us syllable-clap the word (máma = MÁ-MA). */
  words: [
    { text: "MÁMA", emoji: "👩",  hint: ["MÁ", "MA"] },
    { text: "LES",  emoji: "🌲",  hint: ["LES"] },
    { text: "PES",  emoji: "🐶",  hint: ["PES"] },
    { text: "OKO",  emoji: "👁️",  hint: ["O", "KO"] },
    { text: "AUTO", emoji: "🚗",  hint: ["AU", "TO"] },
    { text: "SOVA", emoji: "🦉",  hint: ["SO", "VA"] },
    { text: "LEV",  emoji: "🦁",  hint: ["LEV"] },
    { text: "NOHA", emoji: "🦵",  hint: ["NO", "HA"] },
    { text: "VODA", emoji: "💧",  hint: ["VO", "DA"] },
    { text: "KOLO", emoji: "🚲",  hint: ["KO", "LO"] },
    { text: "RYBA", emoji: "🐟",  hint: ["RY", "BA"] },
    { text: "MÍČ",  emoji: "⚽",  hint: ["MÍČ"] },
    { text: "KOČKA",emoji: "🐱",  hint: ["KOČ", "KA"] },
    { text: "MYŠ",  emoji: "🐭",  hint: ["MYŠ"] }
  ],

  /* Ostrov 5 — Věty (short decodable sentences), each paired with a picture. */
  sentences: [
    { text: "TO JE PES.",     emoji: "🐶" },
    { text: "MÁMA MÁ MÍČ.",   emoji: "⚽" },
    { text: "TO JE LES.",     emoji: "🌲" },
    { text: "SOVA A LEV.",    emoji: "🦉" },
    { text: "MÁM AUTO.",      emoji: "🚗" },
    { text: "KOČKA PIJE VODU.",emoji: "🐱" }
  ],

  /* Island metadata for the map screen. */
  islands: [
    { id: "vowels",    name: "Samohlásky", emoji: "🅰️", color: "#ff8a3d", need: 0 },
    { id: "consonants",name: "Písmenka",   emoji: "🔤", color: "#4bc0c8", need: 3 },
    { id: "syllables", name: "Slabiky",    emoji: "🧩", color: "#8a6cff", need: 8 },
    { id: "words",     name: "Slova",      emoji: "📖", color: "#ff5d8f", need: 14 },
    { id: "sentences", name: "Věty",       emoji: "🌟", color: "#3ad07a", need: 22 }
  ],

  /* Avatars a child can pick for their profile. */
  avatars: ["🦊","🐰","🐻","🐱","🐶","🦁","🐯","🐸","🐼","🦉","🦄","🐨","🐵","🐧","🦖","🐢"],

  /* Collectible cards (Czech forest & friends). Earn one per completed round.
   * Rarity weights how often it appears: common > rare > legendary. */
  cards: [
    { id: "jezek",   emoji: "🦔", name: "Ježek",      rarity: "common" },
    { id: "mys",     emoji: "🐭", name: "Myš",        rarity: "common" },
    { id: "pes",     emoji: "🐶", name: "Pejsek",     rarity: "common" },
    { id: "kocka",   emoji: "🐱", name: "Kočka",      rarity: "common" },
    { id: "ryba",    emoji: "🐟", name: "Rybka",      rarity: "common" },
    { id: "zaba",    emoji: "🐸", name: "Žabka",      rarity: "common" },
    { id: "sova",    emoji: "🦉", name: "Sova",       rarity: "common" },
    { id: "zajic",   emoji: "🐰", name: "Zajíc",      rarity: "common" },
    { id: "liska",   emoji: "🦊", name: "Liška",      rarity: "rare" },
    { id: "srnka",   emoji: "🦌", name: "Srnka",      rarity: "rare" },
    { id: "bobr",    emoji: "🦫", name: "Bobr",       rarity: "rare" },
    { id: "veverka", emoji: "🐿️", name: "Veverka",    rarity: "rare" },
    { id: "orel",    emoji: "🦅", name: "Orel",       rarity: "rare" },
    { id: "medved",  emoji: "🐻", name: "Medvěd",     rarity: "legendary" },
    { id: "vlk",     emoji: "🐺", name: "Vlk",        rarity: "legendary" },
    { id: "drak",    emoji: "🐉", name: "Drak",       rarity: "legendary" },
    { id: "jednorozec", emoji: "🦄", name: "Jednorožec", rarity: "legendary" }
  ],

  rarityWeight: { common: 6, rare: 3, legendary: 1 },
  rarityName:   { common: "Běžná", rare: "Vzácná", legendary: "Legendární" }
};
