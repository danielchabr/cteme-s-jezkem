/* =========================================================================
 * data.js — veškerý český obsah hry (all Czech learning content)
 * Uppercase print letters (velká tiskací) throughout — as in Czech Grade 1.
 * Loaded by game.js as a plain global `DATA`.
 *
 * Backward-compatible: island ids and card ids are STABLE (never renamed), so
 * existing saved progress keeps working. New content is only ever added.
 * ========================================================================= */

const DATA = {

  /* Short vowels — used by the syllable builder + syllable generation. */
  vowels: ["A", "E", "I", "O", "U"],

  /* Vowel-recognition pool for the Samohlásky island: short + long.
   * Only distinct-SOUNDING vowels (excludes y/ý/ů — homophones of i/í/ú that
   * cannot be told apart by ear; those are taught inside words instead). */
  vowelSet: ["A", "E", "I", "O", "U", "Á", "É", "Í", "Ó", "Ú"],

  /* Souhlásky (consonants) as initial sounds — the whole Czech alphabet that
   * actually begins words (ď/ť/ň are soft and don't start words, so they're
   * learned inside syllables, not here). Each: keyword + emoji picture. */
  consonants: [
    { letter: "B",  word: "BALON",      emoji: "🎈" },
    { letter: "C",  word: "CITRON",     emoji: "🍋" },
    { letter: "Č",  word: "ČOKOLÁDA",   emoji: "🍫" },
    { letter: "D",  word: "DŮM",        emoji: "🏠" },
    { letter: "F",  word: "FOTOAPARÁT", emoji: "📷" },
    { letter: "G",  word: "GORILA",     emoji: "🦍" },
    { letter: "H",  word: "HAD",        emoji: "🐍" },
    { letter: "CH", word: "CHOBOTNICE", emoji: "🐙" },
    { letter: "J",  word: "JABLKO",     emoji: "🍎" },
    { letter: "K",  word: "KOČKA",      emoji: "🐱" },
    { letter: "L",  word: "LEV",        emoji: "🦁" },
    { letter: "M",  word: "MYŠ",        emoji: "🐭" },
    { letter: "N",  word: "NOS",        emoji: "👃" },
    { letter: "P",  word: "PES",        emoji: "🐶" },
    { letter: "R",  word: "RYBA",       emoji: "🐟" },
    { letter: "Ř",  word: "ŘEKA",       emoji: "🏞️" },
    { letter: "S",  word: "SLUNCE",     emoji: "☀️" },
    { letter: "Š",  word: "ŠNEK",       emoji: "🐌" },
    { letter: "T",  word: "TYGR",       emoji: "🐯" },
    { letter: "V",  word: "VLAK",       emoji: "🚂" },
    { letter: "Z",  word: "ZEBRA",      emoji: "🦓" },
    { letter: "Ž",  word: "ŽIRAFA",     emoji: "🦒" }
  ],

  /* Letters used in the big↔small matching island (Malá písmena).
   * Base letters whose lower/upper shapes a child must learn to pair. */
  matchLetters: "ABCDEFGHIJKLMNOPRSTUVZ",

  /* Slabiky (open CV syllables). Built from consonant + vowel at runtime, with
   * both SHORT and LONG vowels for variety (MA/MÁ, MI/MÍ …). The heart of Czech
   * reading: souhláska + samohláska.
   *
   * `hardOnly` marks D/T/N: Czech softens di/ti/ni → ďi/ťi/ňi (and dí/tí/ní),
   * which sounds "wrong" in a hard-consonant blending drill, so we skip I/Í for
   * those three. (di/ti/ni vs dy/ty/ny is a separate, later lesson.) */
  syllableConsonants: [
    { c: "M" }, { c: "L" }, { c: "S" }, { c: "P" }, { c: "T", hardOnly: true },
    { c: "K" }, { c: "V" }, { c: "N", hardOnly: true }, { c: "D", hardOnly: true },
    { c: "J" }, { c: "R" }, { c: "B" }, { c: "H" }, { c: "Z" },
    { c: "Č" }, { c: "Š" }, { c: "Ž" }
  ],
  longVowels: ["Á", "É", "Í", "Ó", "Ú"],   // short vowels are DATA.vowels above

  /* Slova (words) with pictures — a big, varied deck so words rarely repeat.
   * `hint` (optional) claps the word into syllables when read aloud. */
  words: [
    { text: "MÁMA",   emoji: "👩",  hint: ["MÁ", "MA"] },
    { text: "TÁTA",   emoji: "👨",  hint: ["TÁ", "TA"] },
    { text: "LES",    emoji: "🌲" },
    { text: "PES",    emoji: "🐶" },
    { text: "KOČKA",  emoji: "🐱",  hint: ["KOČ", "KA"] },
    { text: "MYŠ",    emoji: "🐭" },
    { text: "RYBA",   emoji: "🐟",  hint: ["RY", "BA"] },
    { text: "SOVA",   emoji: "🦉",  hint: ["SO", "VA"] },
    { text: "LEV",    emoji: "🦁" },
    { text: "VODA",   emoji: "💧",  hint: ["VO", "DA"] },
    { text: "OKO",    emoji: "👁️",  hint: ["O", "KO"] },
    { text: "NOS",    emoji: "👃" },
    { text: "RUKA",   emoji: "✋",  hint: ["RU", "KA"] },
    { text: "NOHA",   emoji: "🦵",  hint: ["NO", "HA"] },
    { text: "AUTO",   emoji: "🚗",  hint: ["AU", "TO"] },
    { text: "KOLO",   emoji: "🚲",  hint: ["KO", "LO"] },
    { text: "VLAK",   emoji: "🚂" },
    { text: "DŮM",    emoji: "🏠" },
    { text: "STROM",  emoji: "🌳" },
    { text: "SLUNCE", emoji: "☀️",  hint: ["SLUN", "CE"] },
    { text: "MĚSÍC",  emoji: "🌙",  hint: ["MĚ", "SÍC"] },
    { text: "MÍČ",    emoji: "⚽" },
    { text: "DORT",   emoji: "🎂" },
    { text: "CHLÉB",  emoji: "🍞" },
    { text: "MLÉKO",  emoji: "🥛",  hint: ["MLÉ", "KO"] },
    { text: "SÝR",    emoji: "🧀" },
    { text: "BANÁN",  emoji: "🍌",  hint: ["BA", "NÁN"] },
    { text: "CITRON", emoji: "🍋",  hint: ["CI", "TRON"] },
    { text: "MRKEV",  emoji: "🥕" },
    { text: "ŽÁBA",   emoji: "🐸",  hint: ["ŽÁ", "BA"] },
    { text: "HAD",    emoji: "🐍" },
    { text: "VČELA",  emoji: "🐝",  hint: ["VČE", "LA"] },
    { text: "MOTÝL",  emoji: "🦋",  hint: ["MO", "TÝL"] },
    { text: "PTÁK",   emoji: "🐦" },
    { text: "KŮŇ",    emoji: "🐴" },
    { text: "KRÁVA",  emoji: "🐄",  hint: ["KRÁ", "VA"] },
    { text: "PRASE",  emoji: "🐷",  hint: ["PRA", "SE"] },
    { text: "SLON",   emoji: "🐘" },
    { text: "ŽIRAFA", emoji: "🦒",  hint: ["ŽI", "RA", "FA"] },
    { text: "MEDVĚD", emoji: "🐻",  hint: ["MED", "VĚD"] },
    { text: "LIŠKA",  emoji: "🦊",  hint: ["LIŠ", "KA"] },
    { text: "ZAJÍC",  emoji: "🐰",  hint: ["ZA", "JÍC"] },
    { text: "JEŽEK",  emoji: "🦔",  hint: ["JE", "ŽEK"] },
    { text: "KLÍČ",   emoji: "🔑" },
    { text: "KNIHA",  emoji: "📖",  hint: ["KNI", "HA"] },
    { text: "DÁREK",  emoji: "🎁",  hint: ["DÁ", "REK"] },
    { text: "DUHA",   emoji: "🌈",  hint: ["DU", "HA"] },
    { text: "OHEŇ",   emoji: "🔥",  hint: ["O", "HEŇ"] },
    { text: "BOTA",   emoji: "👢",  hint: ["BO", "TA"] },
    { text: "ČEPICE", emoji: "🧢",  hint: ["ČE", "PI", "CE"] }
  ],

  /* Věty (short decodable sentences), each with a distinct picture. */
  sentences: [
    { text: "TO JE PES.",       emoji: "🐶" },
    { text: "TO JE KOČKA.",     emoji: "🐱" },
    { text: "TO JE LES.",       emoji: "🌲" },
    { text: "MÁMA MÁ MÍČ.",     emoji: "⚽" },
    { text: "MÁM AUTO.",        emoji: "🚗" },
    { text: "VIDÍM SOVU.",      emoji: "🦉" },
    { text: "LEV SPÍ.",         emoji: "🦁" },
    { text: "PADÁ SNÍH.",       emoji: "❄️" },
    { text: "SVÍTÍ SLUNCE.",    emoji: "☀️" },
    { text: "PTÁK LETÍ.",       emoji: "🐦" },
    { text: "ŽÁBA SKÁČE.",      emoji: "🐸" },
    { text: "MÁM RÁD DORT.",    emoji: "🎂" },
    { text: "KŮŇ BĚŽÍ.",        emoji: "🐴" },
    { text: "VLAK JEDE.",       emoji: "🚂" },
    { text: "ŘEKA TEČE.",       emoji: "🏞️" },
    { text: "JEŽEK MÁ JABLKO.", emoji: "🦔" }
  ],

  /* Island metadata. `tier` (1..N by order) gates which cards can drop here.
   * Island ids are STABLE for backward-compatible saves. */
  islands: [
    { id: "vowels",     name: "Samohlásky",   emoji: "🅰️", color: "#ff8a3d", need: 0,  tier: 1 },
    { id: "consonants", name: "Písmenka",     emoji: "🔤", color: "#4bc0c8", need: 3,  tier: 2 },
    { id: "lowercase",  name: "Malá písmena", emoji: "🔡", color: "#f5a524", need: 7,  tier: 3 },
    { id: "syllables",  name: "Slabiky",      emoji: "🧩", color: "#8a6cff", need: 12, tier: 4 },
    { id: "words",      name: "Slova",        emoji: "📖", color: "#ff5d8f", need: 18, tier: 5 },
    { id: "sentences",  name: "Věty",         emoji: "🌟", color: "#3ad07a", need: 26, tier: 6 }
  ],

  /* Avatars a child can pick for their profile. */
  avatars: ["🦊","🐰","🐻","🐱","🐶","🦁","🐯","🐸","🐼","🦉","🦄","🐨","🐵","🐧","🦖","🐢"],

  /* Collectible cards. Each card's `tier` = the EASIEST island that can drop
   * it, so better cards require harder islands (motivates climbing). Card ids
   * are STABLE — never rename, or saved collections break. */
  cards: [
    // tier 1 — Samohlásky
    { id: "jezek",   emoji: "🦔", name: "Ježek",  rarity: "common", tier: 1 },
    { id: "mys",     emoji: "🐭", name: "Myš",    rarity: "common", tier: 1 },
    { id: "pes",     emoji: "🐶", name: "Pejsek", rarity: "common", tier: 1 },
    { id: "kocka",   emoji: "🐱", name: "Kočka",  rarity: "common", tier: 1 },
    // tier 2 — Písmenka
    { id: "ryba",    emoji: "🐟", name: "Rybka",  rarity: "common", tier: 2 },
    { id: "zaba",    emoji: "🐸", name: "Žabka",  rarity: "common", tier: 2 },
    { id: "sova",    emoji: "🦉", name: "Sova",   rarity: "common", tier: 2 },
    { id: "zajic",   emoji: "🐰", name: "Zajíc",  rarity: "common", tier: 2 },
    // tier 3 — Malá písmena
    { id: "beruska", emoji: "🐞", name: "Beruška", rarity: "common", tier: 3 },
    { id: "motyl",   emoji: "🦋", name: "Motýl",   rarity: "rare",   tier: 3 },
    { id: "vcela",   emoji: "🐝", name: "Včela",   rarity: "common", tier: 3 },
    { id: "veverka", emoji: "🐿️", name: "Veverka", rarity: "rare",   tier: 3 },
    // tier 4 — Slabiky
    { id: "liska",   emoji: "🦊", name: "Liška",   rarity: "rare",   tier: 4 },
    { id: "kachna",  emoji: "🦆", name: "Kachna",  rarity: "common", tier: 4 },
    { id: "srnka",   emoji: "🦌", name: "Srnka",   rarity: "rare",   tier: 4 },
    { id: "netopyr", emoji: "🦇", name: "Netopýr", rarity: "rare",   tier: 4 },
    // tier 5 — Slova
    { id: "bobr",    emoji: "🦫", name: "Bobr",     rarity: "rare",  tier: 5 },
    { id: "jezevec", emoji: "🦡", name: "Jezevec",  rarity: "rare",  tier: 5 },
    { id: "divocak", emoji: "🐗", name: "Divočák",  rarity: "rare",  tier: 5 },
    { id: "orel",    emoji: "🦅", name: "Orel",     rarity: "rare",  tier: 5 },
    // tier 6 — Věty (legendary)
    { id: "vlk",        emoji: "🐺", name: "Vlk",        rarity: "legendary", tier: 6 },
    { id: "medved",     emoji: "🐻", name: "Medvěd",     rarity: "legendary", tier: 6 },
    { id: "drak",       emoji: "🐉", name: "Drak",       rarity: "legendary", tier: 6 },
    { id: "jednorozec", emoji: "🦄", name: "Jednorožec", rarity: "legendary", tier: 6 }
  ],

  rarityWeight: { common: 6, rare: 3, legendary: 1 },
  rarityName:   { common: "Běžná", rare: "Vzácná", legendary: "Legendární" }
};
