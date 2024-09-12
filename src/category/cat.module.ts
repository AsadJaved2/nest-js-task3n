import { Module } from '@nestjs/common';
import { CategoryService } from './cat.service';
import { CategoryController } from './cat.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
