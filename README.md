# buape-com

This is the source code for the [buape.com](https://buape.com) website.

## Content

- `/blog/:slug` and the homepage blog cards read Docket's **Buape.com Blog** category (`blog`). `/blog` links to the homepage blog section.
- `/:slug` content pages read **Buape.com Pages** (`pages`); explicit application routes take precedence.
- Homepage testimonials read **Buape.com Testimonials** (`testimonials`), sorted by the `order` frontmatter field. Entries use their title/body plus `belowName`, `icon`, `link`, and `linkBottomText` frontmatter.
- `/old-blog` and `/old-blog/:slug` serve the Payload blog archive. `/old-pages/:slug` serves Payload pages. Payload preview links stay on these archive routes.
- Docket reads default to `https://docket.buape.com`, including local development. Set `VITE_DOCKET_URL` to explicitly use another instance. Browser loaders and Worker metadata use the same client configuration.
