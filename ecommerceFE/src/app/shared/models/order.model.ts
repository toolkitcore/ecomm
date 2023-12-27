import { PaymentMethod } from "src/app/core/const/payment-method";

export interface CustomerInfo {
  email: string;
  phoneNumber: string;
  provinceCode: string;
  districtCode: string;
  address: string;
  note: string;
  customerName: string;
}

export interface PurchaseOrderInfo {
  saleCode: string;
  paymentMethod: PaymentMethod;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  categoryId: string;
  quantity: number;
  price?: number;
  name?: number;
  image?: string;
}

export interface OrderLog {
  status: string;
  timeStamp: Date;
}
export interface Order {
  id: string;
  orderCode: string;
  status: string;
  address: string;
  customerName: string;
  phoneNumber: string;
  provinceCode: string;
  districtCode: string;
  paymentMethod: string;
  paymentStatus: string;
  estimatedDeliveryAt: Date;
  createdAt: Date;
  saleCode: string;
  priceSale: number;
  totalPrice: number;
  orderDetails: OrderDetail[];
  orderLogs: OrderLog[];
}