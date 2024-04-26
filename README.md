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



```sql
select * from annotations_transcripts_gene_assignments
where gene_symbol like "%MAK%"
or gene_title like "%MAK%"
order by gene_symbol, transcript_id
;
```

Now you annotate. For each transcript id,

```sql
-- Get the Transcript expression data
select * from data_expression_transcripts
where transcript_id = 3974618
and dataset = "CORE"
;

----------- Now TABS -----------

-- Gene Assignments
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

-- GO Terms
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

-- mRNA Assignments
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

-- Pathway
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

-- Protein Domains
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

-- Swissprot
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

-- Unigene
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

----------- ALTERNATE SPLICING ---------
SELECT DISTINCT
  d.probeset_id,
  d.rma,
  d.rma_glaucoma,
  a.transcript_id,
  d.tissue,
  d.dataset
FROM
  data_expression_probesets d
  LEFT JOIN annotations_probesets a
  ON d.transcript_id = a.transcript_id
WHERE
  a.transcript_id = 2941632
  AND d.dataset = "CORE"
ORDER BY
  d.tissue,
  d.probeset_id


--------- GENE EXPRESSION BY TISSUE ------------
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

## License

GPLv3
