# The Ocular Tissue Database

⚠️ Work in progress. I use this as a way to experiment and learn so this might be the case for a while 😄

Here are some screenshots:

![](https://public.nikhil.io/papers/otdb-screens/01.png)
![](https://public.nikhil.io/papers/otdb-screens/02.png)
![](https://public.nikhil.io/papers/otdb-screens/03.png)
![](https://public.nikhil.io/papers/otdb-screens/04.png)
![](https://public.nikhil.io/papers/otdb-screens/05.png)
![](https://public.nikhil.io/papers/otdb-screens/06.png)

## Development

This is a Monorepo managed by pNPM.

```bash
# Install dependencies
pnpm i

# Fetch the database for local development
pnpm fetch-db
```

### Client

```css
@plugin "daisyui/theme" {
  name: "otdb";

  --color-base-100: white;
  --color-base-content: #111;

  --color-primary-focus: #111;
  --color-primary-content: white;

  --color-secondary: #111;
}
```

### Server

Add `DEBUG` to see SQL logs.

```bash
# Create database from local dump
turso db create --from-file otdb.sqlite otdb

# Connect
turso db shell otdb
```

## Authors

Nikhil Anand <mail@nikhil.io>

## License

MIT

---

## References

- [For useQueries, what's the best way to get notified ONCE when all the queries have succeeded?](https://github.com/TanStack/query/discussions/2440)
- Modals: [One](https://dev.to/alexandprivate/your-next-react-modal-with-your-own-usemodal-hook-context-api-3jg7), [two](https://github.com/eBay/nice-modal-react), [three](https://v5.daisyui.com/components/modal/)

## TODO

- [ ] `if (isLoading || !data)`
- [ ] 404 component
- [ ] Biome lint job
- [ ] Data page
- [ ] Each tissue
- [ ] Enter to submit
- [ ] Format Numbers
- [ ] Graph
- [ ] Links to resources (e.g. Entrez) - Make this a constant
- [ ] Loading components
- [ ] Menu
- [ ] Missing expression data component
- [ ] Numbers info (Count, non-overlapping, hyb)
- [ ] Paginated results
- [ ] Query key?
- [ ] Responsive menu hamberder
- [ ] Suspense queries
- [ ] SwissProt
- [ ] Tab selected URI
- [ ] Unigene
- [ ] Error Boundary
- [ ] Zod Schemas and Validation
- [ ] Probeset Accessions
- [ ] No results :/
- [ ] Background for modal
