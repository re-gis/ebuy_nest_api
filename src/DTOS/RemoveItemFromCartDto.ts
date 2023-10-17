/* eslint-disable */
import { Cart_Item } from 'src/entities/Cart_Item';

export class RemoveItemFromCartDto {
  cartId: number;
  cartItem: Cart_Item;
}
