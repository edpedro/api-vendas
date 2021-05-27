import { IUpdateStockProduct } from './../models/IUpdateStockProduct';
import { ICreateProduct } from './../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from './../models/IProduct';

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findOne(id: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  findAll(): Promise<IProduct[]>;
  find(): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(products: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
}
