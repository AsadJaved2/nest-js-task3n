import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductDto } from './Types/product.dto';
import { User } from '../auth/user.entity';
import { Product } from './product.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,

  ) {}

  async createProduct(
    productDto: ProductDto,
    user: User,
  ): Promise<Product> {
    try {

      return await this.productRepository.createProduct(productDto, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to Create Product');
    }
  }
  async updateProduct(
    id: string,
    productDto: ProductDto,
     user: User,
  ): Promise<Product> {
    try {
      return this.productRepository.updateProduct(id, productDto, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to Update Product');
    }
  }

  async deleteProduct(id: string,user: User): Promise<Product> {
    try {
      return this.productRepository.deleteProduct(id, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to Delete Product');
    }
  }
  async getProduct(id: string): Promise<Product> {
    try {
      return this.productRepository.getProduct(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to Show Product');
    }
  }
  async getAllProducts(): Promise<Product[]> {
    try {
      return this.productRepository.getAllProducts();
    } catch (error) {
      throw new InternalServerErrorException('Failed to Show Products');
    }
  }

  async getAllUserProducts(userId: string): Promise<Product[]> {
    try {
      return this.productRepository.getAllUserProducts(userId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to Show Products');
    }
  }

  async getProductsByUserId(userId: string, user: User): Promise<Product[]> {
    try {
      return this.productRepository.getProductsByUserId(userId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
    try {
      return this.productRepository.getProductsByCategoryId(categoryId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }
}
