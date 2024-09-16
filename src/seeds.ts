import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategorySeeder } from './seeds/seeds.service';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(CategorySeeder);
  await seeder.seed();
  await app.close();
}

bootstrap()
  .then(() => console.log('Seeding completed successfully.'))
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
