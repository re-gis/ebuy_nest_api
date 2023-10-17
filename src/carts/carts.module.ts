/* eslint-disable */
import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart.entity';
import { Cart_Item } from 'src/entities/Cart_Item';
import { Product } from 'src/entities/Product.entity';
import { User } from 'src/entities/User.entity';
import { CartsService } from './carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Cart_Item, Product, User])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
