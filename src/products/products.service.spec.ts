import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<Product>;

  const mockProduct = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    stock:100,
 

  };

  class MockProductModel {
    constructor(private data) {
      this.data = data;
    }
  
  

    save = jest.fn().mockResolvedValue({ ...this.data, _id: '507f1f77bcf86cd799439011' });

   
 
    static find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([mockProduct]),
    });
  
    static countDocuments = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(1), // Mock totalItems count
    });
  
  
    static findById = jest.fn().mockReturnThis();
    static findByIdAndUpdate = jest.fn().mockReturnThis();
    static findByIdAndDelete = jest.fn().mockReturnThis();
    static exec = jest.fn();
    static select = jest.fn().mockReturnThis();
    
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: MockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createDto = {
        name: 'New Product',
        price: 200,
        description: 'New Description',
        stock: 100,
      };

      const result = await service.create(createDto);
      
      expect(result).toEqual({
        ...createDto,
        _id: '507f1f77bcf86cd799439011', // Ensure this matches the mock _id
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const result = await service.findAll();
      expect(result).toEqual({
        products: [mockProduct],
        totalItems: 1,
        totalPages: 1
      });
    });
  });
  

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      MockProductModel.exec.mockResolvedValue(mockProduct);
      const result = await service.findOne(mockProduct._id);
      expect(result).toEqual(mockProduct);
      expect(productModel.findById).toHaveBeenCalledWith(mockProduct._id);
    });

    it('should throw NotFoundException for invalid ID', async () => {
      MockProductModel.exec.mockResolvedValue(null);
      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto: UpdateProductDto = { price: 150 };
      MockProductModel.exec.mockResolvedValue({ ...mockProduct, ...updateDto });

      const result = await service.update(mockProduct._id, updateDto);
      expect(result).toEqual({ ...mockProduct, ...updateDto });
      expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockProduct._id,
        updateDto,
        { new: true }
      );
    });

    it('should throw NotFoundException when updating non-existent product', async () => {
      MockProductModel.exec.mockResolvedValue(null);
      await expect(service.update('invalid-id', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      MockProductModel.exec.mockResolvedValue(mockProduct);
      await service.remove(mockProduct._id);
      expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(mockProduct._id);
    });

    it('should throw NotFoundException when deleting non-existent product', async () => {
      MockProductModel.exec.mockResolvedValue(null);
      await expect(service.remove('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });
});