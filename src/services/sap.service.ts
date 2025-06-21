import axios from "axios";
import {
  CreateItemRequest,
  CreateItemResponse,
  Item,
  ItemSeries,
  SalesOrder,
} from "../types/index.js";
import { AuthService } from "./auth.services.js";
import { config } from "../config/index.js";
import { getHttpAgent } from "../utils/http.utils.js";
import { DatabaseService } from "./database.service.js";

export class SapService {
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  async getSalesOrder(salesOrderNumber: string): Promise<SalesOrder> {
    const sessionId = await this.authService.getValidSessionId();

    const response = await axios.get(
      config.sap.url + "/Orders?$filter=DocNum eq " + salesOrderNumber,
      {
        httpsAgent: getHttpAgent(),
        headers: {
          "Content-Type": "application/json",
          Cookie: `B1SESSION=${sessionId}`,
        },
      }
    );

    const salesOrderData = response.data.value[0];

    if (!salesOrderData || salesOrderData.length === 0) {
      throw new Error("Sales Order not found");
    }

    return this.mapSalesOrderData(salesOrderData);
  }

  private mapSalesOrderData(salesOrderData: any): SalesOrder {
    return {
      number: salesOrderData.DocNum,
      date: salesOrderData.DocDate,
      deliveryDate: salesOrderData.DocDueDate,
      customerCode: salesOrderData.CardCode,
      customerName: salesOrderData.CardName,
      customerReferenceNumber: salesOrderData.DocNum,
      totalAmount: salesOrderData.DocTotal,
      docCurrency: salesOrderData.DocCurrency,
      shipToAddress: salesOrderData.ShipToAddress,
      billToAddress: salesOrderData.BillToAddress,
      documentStatus: salesOrderData.DocStatus,
      items: salesOrderData.DocumentLines.map((lineItem: any) => ({
        itemCode: lineItem.ItemCode,
        quantity: lineItem.Quantity,
        unitPrice: lineItem.UnitPrice,
        discountPercent: lineItem.DiscountPercent,
        currency: lineItem.Currency,
      })),
    };
  }

  async getItems(itemCode: string): Promise<Item> {
    const sessionId = await this.authService.getValidSessionId();

    const response = await axios.get(
      config.sap.url + "/Items?$filter=ItemCode eq '" + itemCode + "'",
      {
        httpsAgent: getHttpAgent(),
        headers: {
          "Content-Type": "application/json",
          Cookie: `B1SESSION=${sessionId}`,
        },
      }
    );

    const itemData = response.data.value[0];

    if (!itemData || itemData.length === 0) {
      throw new Error("Item not found");
    }

    return this.mapItemsData(itemData);
  }

  private mapItemsData(itemsData: any): Item {
    return {
      itemCode: itemsData.ItemCode,
      itemDescription: itemsData.ItemName,
    };
  }

  async createItem(
    createItemRequest: CreateItemRequest
  ): Promise<CreateItemResponse> {
    const sessionId = await this.authService.getValidSessionId();

    // Build the request body
    const requestBody = {
      Series: createItemRequest.itemSeries,
      U_ATCCode: createItemRequest.itemModelCode,
      ItemName: createItemRequest.itemDescription,
      ItemPrices: [
        {
          PriceList: "2",
          Price: createItemRequest.itemPrice,
        },
      ],
      ForeignName: createItemRequest.itemForeignDescription,
      BarCode: createItemRequest.itemBarcode,
      // Manufacturer: createItemRequest.itemBrand, // TODO: Add Mapping for Item Brand
      // ItemsGroupCode: createItemRequest.itemGroup, // TODO: Add Mapping for Item Group
      U_SubGroup: createItemRequest.itemSubGroup,
      U_Catgory: createItemRequest.itemATCCategory,
      ManageSerialNumbers: createItemRequest.itemIsSerial ? "tYES" : "tNO",
      U_Model: createItemRequest.itemU_Model,
      U_MCL1: createItemRequest.itemU_MCL1,
      U_MCL2: createItemRequest.itemU_MCL2,
      U_MCL3: createItemRequest.itemU_MCL3,
      U_USP1: createItemRequest.itemU_USP1,
      U_USP2: createItemRequest.itemU_USP2,
      U_USP3: createItemRequest.itemU_USP3,
      U_Line: createItemRequest.itemU_Line,
      U_Series: createItemRequest.itemU_Series,
      U_Brand: createItemRequest.itemBrand,
    };

    const response = await axios.post(config.sap.url + "/Items", requestBody, {
      httpsAgent: getHttpAgent(),
      headers: {
        "Content-Type": "application/json",
        Cookie: `B1SESSION=${sessionId}`,
      },
    });

    if (response.status !== 201) {
      console.error("Failed to create item", response.data);
      throw new Error("Failed to create item");
    }

    const itemData = response.data;

    if (!itemData || itemData.length === 0) {
      throw new Error("Item not found");
    }

    const createItemResponse: CreateItemResponse = {
      itemCode: itemData.ItemCode,
      itemModelCode: itemData.U_ATCCode,
    };

    return createItemResponse;
  }

  async getItemSeries(): Promise<ItemSeries[]> {
    const sessionId = await this.authService.getValidSessionId();

    const body = {
      DocumentTypeParams: {
        Document: "4",
      },
    };

    const response = await axios.post(
      config.sap.url + "/SeriesService_GetDocumentSeries",
      body,
      {
        httpsAgent: getHttpAgent(),
        headers: {
          "Content-Type": "application/json",
          Cookie: `B1SESSION=${sessionId}`,
        },
      }
    );

    const itemSeriesData = response.data.value;

    const itemSeries: ItemSeries[] = itemSeriesData.map((item: any) => ({
      series: item.Series,
      name: item.Name,
    }));

    const databaseService = DatabaseService.getInstance();
    for (const item of itemSeries) {
      await databaseService.upsertItemSeries(item);
    }

    return itemSeries;
  }
}
