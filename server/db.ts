import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

// Create the connection with optimized Supabase config
const client = postgres(connectionString, {
  ssl: 'require',
  max: 1, // Limit connections for development
  idle_timeout: 20,
  connect_timeout: 10,
  socket_timeout: 60,
  prepare: false, // Disable prepared statements for better Supabase compatibility
});
export const db = drizzle(client, { schema });