import { ProductType } from "./product-type.model";

export interface Supplier {
  id: string;
  name: string;
  logo: string;
  code: string;
  productTypes: ProductType[];
}