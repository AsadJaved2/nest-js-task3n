import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { User } from './auth/user.entity';
@Module({

  imports: [
    // ConfigModule.forRoot(),
   TypeOrmModule.forFeature([User,Product]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'asad12345',
      database: 'NESTJS-PMS',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    AuthModule,
    
  ],
})
export class AppModule {}
