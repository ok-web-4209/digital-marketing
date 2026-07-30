# Stock photographs

Downloaded photographs of real service work go here, at the exact filenames
listed in [`STOCK-IMAGE-DOWNLOADS.md`](../../../STOCK-IMAGE-DOWNLOADS.md) in the
repository root.

`npm run fetch-photos` fills this directory for you from a machine with internet
access. `.webp`, `.jpg`, `.jpeg` and `.png` are all accepted.

Nothing in the build downloads these files. Each one is resolved against the
filesystem at build time, so a missing photograph falls back to its generated
SVG illustration instead of producing a broken image.

Do not commit multi-megabyte originals — resize and convert to WebP first. The
sizes and quality settings are in the record file.
