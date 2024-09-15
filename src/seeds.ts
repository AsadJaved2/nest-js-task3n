import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { categorySeeder } from './seeds/seeds.service';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(categorySeeder);
  await seeder.seed();
  await app.close();
}

bootstrap();
