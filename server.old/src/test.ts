import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

(async () => {
  let _ = await client.execute(`
  select * from annotations_transcripts_gene_assignments a
  inner join data_expression_transcripts t
  on a.transcript_id = t.transcript_id
  where
    a.gene_symbol like "%MAK%" OR
    a.gene_title like "%MAK%"
  `);

  console.log("_ :>> ", _);
})();
