# OTDB Transcript Annotations

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
  gene_accession
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

## Pathway

```sql
SELECT DISTINCT
  *
FROM
  annotations_transcripts_pathway
WHERE
  transcript_id = 2316245
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
  accession,
  swissprot_accession
FROM
  annotations_transcripts_swissprot
WHERE
  transcript_id = 2318086
  AND swissprot_accession != ''
;
```

## Unigene

```sql
SELECT DISTINCT
  u.unigene_id,
  e.unigene_expr,
  u.accession
FROM
  annotations_transcripts_unigene u
INNER JOIN
  annotations_transcripts_unigene_expression e
  ON u.unigene_id = e.unigene_id
WHERE
  u.transcript_id = 2941632
ORDER BY
  u.unigene_id
;
```
