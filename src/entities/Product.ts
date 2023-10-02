/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity: number;

  constructor(
    productName: string,
    description: string,
    quantity: number,
    price: number,
  ) {
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}
