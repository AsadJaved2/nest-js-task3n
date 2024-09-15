import { EntityManager, Repository } from 'typeorm';
import { Category } from './cat.entity';

export class CategoryRepository extends Repository<Category> {
  constructor(manager: EntityManager) {
    super(Category, manager);
  }
}
