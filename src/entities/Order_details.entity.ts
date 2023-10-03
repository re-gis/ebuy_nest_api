/* eslint-disable */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.entity';
import { Product } from './Product.entity';

@Entity('order_details')
export class Order_details {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  price: number;

  constructor(order: Order, product: Product, quantity: number, price: number) {
    this.order = order;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }
}
