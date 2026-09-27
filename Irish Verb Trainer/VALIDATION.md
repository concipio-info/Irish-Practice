# Validation

- JavaScript syntax checks passed for engine.js and app.js.
- 29 hand-selected linguistic regression fixtures passed, including irregular dependent forms, mutation, autonomous forms, compounds and hypothetical bí.
- 30,249 valid practice-card combinations passed structural checks (nonempty answers, no missing-value strings, self-answer checking and example construction).
- All included verbs have the core finite affirmative/negative paradigms for all eight person categories.
- DOM integration checks passed: app initialisation, starting and completing sessions, reveal/next, mistake review, reference tables, typed correct-answer scoring, duplicate-submit protection, empty-filter handling, progress storage and reset.
- Full rendered-browser / visual checks were not completed: this environment lacked a browser executable, and the attempted browser download timed out. Export/import code was inspected but not end-to-end tested in a rendered browser.

The conjugation data is sourced; the examples and translations are generated from added lexical metadata. Structural tests do not establish independent linguistic review of every possible sentence.
