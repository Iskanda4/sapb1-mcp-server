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
