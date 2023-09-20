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

export default {
  gene,
  mrna,
  transcriptId,
};
