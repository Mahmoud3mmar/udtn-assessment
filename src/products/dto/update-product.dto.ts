import { CreateProductDto } from './create-product.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ required: false, description: 'The name of the product' })
  name?: string;

  @ApiProperty({ required: false, description: 'The price of the product' })
  price?: number;

  @ApiProperty({ required: false, description: 'The description of the product' })
  description?: string;

  @ApiProperty({ required: false, description: 'The stock quantity of the product' })
  stock?: number;
} 