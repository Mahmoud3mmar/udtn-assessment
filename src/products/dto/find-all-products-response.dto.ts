import { Product } from '../schemas/product.schema';

export class FindAllProductsResponseDto {
  products: Product[];
  totalItems: number;
  totalPages: number;
} 