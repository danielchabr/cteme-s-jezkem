# 🦔 Čteme s Ježkem

Hra, která učí šestileté dítě **číst česky** — hravě, s hlasem a s ježkem Bodlinkou.
*A game that teaches a 6-year-old Czech native speaker to read.*

![home](https://img.shields.io/badge/pro-prvňáčky-ff8a3d) ![offline](https://img.shields.io/badge/funguje-offline-3ad07a)

---

## ▶️ Jak spustit (How to play)

1. Otevři soubor **`index.html`** (stačí na něj dvakrát kliknout — otevře se v prohlížeči).
2. Klikni na **Samohlásky** a hraj! Za každou správnou odpověď získáš ⭐.
3. Další ostrovy se odemknou, když nasbíráš dost hvězdiček.

> Doporučený prohlížeč: **Safari nebo Chrome na Macu** — mají český hlas *Zuzana*.
> Funguje bez internetu. Postup se ukládá v prohlížeči.

### 🔊 Zapnutí českého hlasu (rodičům)
Pokud ježek nemluví česky, přidejte český hlas:
**Nastavení systému → Zpřístupnění → Mluvený obsah → Systémový hlas → Spravovat hlasy →
Čeština → Zuzana.** Hra funguje i bez hlasu (dítě čte a poznává obrázky).

---

## 🎓 Jak to učí (the method — in short)

Postaveno přesně na tom, jak se čte v české 1. třídě, a na výzkumu rané gramotnosti.
Čeština má **průhledný pravopis** (písmeno = hláska), takže nejdůležitější dovednost je
**skládání hlásek do slabik a slov (slabikování)**. Hra vede dítě přesně touto cestou:

| Ostrov | Co se učí |
|---|---|
| **Samohlásky** A E I O U | poznat samohlásku podle zvuku |
| **Písmenka** M L S P T … | první písmeno slova (myš → **M**) |
| **Slabiky** MA ME MI … | **skládání** souhlásky a samohlásky — jádro čtení |
| **Slova** MÁMA, LES, PES … | přečíst slovo a najít obrázek |
| **Věty** TO JE PES. | čtení s porozuměním |

Používáme **VELKÁ TISKACÍ PÍSMENA** (jako ve škole na začátku), krátké kolo (6 úkolů),
okamžitou pochvalu, hvězdičky a žádné „prohry" — špatný tap jen jemně vyzve ke zkoušení dál.

Podrobné odůvodnění a zdroje najdete v [`DESIGN.md`](DESIGN.md).

---

## 🧩 Co je uvnitř

```
cteme-s-jezkem/
├─ index.html      ← spusť tohle
├─ css/style.css
├─ js/
│  ├─ data.js      ← veškerý český obsah (písmena, slabiky, slova, věty)
│  ├─ audio.js     ← český hlas (cs-CZ) + zvuky
│  └─ game.js      ← logika hry, ostrovy, odměny
├─ DESIGN.md       ← výzkum → rozhodnutí (research & citations)
└─ README.md
```

**Bez instalace, bez internetu, bez reklam.** Vše běží v prohlížeči.

### Chci přidat/změnit slova
Otevři `js/data.js` a uprav pole `words` (text, emoji, `hint` = slabiky pro čtení nahlas)
nebo `consonants` / `sentences`. Používej velká tiskací písmena a emoji jako obrázek.
