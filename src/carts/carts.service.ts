/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoveItemFromCartDto } from 'src/DTOS/RemoveItemFromCartDto';
import { AddToCartDto } from 'src/DTOS/addToCart.dto';
import { Cart } from 'src/entities/Cart.entity';
import { Cart_Item } from 'src/entities/Cart_Item';
import { Product } from 'src/entities/Product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) public cartRepository: Repository<Cart>,
    @InjectRepository(Cart_Item)
    public cartItemRepository: Repository<Cart_Item>,
    @InjectRepository(Product) public productRepository: Repository<Product>,
  ) {}

  async addItemToCart(dto: AddToCartDto, user): Promise<string> {
    if (!dto.quantity || !dto.productId) {
      return 'All item details are required!';
    }
    let cart: Cart = await this.cartRepository.findOne({
      where: { user: user.id },
    });

    if (!cart) {
      cart = new Cart();
      cart.user = { id: user.id } as any;
      cart = await this.cartRepository.save(cart);
    }

    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      return 'Product not found!';
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: { product: product, cart: cart },
    });

    if (cartItem) {
      if (dto.quantity <= 0) {
        return 'Quantity must not be less than zero';
      }
      cartItem.quantity += dto.quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      if (dto.quantity <= 0) {
        return 'Quantity must not be less than zero';
      }
      cartItem = new Cart_Item();
      cartItem.cart = cart;
      cartItem.product = product;
      cartItem.quantity = dto.quantity;
      await this.cartItemRepository.save(cartItem);
    }

    return 'Item added to cart';
  }

  async removeItemFromCart(dto: RemoveItemFromCartDto): Promise<string> {
    if (!dto.cartId || !dto.cartItem) {
      return 'All removing item from cart detail is required!';
    }
    // get the cart
    let cart: Cart = await this.cartRepository.findOne({
      where: { id: dto.cartId },
      relations: ['cartItems'],
    });

    if (!cart) {
      return 'Cart not found!';
    }

    const itemToRemove = cart.cartItems.find((item) => {
      item.id === dto.cartItem.id;
    });

    if (!itemToRemove) {
      return 'Cart item not found in the cart!';
    }

    // remove the cart item
    await this.cartItemRepository.remove(itemToRemove);

    return 'Item removed from cart';
  }
  async checkout(): Promise<string> {
    return 'Checkout';
  }
}
