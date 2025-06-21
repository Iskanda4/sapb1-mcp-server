import { getSalesOrderTool } from "./sales-order.tool.js";
import { createItemTool, getItemsTool } from "./items.tool.js";

export const tools = [getSalesOrderTool, getItemsTool, createItemTool];
