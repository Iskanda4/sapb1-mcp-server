import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Calculate project root from dist/config/index.js -> project root
const projectRoot = path.resolve(__dirname, "..", "..");
const envPath = path.join(projectRoot, ".env");

dotenv.config({ path: envPath });

const requiredEnvVars = ["SAP_URL", "SAP_USERNAME", "SAP_PASSWORD", "SAP_DB"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Required environment variable ${envVar} is not set`);
  }
}

export const config = {
  sap: {
    url: process.env.SAP_URL,
    username: process.env.SAP_USERNAME,
    password: process.env.SAP_PASSWORD,
    database: process.env.SAP_DB,
  },
} as const;

export type Config = typeof config;
