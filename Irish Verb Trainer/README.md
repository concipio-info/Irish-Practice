# Briathra — Irish verb practice

## Start

Extract this ZIP **completely**, then double-click **index.html** in the extracted folder. It opens in a modern browser, including Edge, Chrome, Firefox or Safari. Keep the adjacent files together. No installation, build step, internet connection, API key or web server is required.

Choose a preset, adjust verb/tense/person/sentence-type filters, and click **Start a new session**. Type the complete verb phrase including the particle and pronoun when appropriate. The rest of the example sentence is supplied. Enter checks an answer; after checking, Enter on the focused Next button advances. Use the á é í ó ú buttons as needed.

## Included

- 11 irregular verbs: abair, beir, bí, clois, déan, faigh, feic, ith, tabhair, tar, téigh.
- 50 common regular verbs, representing both conjugations. This is a curated practical learning list, **not a statistically verified top-50 frequency ranking**.
- Seven personal pronouns and autonomous forms.
- Present/habitual present, distinct present-state bí, past, habitual past, future, conditional, imperative, present subjunctive and hypothetical past-subjunctive clauses.
- Affirmative and negative forms; affirmative and negative questions where grammatically applicable.
- Progressive constructions (present, past, future, conditional, habitual past) and perfect constructions with tar éis (present, past, future, conditional).
- Verbal nouns and verbal adjectives as supplementary vocabulary cards.
- A reference table for every selected verb/tense, with all accepted alternatives.
- English prompts, bracketed Irish examples and brief grammar notes.
- Rough English-friendly **lemma** pronunciation hints and optional online links to Teanglann dialect recordings. There is no offline audio or phonetic rendering of every conjugated form.
- Fada-sensitive scoring, optional accent-tolerant mode, shuffled sessions without repeated cards, saved mistakes and progress export/import.

## Grammar scope

Inflected forms are drawn from BuNaMo; sentence-building rules are adapted from Gramadán. Source commit hashes are recorded in data/verbs.json. The supplied synthetic and analytic alternatives are accepted. This is not an exhaustive catalogue of regional, emphatic or historical forms. The separate copula **is** is outside the 11-verb set.

The past-subjunctive exercise uses dá/mura plus dependent habitual-past forms, with bí using mbeinn etc. The card supplies the continuation “bheadh sé go maith”. These are hypothetical clauses, not standalone questions.

Compound aspects use bí plus ag/tar éis and the verbal noun; definite objects are supplied in their appropriate genitive forms. Progressive bí is excluded. “Perfect” here teaches the tar éis construction; it does not claim that every English perfect maps to it in all contexts. Some progressive exercises (for example verbs of perception or understanding) need a suitable context in natural speech.

The autonomous form does not name a subject. English prompts use “someone” as a learning gloss, although natural English translations may instead use passive or impersonal constructions. The present subjunctive and first-person imperative can be formal or uncommon.

Verbal-noun and verbal-adjective cards are uninflected vocabulary, so person/type filters do not apply to those two categories. Bí has no verbal adjective in this data. The verbal-adjective example explicitly mentions the word in a sentence; its predicative use depends on the individual verb.

## Progress and privacy

All work runs locally. Progress is stored in this browser's localStorage when available, and is specific to the browser/file location. Some browsers restrict local-file storage. **Export progress** provides a portable JSON backup. Import merges mistake lists and retains the larger attempt/correct totals, rather than adding potentially overlapping histories. It does not restore an in-progress session. Filters are session settings and reset when the page reloads. Reset saved progress asks for confirmation.

No analytics, network requests, external fonts or third-party scripts are used. Dictionary and source links open external sites only if clicked.

## Files / developer use

- index.html / styles.css / app.js: interface and local progress handling.
- engine.js: conjugation phrase assembly, mutation, English prompts and checking.
- data.js: browser-ready data bundle; classic script works over file://.
- data/verbs.json: editable structured database, lexical metadata and upstream rule table.
- tools/sync-data.cjs: regenerates data.js after JSON edits.
- tests/engine.test.cjs: linguistic regression fixtures and whole-bank structural coverage checks.
- licenses/: source copyright and licences.

The application is plain JavaScript, HTML and CSS. Node.js is optional, only for development:

```
npm test
npm run sync-data
```

After changing the data, run sync-data and then test. No npm install is needed. The test suite checks selected known forms and structural coverage; it is not a claim that every generated example has received independent human linguistic review.

## Attribution

Irish National Morphology Database (BuNaMo), © 2017 Foras na Gaeilge, compiled by Michal Boleslav Měchura: https://github.com/michmech/BuNaMo — Open Database License 1.0, with individual contents under the Database Contents License. The extracted/adapted database in data/verbs.json and data.js is provided under those licences. Additional lexical metadata and example complements are additions for this application.

Gramadán: https://github.com/michmech/GramadAn — MIT licence, © 2017 Foras na Gaeilge. Relevant verb phrase and mutation rules are adapted in engine.js and the bundled rule table. Full MIT notice is included. Original application code is supplied under the MIT licence in licenses/App-MIT.txt.
