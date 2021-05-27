import { IProduct } from './../domain/models/IProduct';
import { IProductsRepository } from './../domain/repositories/IProductsRepository';
import { ICreateProduct } from './../domain/models/ICreateProduct';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
