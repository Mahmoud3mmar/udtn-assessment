import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from '../users/common-utils/Role.enum';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { RolesGuard } from '../auth/guards/role.guards';
import { FindAllProductsDto } from './dto/find-all-products.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
  };

  const mockProductsService = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    remove: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Decorators', () => {
    it('should have ADMIN role required for create', () => {
      const roles = Reflect.getMetadata('roles', controller.create);
      expect(roles).toEqual([Role.ADMIN]);
    });

    it('should have guards applied for create', () => {
      const guards = Reflect.getMetadata('__guards__', controller.create);
      expect(guards[0].name).toBe(AccessTokenGuard.name);
      expect(guards[1].name).toBe(RolesGuard.name);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createDto: CreateProductDto = {
        name: 'New Product',
        price: 200,
        description: 'New Description',
        stock: 100
      };

      const result = await controller.create(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockQuery: FindAllProductsDto = { 
        page: 1, 
        limit: 10, 
        sortBy: 'name', 
        order: 'asc'
      };
  
      const result = await controller.findAll(mockQuery);
      expect(service.findAll).toHaveBeenCalledWith(
        mockQuery.page,
        mockQuery.limit,
        mockQuery.sortBy,
        mockQuery.order
      );
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await controller.findOne(mockProduct._id);
      expect(service.findOne).toHaveBeenCalledWith(mockProduct._id);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto: UpdateProductDto = { price: 150 };
      const result = await controller.update(mockProduct._id, updateDto);
      expect(service.update).toHaveBeenCalledWith(mockProduct._id, updateDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const result = await controller.remove(mockProduct._id);
      expect(service.remove).toHaveBeenCalledWith(mockProduct._id);
      expect(result).toEqual(mockProduct);
    });
  });
});