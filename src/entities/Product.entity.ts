/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity('products')
@Unique(['productName']) // Assuming product names should be unique
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  secureUrl: string;

  constructor(
    productName: string,
    description: string,
    quantity: number,
    price: number,
    imageUrl?: string,
    secureUrl?: string,
  ) {
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.imageUrl = imageUrl || '';
    this.secureUrl = secureUrl || '';
  }
}
