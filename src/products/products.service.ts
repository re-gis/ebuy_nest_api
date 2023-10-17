/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/DTOS/product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Product } from 'src/entities/Product.entity';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from 'src/payload/ApiResponse';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) public productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createProduct(
    file: Express.Multer.File,
    dto: ProductDto,
  ): Promise<ApiResponse> {
    if (
      !dto.description ||
      !dto.price ||
      !dto.productName ||
      !dto.quantity ||
      !file
    )
      return new ApiResponse(false, 'All product details are required');

    if (dto.quantity <= 0)
      return new ApiResponse(false, 'Quantity must not be zero(0)');
    const existingProduct = await this.productRepository.findOne({
      where: { productName: dto.productName },
    });
    if (existingProduct)
      return new ApiResponse(false, 'Product already exists');

    // upload the photo
    const media = await this.cloudinaryService.uploadImage(file);
    if (!media)
      return new ApiResponse(false, 'Error while uploading product photo');

    // save the product
    const product = this.productRepository.create({
      description: dto.description,
      imageUrl: media.secure_url,
      secureUrl: media.public_id,
      productName: dto.productName,
      price: dto.price,
      quantity: dto.quantity,
    });

    await this.productRepository.save(product);
    return new ApiResponse(true, 'Product added successfully', product);
  }

  async getAllProducts(): Promise<ApiResponse> {
    const products = await this.productRepository.find();
    if (products.length == 0)
      return new ApiResponse(false, 'No products retrieved!');
    return new ApiResponse(true, 'Products fetched successfully', products);
  }

  async getOneProduct(id: number): Promise<Product | ApiResponse> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) return new ApiResponse(false, `Product ${id} not found!`);
    return product;
  }

  async updateProduct(
    id: number,
    attrs: any,
    user: User,
  ): Promise<ApiResponse> {
    // this is done by admins only
    if (!user) {
      return new ApiResponse(false, 'Login to perform this action...');
    }

    if (user.isAdmin == false) {
      return new ApiResponse(false, 'Not authorised to perform this action...');
    }

    // get the product
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) return new ApiResponse(false, `Product ${id} not found!`);
    Object.assign(product, attrs);
    await this.productRepository.save(product);
    return new ApiResponse(true, 'Product updated successfully!', product);
  }

  async deleteProduct(id: number, user: User): Promise<ApiResponse> {
    // check user role
    if (!user) {
      return new ApiResponse(false, 'Login to perform this action...');
    }

    if (user.isAdmin == false) {
      return new ApiResponse(false, 'Not authorised to perform this action...');
    }

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) return new ApiResponse(false, `Product ${id} not found!`);

    await this.productRepository.remove(product);
    return new ApiResponse(true, `Product ${id} deleted successfully...`);
  }
}
