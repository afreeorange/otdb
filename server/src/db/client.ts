/**
 * I've tried a lot of various query clients here. PgSQL, MySQL, etc. Just
 * keeping this separate.
 */

import { createClient } from "@libsql/client";

const config = {
  development: {
    url: "file:../otdb.db",
    // url: "libsql://alert-clobberella-afreeorange.turso.io",
    // authToken:
    //   "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicm8iLCJpYXQiOjE3MTM4NDg2OTAsImlkIjoiMTQ1ZDA0OTYtYzhiYi00Njc2LWJjMzUtNTY5Zjk2MGY1MDc1In0.dD5aKZEhkHx3i1TxsylBWB2iZyVrV3Ljr_ij5FryP2TJRGLmmHBFkEgOzYb19vn3y8fkmHNgm0Id3V5QZwFvAA",
    // syncInterval: 60,
  },
  production: {
    url: "file:../otdb.db",
    // url: "libsql://alert-clobberella-afreeorange.turso.io",
    // authToken:
    //   "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicm8iLCJpYXQiOjE3MTM4NDg2OTAsImlkIjoiMTQ1ZDA0OTYtYzhiYi00Njc2LWJjMzUtNTY5Zjk2MGY1MDc1In0.dD5aKZEhkHx3i1TxsylBWB2iZyVrV3Ljr_ij5FryP2TJRGLmmHBFkEgOzYb19vn3y8fkmHNgm0Id3V5QZwFvAA",
    // syncInterval: 60,
  },
};

const client = createClient(
  process.env.CI ? config.production : config.development
);

export default client;
