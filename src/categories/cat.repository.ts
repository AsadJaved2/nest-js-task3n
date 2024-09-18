import { DataSource, EntityManager, Repository } from 'typeorm';
import { Category } from './cat.entity';
import { Injectable } from '@nestjs/common';

// export class CategoryRepository extends Repository<Category> {
//   constructor(manager: EntityManager) {
//     super(Category, manager);
//   }
// }

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}