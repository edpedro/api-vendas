import { ProductRepository } from '../../products/infra/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const exitisProducts = await productsRepository.findAllByIds(products);

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

    const order = await ordersRepository.createOrder({
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

    await productsRepository.save(updateProductQuantity);

    return order;
  }
}

export default CreateOrderService;
