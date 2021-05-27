import { IUpdateProduct } from './../domain/models/IUpdateProduct';
import { IProduct } from './../domain/models/IProduct';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findOne(id);

    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
