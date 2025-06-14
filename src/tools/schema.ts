import { z } from "zod";

export const getSalesOrderToolsSchema = z.object({
  salesOrderNumber: z
    .string()
    .describe("The Sales Order Number to get information for"),
});
