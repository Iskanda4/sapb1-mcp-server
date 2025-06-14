import axios from "axios";
import { config } from "../config/index.js";
import { getHttpAgent } from "../utils/http.utils.js";
import { storeSessionId, getSessionId } from "../utils/cache.utils.js";

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async getValidSessionId(): Promise<string> {
    let sessionId = getSessionId();

    if (sessionId) {
      return sessionId;
    }

    console.error("Initiating SAP Session");

    const response = await axios.post(
      config.sap.url + "/Login",
      {
        UserName: config.sap.username,
        Password: config.sap.password,
        CompanyDB: config.sap.database,
      },
      {
        httpsAgent: getHttpAgent(),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const sessionId = response.data.SessionId;
      storeSessionId(sessionId);
      return sessionId;
    } else {
      throw new Error("Failed to get valid session ID");
    }
  }
}
