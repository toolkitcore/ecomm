export interface Product {
  id?: string;
  slug?: string;
  name: string;
  description: string;
  status: string;
  availableStatus?: string;
  originalPrice: number;
  specialFeatures: string[];
  supplierName?: string;
  productTypeName?: string;
  supplierId?: string;
  productTypeId?: string;
  currentPrice?: number;
  image?: number;
  categories?: ProductCategory[];
  configuration?: ProductConfiguration[];
  averageRate?: number;
  countRate?: number;
}
export interface ProductConfiguration {
  key: string;
  description: string;
}
export interface ProductCategory {
  id?: string;
  name: string;
  image: string;
  price: number;
  isActive: boolean;
  productName: string;
}