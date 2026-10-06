# WunderLINQ user documentation

Documentation is organized first by locale, using standard language codes, and
then by application:

```text
docs/
  en/
    assets/
    PowerLINQ/
    WunderLINQ/
    WunderLINQ-DFU/
    WunderLINQ-GoPro/
    WunderLINQ-Insta360/
    WLQN/
    WLQS/
      BMW/
      Triumph/
    WLQX/
```

The `en` directory contains the canonical English documents. Add translations
as sibling locale directories, preserving the application directory names and
the files within each application bundle. For example, German documentation
would be stored in `docs/de/WunderLINQ/`.

When adding a translation, update the `lang` attribute in its `index.html` to
match the locale. Keep asset paths relative so each application bundle remains
self-contained.

The migrated hardware guides use common styles and scripts from `docs/assets/`.
Like the app guides, every hardware guide keeps its own images under its local
`assets/` directory: branding and the favicon are stored directly in `assets/`,
and instructional images are stored in `assets/screenshots/`. Preserve this
layout when adding localized hardware guides.
