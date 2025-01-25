import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Put, 
  Param, 
  Delete, 
  UseGuards,
  Query
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/common-utils/Role.enum';
import { RolesGuard } from '../auth/guards/role.guards';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { Product } from './schemas/product.schema';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { FindAllProductsResponseDto } from './dto/find-all-products-response.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products', type: FindAllProductsResponseDto })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination (default is 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page (default is 10)' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field to sort by (default is "name")' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Order of sorting (default is "asc")' })
  async findAll(
    @Query() query: FindAllProductsDto,
  ): Promise<FindAllProductsResponseDto> {
    return this.productsService.findAll(query.page, query.limit, query.sortBy, query.order);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'Return product by id' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product by id (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product successfully updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by id (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
} 