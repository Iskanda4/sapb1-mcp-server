import axios from "axios";
import { SalesOrder } from "../types/index.js";
import { AuthService } from "./auth.services.js";
import { config } from "../config/index.js";
import { getHttpAgent } from "../utils/http.utils.js";

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
}
