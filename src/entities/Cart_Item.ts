/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './Cart.entity';
import { Product } from './Product.entity';

@Entity('cart_items')
export class Cart_Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ nullable: true })
  quantity: number;
}
