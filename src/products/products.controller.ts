/* eslint-disable */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from 'src/DTOS/product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/Product.entity';
import { ApiResponse } from 'src/payload/ApiResponse';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productService: ProductsService,
  ) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ProductDto,
  ) {
    return this.productService.createProduct(file, dto);
  }

  @Get('/all')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  async getOneProduct(@Param('id') id: string): Promise<Product | ApiResponse> {
    return this.productService.getOneProduct(+id);
  }

  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: string,
    attrs: Partial<Product>,
  ): Promise<ApiResponse> {
    return this.productService.updateProduct(+id, attrs);
  }
}
