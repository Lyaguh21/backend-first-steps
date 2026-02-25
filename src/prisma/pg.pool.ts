// import { Pool } from 'pg';

// const globalForPg = globalThis as unknown as { pgPool?: Pool };

// export const pgPool =
//   globalForPg.pgPool ??
//   new Pool({
//     connectionString: process.env.DATABASE_URL,
//     // опционально:
//     // max: 10,
//     // idleTimeoutMillis: 30_000,
//     // connectionTimeoutMillis: 10_000,
//   });

// if (process.env.NODE_ENV !== 'production') globalForPg.pgPool = pgPool;
