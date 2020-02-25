import { Pool } from 'pg'

export const db = new Pool({
  connectionString: process.env.DB_URI,
  // maximum number of clients the pool should contain
  max: process.env.DB_POOL_SIZE || 20,
  // number of milliseconds a client must sit idle in the pool and not be checked out
  // before it is disconnected from the backend and discarded
  idleTimeoutMillis: process.env.DB_POOL_IDLE_TIMEOUT || 3 * 60 * 1000
})
