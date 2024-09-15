import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { User } from './auth/user.entity';
import { Category } from './categories/cat.entity';
import { categorySeeder } from './seeds/seeds.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Product, Category]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    AuthModule,
  ],
  providers: [categorySeeder],
})
export class AppModule {}
