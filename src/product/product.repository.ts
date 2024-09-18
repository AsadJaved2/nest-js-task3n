import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './Types/product.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/jwt/get-user.decorator';
import { CategoryRepository } from '../categories/cat.repository';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    private entityManager: EntityManager,
    private categoryRepository: CategoryRepository, 
  ) {
    super(Product, entityManager);
  }
  async createProduct(
    productDto: ProductDto,
     user: User,
  ): Promise<Product> {
    try {
      const { title, description, price, categoryName } = productDto;

      // Fetch category by name
console.log(categoryName);

      const category = await this.categoryRepository
        .findOne({ where: { id: categoryName } });
console.log(category);

      if (!category) {
        throw new InternalServerErrorException('Category not Found');
      }

      const product = this.create({
        title,
        description,
        price,
        user,
        category,
      });
      await this.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Failed to Create Product');
    }
  }
  async updateProduct(
    id: string,
    productDto: ProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      const { title, description, price } = productDto;

      const product = await this.findOne({ where: { id } });
      product.title = title;
      product.description = description;
      product.price = price;
      await this.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteProduct(id: string,user: User): Promise<Product> {
    try {
      const product = await this.findOne({ where: { id } });
      await this.delete(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProduct(id: string, user: User): Promise<Product> {
    try {
      const product = await this.findOne({ where: { id } });
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllProducts(user: User): Promise<Product[]> {
    try {
      const product = await this.find();
      console.log(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllUserProducts(userId: string): Promise<Product[]> {
    try {
      return this.find({ where: { user: { id: userId } } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async getProductsByUserId(userId: string): Promise<Product[]> {
    try {
      return this.find({ where: { user: { id: userId } } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
    try {
      
      const category = await this.categoryRepository
        .findOne({ where: { id: categoryId } });
      if (!category) {
        throw new InternalServerErrorException('Category Not FOund');
      }
      return this.find({ where: {category } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }
}
