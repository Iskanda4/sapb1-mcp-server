import { z } from "zod";
import { SapService } from "../services/sap.service.js";
import { getSalesOrderToolsSchema } from "./schema.js";

export const getSalesOrderTool = {
  name: "get-sales-order",
  description: "Get Sales Order Information Based on Sales Order Number.",
  inputSchema: getSalesOrderToolsSchema,
  handler: async (
    { salesOrderNumber }: { salesOrderNumber: string },
    extra: any
  ) => {
    const sapService = new SapService();
    const salesOrder = await sapService.getSalesOrder(salesOrderNumber);
    return {
      content: [
        {
          type: "text" as const,
          text: `Sales Order ${salesOrderNumber} information: ${JSON.stringify(
            salesOrder
          )}`,
        },
      ],
    };
  },
};
