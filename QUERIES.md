# Search

## Stage 1: Get Transcript IDs

### By Gene Symbol or Description

```sql
SELECT DISTINCT
  g.transcript_id,
  g.gene_symbol,
  g.gene_title,
  t.seqname,
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
  OR g.gene_title LIKE "%MAK%"
ORDER BY
  g.gene_symbol,
  g.transcript_id
;
```

### By mRNA Accession or Description

```sql
SELECT DISTINCT
  r.transcript_id,
  r.accession,
  r.description,
  t.seqname,
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

### By Transcript ID

This is an exact match!

```sql
SELECT DISTINCT
  g.transcript_id,
  g.gene_symbol,
  g.gene_title,
  t.seqname,
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

## Stage 2: Get Annotations

### Initial View

Chromosome number

### Expression by Transcript by Tissue

```sql
SELECT
    d.transcript_id,
    d.tissue,
    d.rma,
    d.rma_glaucoma,
    d.plier,
    d.plier_glaucoma
FROM
    data_expression_transcripts d
WHERE
    d.transcript_id IN (2941632, 2957499, 3093259, 3130823)
AND
    d.dataset = "CORE"
ORDER BY
    d.transcript_id,
    d.tissue
```

### Alternate Splicing

```sql
SELECT DISTINCT
  d.probeset_id,
  d.rma,
  d.rma_glaucoma,
  a.transcript_id,
  d.tissue
FROM
  data_expression_probesets d
  LEFT JOIN annotations_probesets a
  ON d.transcript_id = a.transcript_id
WHERE
  a.transcript_id IN (2941632, 2957499, 3093259, 3130823)
  AND d.dataset = "CORE"
ORDER BY
  d.tissue,
  d.probeset_id
```

### Expression by Probeset by Transcript by Tissue

# Annotations

## Gene Assignments

```sql
SELECT DISTINCT
  transcript_id,
  gene_accession,
  gene_symbol,
  gene_title,
  cytoband,
  entrez_gene_id
FROM
  annotations_transcripts_gene_assignments
WHERE
  transcript_id = 2941632
ORDER BY
  accession
;
```

## GO Terms

```sql
SELECT DISTINCT
  annotation,
  id,
  term,
  evidence
FROM
  annotations_transcripts_go_terms
WHERE
  transcript_id = 2941632
ORDER BY
  annotation,
  id
;
```

## mRNA Assignments

```sql
SELECT DISTINCT
  accession,
  assignment_coverage,
  assignment_score,
  assignment_seqname,
  description,
  direct_probes,
  possible_probes,
  source_name,
  transcript_id
FROM
  annotations_transcripts_mrna_assignments
WHERE
  transcript_id = 2941632
ORDER BY
  accession
;
```

## Pathway

```sql
SELECT DISTINCT
  accession,
  name,
  source
FROM
  annotations_transcripts_pathway
WHERE
  transcript_id = 2941632
  AND source != ''
ORDER BY
  accession
;
```

## Protein Domains

```sql
SELECT DISTINCT
  accession,
  source,
  pfam_accession
  domain_description
FROM
  annotations_transcripts_protein_domains
WHERE
  transcript_id = 2941632
  AND source != ''
ORDER BY
  pfam_accession
;
```

## Swissprot

```sql
SELECT DISTINCT
  transcript_id,
  STRING_AGG(accession,",") AS accessions,
  STRING_AGG(swissprot_accession, ",") AS swissprots
FROM
  annotations_transcripts_swissprot s
WHERE
  transcript_id = 2941632
  AND swissprot_accession != ''
GROUP BY
  s.transcript_id
;
```

## Unigene

```sql
SELECT DISTINCT
  u.unigene_id,
  STRING_AGG(e.unigene_expr, ",") as expressions,
  STRING_AGG(u.accession, ",") AS accessions
FROM
  annotations_transcripts_unigene u
  INNER JOIN annotations_transcripts_unigene_expression e
  ON u.unigene_id = e.unigene_id
WHERE
  u.transcript_id = 2941632
GROUP BY
  u.unigene_id
ORDER BY
  u.unigene_id
;
```

# Gene Expression by Tissue

```sql
SELECT DISTINCT
  a.gene_symbol,
  a.gene_title,
  d.plier,
  d.plier_glaucoma,
  d.transcript_id
FROM
  data_expression_transcripts d
INNER JOIN
  annotations_transcripts_gene_assignments a
  ON d.transcript_id = a.transcript_id
WHERE
  d.tissue = "CHOROID"
  AND d.dataset = "CORE"
  AND a.gene_symbol IS NOT NULL
ORDER BY
  d.plier DESC
LIMIT 100;
```

---



```sql

```

Now you annotate. For each transcript id,

```sql
-- Get the Transcript expression data

;
