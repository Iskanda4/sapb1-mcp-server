export interface SalesOrder {
  number: string;
  date: Date;
  deliveryDate: Date;
  customerCode: string;
  customerName: string;
  customerReferenceNumber: string;
  totalAmount: number;
  docCurrency: string;
  shipToAddress: string;
  billToAddress: string;
  documentStatus: string;
  items: SalesOrderItem[];
}

export interface SalesOrderItem {
  itemCode: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  currency: string;
}

export interface SessionData {
  sessionId: string;
  timestamp: number;
}

export interface Item {
  itemSeries?: number | null;
  itemCode: string;
  itemDescription: string;
}

export interface CreateItemRequest {
  itemSeries: number;
  itemModelCode: string;
  itemDescription: string;
  itemForeignDescription?: string;
  itemBarcode?: string;
  itemBrand?: string;
  itemPrice?: number;
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
}

export interface CreateItemResponse {
  itemCode: string;
  itemModelCode: string;
}

export interface ItemSeries {
  series: number;
  name: string;
}
