import * as fs from "fs";
import * as path from "path";
import { SessionData } from "../types/index.js";

const CACHE_FILE = path.join(process.cwd(), ".sap-session-cache.json");

export function storeSessionId(sessionId: string) {
  const data: SessionData = {
    sessionId,
    timestamp: Date.now(),
  };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
}

export function getSessionId(): string | null {
  try {
    const cacheData = fs.readFileSync(CACHE_FILE, "utf-8");
    const data: SessionData = JSON.parse(cacheData);
    const now = Date.now();
    const age = now - data.timestamp;

    if (age > 1000 * 60 * 29) {
      return null;
    }
    return data.sessionId;
  } catch {
    return null;
  }
}
