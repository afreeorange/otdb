# The Ocular Tissue Database - Frontend

## License

MIT

---

## Notes

* Longest Gene Description: 154 chars
* Longest Gene Symbol: 54 chars


### Tissue Expression JSON

```sql
-- All tissues
SELECT DISTINCT
	d.tissue,
	a.gene_symbol AS "gene",
	a.gene_title AS "geneDescription",
	d.plier AS "plier",
	d.plier_glaucoma AS "plierGlaucoma",
	d.transcript_id AS "transcriptId",
	d.dataset
FROM
	data_expression_transcripts d
	INNER JOIN annotations_transcripts_gene_assignments a ON d.transcript_id = a.transcript_id
WHERE
	a.gene_symbol IS NOT NULL
ORDER BY
	d.dataset, d.plier DESC

-- A tissue
SELECT DISTINCT
	a.gene_symbol AS "gene",
	a.gene_title AS "geneDescription",
	d.plier AS "plier",
	d.plier_glaucoma AS "plierGlaucoma",
	d.transcript_id AS "transcriptId",
	d.dataset
FROM
	data_expression_transcripts d
	INNER JOIN annotations_transcripts_gene_assignments a ON d.transcript_id = a.transcript_id
WHERE
	d.tissue = 'RETINA'
	AND a.gene_symbol IS NOT NULL
ORDER BY
	d.dataset
```

---

# The Ocular Tissue Database

## Resources

