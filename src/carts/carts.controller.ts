/* eslint-disable */
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/User.entity';
import { AddToCartDto } from 'src/DTOS/addToCart.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Cart_Item } from 'src/entities/Cart_Item';
import { RemoveItemFromCartDto } from 'src/DTOS/RemoveItemFromCartDto';
import { CartsService } from './carts.service';

@Controller('/api/v1/carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addItemToCart(
    @GetUser() user: User,
    @Body() dto: AddToCartDto,
  ): Promise<string> {
    return this.cartService.addItemToCart(dto, user);
  }

  @Delete('/remove')
  @UseGuards(JwtAuthGuard)
  async removeItemFromCart(
    @Body() dto: RemoveItemFromCartDto,
  ): Promise<string> {
    return this.cartService.removeItemFromCart(dto);
  }
}
