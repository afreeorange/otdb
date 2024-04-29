# Search

NOTE: The SQLite driver I'm using (`@libsql/client` from Turso) does not support a few things from the 'standard' driver. One example is aggregate queries (notably `STRING_AGG` or `GROUP_CONCAT`).

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
  d.transcript_id = 2941632
AND
  d.dataset = 'CORE'
ORDER BY
  d.transcript_id,
  d.tissue
;
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
  a.transcript_id = 2941632
  AND d.dataset = "CORE"
ORDER BY
  d.tissue,
  d.probeset_id
;
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
  gene_accession
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
  accession,
  swissprot_accession
FROM
  annotations_transcripts_swissprot
WHERE
  transcript_id = 2941632
  AND swissprot_accession != ''
GROUP BY
  transcript_id
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
  d.tissue = 'CHOROID'
  AND d.dataset = 'CORE'
  AND a.gene_symbol IS NOT NULL
ORDER BY
  d.plier DESC
LIMIT 100;
;
```

---

# Old Stuff

From when I attempted Postgres


```typescript
const gene = `
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
	INNER JOIN annotations_transcripts a
    ON a.transcript_id = d.transcript_id
	INNER JOIN annotations_transcripts_gene_assignments ag
    ON ag.transcript_id = a.transcript_id
WHERE
	d.dataset = $2::text
	AND(ag.gene_symbol LIKE '%' || $1::text || '%'
      OR ag.gene_title LIKE '%' || $1::text || '%')
ORDER BY
	ag.gene_symbol,
	d.transcript_id,
	d.tissue
`;

const mrna = `
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
	INNER JOIN annotations_transcripts a
    ON a.transcript_id = d.transcript_id
	INNER JOIN annotations_transcripts_gene_assignments ag
    ON ag.transcript_id = a.transcript_id
	INNER JOIN annotations_transcripts_mrna_assignments ar
    ON ar.transcript_id = ag.transcript_id
WHERE
	d.dataset = $2::text
	AND(ar.accession LIKE '%' || $1::text || '%'
		  OR ar.description LIKE '%' || $1::text || '%')
ORDER BY
	ag.gene_symbol,
	d.transcript_id,
	d.tissue
`;

const transcriptId = `
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
	INNER JOIN annotations_transcripts a
    ON a.transcript_id = d.transcript_id
	INNER JOIN annotations_transcripts_gene_assignments ag
    ON ag.transcript_id = a.transcript_id
WHERE
	CAST(d.transcript_id AS varchar)
	LIKE '%' || $1::text || '%'
	AND dataset = $2::text
ORDER BY
	ag.gene_symbol,
	d.transcript_id,
	d.tissue
`;
```

---

# Old Express Handlers

```typescript
import { Router, Request, Response, NextFunction } from "express";

import { annotations, client } from "../../db";
import { schemas, validateWith } from "../../models/schemas";

const router = Router();

const makeHandler =
  (req: Request, res: Response, _: NextFunction) =>
  async (handler: Function) => {
    try {
      return res.json({
        data: await handler(client, parseInt(req.params.transcriptId)),
      });
    } catch (e) {
      return res.json({
        error: e,
      });
    }
  };

[
  ["/genes/:transcriptId", annotations.affymetrix.genes],
  ["/go/:transcriptId", annotations.affymetrix.go],
  ["/mrna/:transcriptId", annotations.affymetrix.mrna],
  ["/pathways/:transcriptId", annotations.affymetrix.pathways],
  ["/protein_domains/:transcriptId", annotations.affymetrix.proteinDomains],
  ["/swissprot/:transcriptId", annotations.affymetrix.swissprot],
  ["/unigene/:transcriptId", annotations.affymetrix.unigene],
].map(([path, handler]) =>
  router.get(
    path as string,
    validateWith(schemas.annotations.affymetrix),
    (...args) => makeHandler(...args)(handler as Function)
  )
);

export default router;
```
