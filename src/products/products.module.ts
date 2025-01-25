import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ]),
    AuthModule, // Import AuthModule for guards
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Export if other modules need to use ProductsService
})
export class ProductsModule {}
