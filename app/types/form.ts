export interface ProductFormState {
  title: string;
  description: string;
  category: string | undefined;
  brand: string;
  price: number;
  discountPercentage: number;
  stock: number;
  sku: string;
  weight: number;
  warrantyInformation: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
  thumbnail: string;
  images: string[];
}
