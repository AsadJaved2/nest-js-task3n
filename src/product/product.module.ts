import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from '../categories/cat.entity';
import { CategoryRepository } from '../categories/cat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductService, ProductRepository, CategoryRepository],
  controllers: [ProductController],
})
export class ProductModule {}
