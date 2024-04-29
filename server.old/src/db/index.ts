import pg, { Client } from "pg";

/**
 * A reusable query client that simply returns rows without any
 * transformations. Note that `T` must be an array type.
 */
export default async <T>(client: Client, sql: string, ...params: unknown[]) =>
  (await client.query(sql, [...params])).rows as T;

export const client = new pg.Client({
  database: "otdb",
});

(async () => {
  await client.connect();
})();

export { default as annotations } from "./annotations";
export { default as expression } from "./expression";
export { default as search } from "./search";
