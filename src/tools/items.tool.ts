import { DatabaseService } from "../services/database.service.js";
import { SapService } from "../services/sap.service.js";
import { createItemToolsSchema, getItemsToolsSchema } from "./schema.js";

export const getItemsTool = {
  name: "get-items",
  description: "Get Items Information Based on Item code.",
  inputSchema: getItemsToolsSchema,
  handler: async ({ itemCode }: { itemCode: string }) => {
    const sapService = new SapService();
    const items = await sapService.getItems(itemCode);
    return {
      content: [
        {
          type: "text" as const,
          text: `Items information: ${JSON.stringify(items)}`,
        },
      ],
    };
  },
};

export const createItemTool = {
  name: "create-item",
  description:
    "Create a new item in SAP B1 System provided the item series and description",
  inputSchema: createItemToolsSchema,
  handler: async ({
    itemSeries,
    itemModelCode,
    itemDescription,
    itemPrice,
    itemForeignDescription,
    itemBarcode,
    itemBrand,
    itemATCCategory,
    itemGroup,
    itemSubGroup,
    itemIsSerial,
    itemU_Model,
    itemU_MCL1,
    itemU_MCL2,
    itemU_MCL3,
    itemU_USP1,
    itemU_USP2,
    itemU_USP3,
    itemU_Line,
    itemU_Series,
  }: {
    itemSeries: string;
    itemModelCode: string;
    itemDescription: string;
    itemPrice?: number;
    itemForeignDescription?: string;
    itemBarcode?: string;
    itemBrand?: string;
    itemATCCategory?: string;
    itemGroup?: string;
    itemSubGroup?: string;
    itemIsSerial?: boolean;
    itemU_Model?: string;
    itemU_MCL1?: string;
    itemU_MCL2?: string;
    itemU_MCL3?: string;
    itemU_USP1?: string;
    itemU_USP2?: string;
    itemU_USP3?: string;
    itemU_Line?: string;
    itemU_Series?: string;
  }) => {
    const databaseService = DatabaseService.getInstance();
    const itemSeriesId = await databaseService.getItemSeries(itemSeries);

    if (!itemSeriesId) {
      console.error(`Item series ${itemSeries} not found`);
      throw new Error(`Item series ${itemSeries} not found`);
    }

    const sapService = new SapService();
    const createItemResponse = await sapService.createItem({
      itemSeries: itemSeriesId,
      itemModelCode: itemModelCode,
      itemDescription: itemDescription,
      itemPrice: itemPrice ?? 0,
      itemForeignDescription: itemForeignDescription,
      itemBarcode: itemBarcode,
      itemBrand: itemBrand,
      itemATCCategory: itemATCCategory,
      itemGroup: itemGroup,
      itemSubGroup: itemSubGroup,
      itemIsSerial: itemIsSerial,
      itemU_Model: itemU_Model,
      itemU_MCL1: itemU_MCL1,
      itemU_MCL2: itemU_MCL2,
      itemU_MCL3: itemU_MCL3,
      itemU_USP1: itemU_USP1,
      itemU_USP2: itemU_USP2,
      itemU_USP3: itemU_USP3,
      itemU_Line: itemU_Line,
      itemU_Series: itemU_Series,
    });
    return {
      content: [
        {
          type: "text" as const,
          text: `Item created: ${JSON.stringify(createItemResponse.itemCode)}`,
        },
      ],
    };
  },
};
