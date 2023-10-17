/* eslint-disable */
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Cart_Item } from "./Cart_Item";

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @OneToMany(() => Cart_Item, (cartItem) => cartItem.cart)
  cartItems: Cart_Item[];
}
