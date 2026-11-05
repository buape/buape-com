# buape-com

This is the source code for the [buape.com](https://buape.com) website.

## Content

- `/blog/:slug` and the homepage blog cards read Docket's **Buape.com Blog** category (`blog`). `/blog` links to the homepage blog section.
- `/:slug` content pages read **Buape.com Pages** (`pages`); explicit application routes take precedence.
- Homepage testimonials read **Buape.com Testimonials** (`testimonials`), sorted by the `order` frontmatter field. Entries use their title/body plus `belowName`, `icon`, `link`, and `linkBottomText` frontmatter.
- `/api/staff` reads team profiles from the internal Buape API. All content editing and publishing happens in Docket.
- Docket reads default to `https://docket.buape.com`, including local development. Set `VITE_DOCKET_URL` to explicitly use another instance. Browser loaders and Worker metadata use the same client configuration.
