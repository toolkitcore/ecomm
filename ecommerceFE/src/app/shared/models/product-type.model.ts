import { Supplier } from "./supplier.model";

export interface ProductType {
  id: string;
  name: string;
  code: string;
  suppliers?: Supplier[];
}