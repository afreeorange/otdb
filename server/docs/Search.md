# OTDB Search

## By Gene Symbol or Description

```sql
-- Level 1: Fetch the initial list of results. Note that there is no CORE
--          or EXTENDED dataset specification here.
--
SELECT DISTINCT
  g.transcript_id,
  g.gene_symbol as symbol,
  g.gene_title as description,
  t.seqname as chromosome,
  t."start",
  t.stop,
  t.strand,
  t.total_probes
FROM
  annotations_transcripts_gene_assignments g
INNER JOIN
  annotations_transcripts t
  ON g.transcript_id = t.transcript_id
WHERE
  g.gene_symbol LIKE "%MAK%"
ORDER BY
  g.gene_symbol,
  g.transcript_id
;

-- Level 1: Now fetch the Transcript's Annotations. See `Annotations.md`

-- Level 2: Now, for each Transcript ID, get data for tissues. This is where
--          we filter by the CORE or EXTENDED datasets. NOTE the 'IN`. Be greedy!
--
SELECT
  d.*
FROM
  data_expression_transcripts d
WHERE
  d.transcript_id in (2941632, 2957499)
AND
  d.dataset = 'CORE'
ORDER BY
  d.transcript_id,
  d.tissue
;

-- Level 3: Now, for each tissue, get Probeset expression data. NOTE that this already
--          contains the data you'll use to display Alternate Splicing, which is simply
--          graphing the RMA and RMA_Glaucoma points for each probeset! Nothing
--          more is required here.
--
--          But hang on. Why do this per tissue? Get all of 'em! Be greedy!
--          It's good in this case. Programmers are strange.
--
SELECT DISTINCT
  p.*,
  a.*
FROM data_expression_probesets p
INNER JOIN annotations_probesets a
  ON p.probeset_id = a.probeset_id
WHERE
  p.transcript_id in (2941632, 2957499)
  AND p.dataset = "CORE"
ORDER BY
  p.tissue,
  p.probeset_id
;
```

## By mRNA Accession or Description

Here, and simply,

- 'Gene Title' → 'mRNA Accession'
- 'Gene Description' → 'mRNA Description'

```sql
SELECT DISTINCT
  r.transcript_id,
  r.accession as symbol,
  r.description,
  t.seqname as chromosome,
  t."start",
  t.stop,
  t.strand,
  t.total_probes
FROM
  annotations_transcripts_mrna_assignments r
INNER JOIN
  annotations_transcripts t
  ON r.transcript_id = t.transcript_id
WHERE
  r.accession LIKE "%MAK%"
  OR r.description LIKE "%MAK%"
ORDER BY
  r.accession,
  r.transcript_id
;
```

All other levels of annotation remain the same as with the Gene Symbol/Description search.

## By Transcript ID

This is an _exact_ match! And will look through genes only.

```sql
SELECT DISTINCT
  g.transcript_id,
  g.gene_symbol as symbol,
  g.gene_title as description,
  t.seqname as chromosome,
  t."start",
  t.stop,
  t.strand,
  t.total_probes
FROM
  annotations_transcripts_gene_assignments g
INNER JOIN
  annotations_transcripts t
  ON g.transcript_id = t.transcript_id
WHERE
  g.transcript_id = 3974618
ORDER BY
  g.gene_symbol,
  g.transcript_id
;
```

All other levels of annotation remain the same as with the Gene Symbol/Description search.
