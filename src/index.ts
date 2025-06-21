import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools/index.js";
import { SapService } from "./services/sap.service.js";

const server = new McpServer({
  name: "sap-b1-mcp-server",
  version: "1.0.0",
});

tools.forEach((tool) => {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema.shape,
    tool.handler
  );
});

// TODO: Make UDF Fields Dynamic
// TODO: Add Setup Tool for Seeding Data
// TODO: Add the ability to automatically add UDF Values
// TODO: Better Error Handling & Logging
// TODO: Improve Tool Prompts
// TODO: Add Evals
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server is running on stdio");
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
