/* eslint-disable */

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Product } from './Product.entity';
import { Order_Item } from './Order_Item';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: true})
  @ManyToOne(() => User)
  @JoinTable()
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @OneToMany(() => Order_Item, (item) => item.order)
  orderItems: Order_Item[];
}
