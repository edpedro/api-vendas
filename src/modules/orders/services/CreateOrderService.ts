import { IOrder } from './../domain/models/IOrder';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const exitisProducts = await this.productsRepository.findAllByIds(products);

    if (!exitisProducts) {
      throw new AppError('Could not find any products with the given id');
    }

    const exitisProductsIds = exitisProducts.map(product => product.id);

    const checkIndestentProducts = products.filter(
      product => !exitisProductsIds.includes(product.id),
    );

    if (checkIndestentProducts.length) {
      throw new AppError(
        `Could not dinf product ${checkIndestentProducts[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        exitisProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const seralizedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: exitisProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: seralizedProducts,
    });

    const { order_products } = order;

    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        exitisProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateStock(updateProductQuantity);

    return order;
  }
}

export default CreateOrderService;
