import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDto } from './Types/product.dto';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(@Inject() private prodService: ProductService) {}
  @Post('/createProduct')
  async createProduct(
    @Body() prodDTO: ProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      const product = await this.prodService.createProduct(prodDTO, user);
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }
  @Put('/updateProduct/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() prodDTO: ProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      const product = await this.prodService.updateProduct(id, prodDTO, user);
      return product;
    } catch (err) {
      throw new InternalServerErrorException('Failed to update products');
    }
  }
  @Delete('/deleteProduct/:id')
  async deleteProduct(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      const product = await this.prodService.deleteProduct(id, user);
      return product;
    } catch (err) {
      throw new InternalServerErrorException('Failed to delete products');
    }
  }
  @Get('/:id')
  async getProduct(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      const product = await this.prodService.getProduct(id, user);
      return product;
    } catch (err) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }
  @Get('/AllProducts')
  async getAllProducts(@GetUser() user: User): Promise<Product[]> {
    try {
      const product = await this.prodService.getAllProducts(user);
      return product;
    } catch (err) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  @Get('/user')
  async getAllUserProducts(@GetUser() user: User): Promise<Product[]> {
    try {
      const products = await this.prodService.getAllUserProducts(user.id);
      return products;
    } catch (err) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }
  @Get('/user/:id')
  async getUserProducts(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product[]> {
    try {
      const products = await this.prodService.getProductsByUserId(id, user);
      return products;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }
  @Get('category/:categoryId')
  async getProductsByCategoryId(
    @Param('categoryId') categoryid: string,
  ): Promise<Product[]> {
    try {
      return this.prodService.getProductsByCategoryId(categoryid);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }
}
