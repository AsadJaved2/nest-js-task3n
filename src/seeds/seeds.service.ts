import { Injectable } from '@nestjs/common';
import { Category } from 'src/categories/cat.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class categorySeeder {
  constructor(private dataSource: DataSource) {}

  async seed() {
    const categoryRepository = this.dataSource.getRepository(Category);

    const categories = [
      { name: 'AutoMobiles' },
      { name: 'Animals' },
      { name: 'Electronics' },
    ];

    for (const category of categories) {
      const existingCategory = await categoryRepository.findOneBy({
        name: category.name,
      });
      if (!existingCategory) {
        await categoryRepository.save(category);
      }
    }
  }
}
