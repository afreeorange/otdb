# The Ocular Tissue Database

⚠️ Work in progress, will be released mid-October.

Here are some screenshots:

![](https://public.nikhil.io/papers/otdb-screens/01.png)
![](https://public.nikhil.io/papers/otdb-screens/02.png)
![](https://public.nikhil.io/papers/otdb-screens/03.png)
![](https://public.nikhil.io/papers/otdb-screens/04.png)
![](https://public.nikhil.io/papers/otdb-screens/05.png)
![](https://public.nikhil.io/papers/otdb-screens/06.png)

## Development

### Searching

### Steps

First search

```sql
select
  DISTINCT transcript_id, gene_symbol, gene_title
from annotations_transcripts_gene_assignments a
where
    gene_symbol LIKE "%DDX%"
    OR
    gene_title LIKE "%DDX%"
order by gene_symbol, transcript_id
;
```

Now you annotate

#### Gene

```sql
-- We first want a 'fuzzy' search on the Gene name or description
select * from annotations_transcripts_gene_assignments
where
    gene_symbol LIKE "DDX%"
    OR
    gene_title LIKE "%box%"
limit 100;

-- Now we want to annotate each found Transcript ID with stuff
-- from the `annotations_` tables.
```

## License

MIT