- [CSS Background Patterns](https://css-pattern.com/)
- [Nunjucks Template Formatter](https://marketplace.visualstudio.com/items?itemName=okitavera.vscode-nunjucks-formatter)
- [VSCode + Nunjucks + HTML](https://hyunbinseo.medium.com/nunjucks-settings-for-vs-code-a0da0dc66b95)
- https://articles.wesionary.team/react-component-library-with-vite-and-deploy-in-npm-579c2880d6ff
- https://github.com/ashleydavis/pnpm-workspace-examples/tree/main/typescript

```typescript
const Base = ({ children }: { children?: any }) => (
  <html lang="en-US" data-theme="light">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>The Ocular Tissue Database</title>
      <link rel="stylesheet" href="/static/styles.css" />
      <script
        src="/static/htmx.min.js"
        integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV"
      ></script>
    </head>
    <body>{children}</body>
    {process.env.NODE_ENV === "development" && (
      <script src="//localhost:35729/livereload.js?snipver=1"></script>
    )}
  </html>
);
```

```
"exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    }
  },
```

---

## Search

### Gene Symbol or Description (Fuzzy)

```sql
SELECT DISTINCT
	d.*,
	ag.gene_symbol,
	ag.gene_title,
	a.seqname,
	a.strand,
	a.start,
	a.stop,
	a.total_probes
FROM
	data_expression_transcripts d
	INNER JOIN annotations_transcripts a ON a.transcript_id = d.transcript_id
	INNER JOIN annotations_transcripts_gene_assignments ag ON ag.transcript_id = a.transcript_id
WHERE
	d.dataset = 'CORE'
	AND(ag.gene_symbol LIKE '%MAK%'
		OR ag.gene_title LIKE '%MAK%')
ORDER BY
	ag.gene_symbol,
	d.transcript_id,
	d.tissue
```

### mRNA Accession or Description (Fuzzy)

```sql
SELECT DISTINCT
	d.*,
	ag.gene_symbol,
	ag.gene_title,
	a.seqname,
	a.strand,
	a.start,
	a.stop,
	a.total_probes
FROM
	data_expression_transcripts d
	INNER JOIN annotations_transcripts a ON a.transcript_id = d.transcript_id
	INNER JOIN annotations_transcripts_gene_assignments ag ON ag.transcript_id = a.transcript_id
	INNER JOIN annotations_transcripts_mrna_assignments ar ON ar.transcript_id = ag.transcript_id
WHERE
	d.dataset = 'CORE'
	AND(ar.accession LIKE '%MAK%'
		OR ar.description LIKE '%MAK%')
ORDER BY
	ag.gene_symbol,
	d.transcript_id,
	d.tissue
```

### Transcript ID (Fuzzy)

```sql
SELECT DISTINCT
	d.*,
	ag.gene_symbol,
	ag.gene_title,
	a.seqname,
	a.strand,
	a.start,
	a.stop,
	a.total_probes
FROM
	data_expression_transcripts d
	INNER JOIN annotations_transcripts a ON a.transcript_id = d.transcript_id
	INNER JOIN annotations_transcripts_gene_assignments ag ON ag.transcript_id = a.transcript_id
WHERE
	CAST(d.transcript_id AS varchar)
	LIKE '%632%'
	AND dataset = 'CORE'
ORDER BY
	ag.gene_symbol,
	d.transcript_id,
	d.tissue
```

## Probesets

```sql
-- Tissue Expression for a given Transcript ID and Dataset
SELECT DISTINCT
	d.probeset_id,
	d.rma,
	d.rma_glaucoma,
	a.transcript_id,
	d.tissue
FROM
	data_expression_probesets d
	LEFT JOIN annotations_probesets a ON d.transcript_id = a.transcript_id
WHERE
	a.transcript_id IN(2941632, 2941633)
	AND d.dataset = 'CORE'
ORDER BY
	d.tissue,
	d.probeset_id

-- Probeset information for a given Tissue and Trascript ID and Dataset
-- NOTE: Adding RMA values will lead to duplicates...
SELECT
  p.probeset_id,
  AVG(CAST (d.dabg as numeric)) dabg,
  AVG(CAST (d.dabg_glaucoma as numeric)) dabg_glaucoma,
  AVG(CAST (d.plier as numeric)) plier,
  AVG(CAST (d.plier_glaucoma as numeric)) plier_glaucoma,
  AVG(CAST(d.rma as numeric)) as rma,
  AVG(CAST(d.rma_glaucoma as numeric)) as rma_glaucoma,
  p.seqname,
  p.strand,
  p.start,
  p.stop,
  p.exon_id,
  p.psr_id,
  p.probe_count,
  p.number_independent_probes,
  p.number_nonoverlapping_probes,
  json_agg(DISTINCT a.gene_accession) AS gene_accessions,
  json_agg(DISTINCT a.gene_symbol) AS gene_symbols
FROM
  annotations_probesets p
  INNER JOIN annotations_probesets_gene_assignments a ON p.probeset_id = a.probeset_id
  INNER JOIN data_expression_probesets d ON d.probeset_id = p.probeset_id
WHERE
  p.transcript_id = 2941632
  AND p.level = 'CORE'
  AND d.tissue = 'CHOROID'
  AND dabg >= 0
  AND dabg_glaucoma >= 0
  AND plier >= 0
  AND plier_glaucoma >= 0
  AND rma >= 0
  AND rma_glaucoma >= 0
GROUP BY
  p.probeset_id,
  dabg,
  dabg_glaucoma,
  plier,
  plier_glaucoma
ORDER BY
  p.probeset_id
```

## Annotations

```sql
-- Base
SELECT
	*
FROM
	annotations_transcripts
WHERE
	transcript_id = 2941632

-- GO Terms
SELECT
	*
FROM
	annotations_transcripts_go_terms
WHERE
	transcript_id = 2941632
ORDER BY
	annotation

-- Pathway
SELECT
	source,
	name
FROM
	annotations_transcripts_pathway
WHERE
	transcript_id = 2525852
	AND source != ''

-- Protein Domains
SELECT
	DISTINCT *
FROM
	annotations_transcripts_protein_domains
WHERE
	transcript_id = 2941632

-- Unigene
SELECT DISTINCT
	u.unigene_id,
	ARRAY_AGG(DISTINCT e.unigene_expr) as expression,
	ARRAY_AGG(DISTINCT u.accession) AS accession
FROM
	annotations_transcripts_unigene u
	INNER JOIN annotations_transcripts_unigene_expression e ON u.unigene_id = e.unigene_id
WHERE
	u.transcript_id = 3130823
GROUP BY
	u.unigene_id
ORDER BY
	u.unigene_id

-- SwissProt
SELECT DISTINCT
	s.transcript_id,
	ARRAY_AGG(s.accession) AS accessions,
	ARRAY_AGG(s.swissprot_accession) AS swissprots
FROM
	annotations_transcripts_swissprot s
WHERE
	transcript_id = 3093259
	AND swissprot_accession != ''
GROUP BY
	s.transcript_id

-- Transcript Gene Assignments
SELECT DISTINCT
	a.transcript_id as id,
	a.gene_accession as accession,
	a.gene_symbol as symbol,
	a.gene_title as title,
	a.cytoband,
	a.entrez_gene_id as geneId
FROM
	annotations_transcripts_gene_assignments a
WHERE
	transcript_id = 2941632

-- Transcript mRNA Assignments
SELECT DISTINCT
	*
FROM
	annotations_transcripts_mrna_assignments
WHERE
	transcript_id = 3093259
ORDER BY
	accession
```

## Miscellaneous

```sql
-- Find all duplicates
SELECT DISTINCT
	*
FROM
	annotations_transcripts_protein_domains
WHERE
	transcript_id IN(
		SELECT
			transcript_id FROM (
				SELECT
					transcript_id, ROW_NUMBER() OVER (PARTITION BY transcript_id) AS occurrences FROM annotations_transcripts_protein_domains) AS duplicates
			WHERE
				duplicates.occurrences > 1);

-- Database size
select pg_size_pretty(pg_database_size('otdb'))
--
```


Will this be around like PHP was 12 years from now?


https://www.affymetrix.com/analysis/downloads/na27/

---

TODO

- [ ] Background on panels
- [ ] Graphs!
- [ ] Page - Colophon
- [ ] Page - Expression by Tissue
- [ ] Page - API documentation
- [ ] Page - Publication
- [ ] Tables - Align top
- [ ] Tabs???
- [ ] TopBar
- [ ] Dark Mode?
- [ ] Organize
- [ ] Page Titles
- [ ] RESPONSIVE :/
- [ ] Loading
- [ ] Keys for rows
- [ ] Badge inline blocks
- [ ] Badge margins
- [ ] Dataset
- [ ] What are `moduleResolution` options?
- [ ] tRPC
- [ ] BIGINT problem with Postgres and JS
- [ ] Right margin problem with badges...
- [ ] https://dropbox.tech/frontend/measuring-ttvc-web-performance-metric-open-source-library
- [ ] 1024 px and 160px

```
// import path from "path";
// import { fileURLToPath } from "url";
// const __FILENAME = fileURLToPath(import.meta.url);
// export const __DIRNAME = path.dirname(__FILENAME);
// app.use("/static", express.static(path.join(__DIRNAME, "static")));
```

https://www.magicpattern.design/tools/css-backgrounds

```typescript
import { globSync } from "glob";
import { basename, dirname } from "path";

globSync("./**/*.json", {
  ignore: ["node_modules/**", "tsconfig.json", "package.json"],
}).map(async (_) => {
  const file = Bun.file(_);
  const json = await file.json();
  const out = `${dirname(file.name)}/top-100.${basename(file.name)}`;

  console.log("Writing", out);
  await Bun.write(out, JSON.stringify(json.slice(0, 100)));
})```


----

```
/search/gene/<Search Term>
/search/mrna/<Search Term>
/search/transcript_id/<Search Term>

/expression/alternate_splicing/<Transcript IDs>
/expression/tissue/<Tissue>

/annotations/transcript/<Transcript ID>
/annotations/affymetrix/genes/<Transcript ID>
/annotations/affymetrix/go/<Transcript ID>
/annotations/affymetrix/mrna/<Transcript ID>
/annotations/affymetrix/pathways/<Transcript ID>
/annotations/affymetrix/protein_domains/<Transcript ID>
/annotations/affymetrix/swissprot/<Transcript ID>
/annotations/affymetrix/unigene/<Transcript ID>
```
