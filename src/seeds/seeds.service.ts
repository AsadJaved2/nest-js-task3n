import { Injectable } from '@nestjs/common';
import { Category } from '../categories/cat.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CategorySeeder {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    await this.seedCategories();
  }

  private async seedCategories() {
    const categoryRepository = this.dataSource.getRepository(Category);

    const categories = [
      { name: 'AutoMobiles' },
      { name: 'Animals' },
      { name: 'Electronics' },
    ];

    for (const categoryData of categories) {
      const existingCategory = await categoryRepository.findOneBy({
        name: categoryData.name,
      });

      if (!existingCategory) {
        const newCategory = new Category();
        newCategory.name = categoryData.name;
        await categoryRepository.save(newCategory);
        console.log(`Category ${newCategory.name} has been added.`);
      } else {
        console.log(`Category ${existingCategory.name} already exists.`);
      }
    }

    console.log('Categories seeding completed.');
  }
}
