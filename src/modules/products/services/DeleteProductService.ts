import { IDeleteProduct } from './../domain/models/IDeleteProduct';
import RedisCache from '@shared/cache/RedisCache';

import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({ id }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();

    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
