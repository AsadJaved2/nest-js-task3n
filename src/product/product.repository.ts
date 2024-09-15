import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './Types/product.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { Category } from 'src/categories/cat.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createProduct(
    productDto: ProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      const { title, description, price, categoryId } = productDto;

      // Fetch category by id to associate with the product
      const category = await this.dataSource
        .getRepository(Category)
        .findOne({ where: { id: categoryId } });
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

  async deleteProduct(id: string, @GetUser() user: User): Promise<Product> {
    try {
      const product = await this.findOne({ where: { id } });
      await this.delete(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProduct(id: string, @GetUser() user: User): Promise<Product> {
    try {
      const product = await this.findOne({ where: { id } });
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllProducts(@GetUser() user: User): Promise<Product[]> {
    try {
      const product = await this.find();
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
      const category = await this.dataSource
        .getRepository(Category)
        .findOne({ where: { id: categoryId } });
      if (!category) {
        throw new InternalServerErrorException('Category Not FOund');
      }
      return this.find({ where: { category } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }
}
