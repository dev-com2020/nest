import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository} from './product.repository';
import { NotFoundException } from '@nestjs/common';


describe('ProductService', () => {
  let productService;
  let productRepository;
  const mockProductRepository = () => ({
  createProduct: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
      {
        provide: ProductRepository,
      useFactory: mockProductRepository,
    }
      ],
    }).compile();
    productService = await module.get<ProductService>(ProductService);
    productRepository = await module.get<ProductRepository>(ProductRepository);

  });
  describe('createProduct', () => {
    it('powinien zapisać produkt w bazie', async () => {
    productRepository.createProduct.mockResolvedValue('someProduct');
    expect(productRepository.createProduct).not.toHaveBeenCalled();
    const createProductDto = {
      name: 'sample name',
      description: 'jakiś opis',
      price: '123',
    };
    const result = await productService.createProduct(createProductDto);
    expect(productRepository.createProduct).toHaveBeenCalledWith(
      createProductDto,
    );
    expect(result).toEqual('someProduct');
    });
  });
  describe('getProducts', () => {
    it('powinien zwrócić wszsytkie produkty', async () =>{
    productRepository.find.mockResolvedValue('someProduct');
    expect(productRepository.find).not.toHaveBeenCalled();
    const result = await productService.getProducts();
    expect(productRepository.find).toHaveBeenCalled();
    expect(result).toEqual('someProduct');
  });
  });
});

