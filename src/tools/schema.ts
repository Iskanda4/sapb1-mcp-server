import { z } from "zod";

export const getSalesOrderToolsSchema = z.object({
  salesOrderNumber: z
    .string()
    .describe("The Sales Order Number to get information for"),
});

export const getItemsToolsSchema = z.object({
  itemCode: z.string().describe("The Unique Item Code to get information for"),
});

export const createItemToolsSchema = z.object({
  itemSeries: z
    .string()
    .describe(
      "Item Series to be used when creating a new item in SAP B1 System"
    ),
  itemModelCode: z
    .string()
    .describe(
      "Item Model Code to be used when creating a new item in SAP B1 System"
    ),
  itemDescription: z
    .string()
    .describe(
      "Item Description to be used when creating a new item in SAP B1 System"
    ),
  itemPrice: z
    .number()
    .describe(
      "Item Price to be used when creating a new item in SAP B1 System. If not provided, the item will be created with a default price of 0"
    )
    .optional(),
  itemForeignDescription: z
    .string()
    .describe(
      "Item Foreign Description to be used when creating a new item in SAP B1 System. If not provided, the item will be created with a default foreign description of the item description"
    )
    .optional(),
  itemBarcode: z
    .string()
    .describe(
      "Item Barcode to be used when creating a new item in SAP B1 System"
    )
    .optional(),
  itemBrand: z
    .string()
    .describe("Item Brand to be used when creating a new item in SAP B1 System")
    .optional(),
  itemATCCategory: z
    .string()
    .describe(
      "Item ATC Category to be used when creating a new item in SAP B1 System"
    )
    .optional(),
  itemGroup: z
    .string()
    .describe("Item Group to be used when creating a new item in SAP B1 System")
    .optional(),
  itemSubGroup: z
    .string()
    .describe(
      "Item Sub Group to be used when creating a new item in SAP B1 System"
    )
    .optional(),
  itemIsSerial: z
    .boolean()
    .describe(
      "Item Is Serial to be used when creating a new item in SAP B1 System"
    )
    .optional(),
  itemU_Model: z
    .string()
    .describe("Item Model to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_MCL1: z
    .string()
    .describe("Item MCL1 to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_MCL2: z
    .string()
    .describe("Item MCL2 to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_MCL3: z
    .string()
    .describe("Item MCL3 to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_USP1: z
    .string()
    .describe("Item USP1 to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_USP2: z
    .string()
    .describe("Item USP2 to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_USP3: z
    .string()
    .describe("Item USP3 to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_Line: z
    .string()
    .describe("Item Line to be used when creating a new item in SAP B1 System")
    .optional(),
  itemU_Series: z
    .string()
    .describe(
      "Item Series to be used when creating a new item in SAP B1 System"
    )
    .optional(),
});
