import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductDto } from './Types/product.dto';
import { User } from 'src/auth/user.entity';
import { Product } from './product.entity';
import { GetUser } from 'src/auth/jwt/get-user.decorator';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
      
    ){}

    async createProduct(productDto: ProductDto,@GetUser() user: User):Promise<Product>{
        try{
        return this.productRepository.createProduct(productDto, user);
        }catch(error){
            throw new InternalServerErrorException('Failed to Create Product');
        }
        

    }
    async updateProduct(id: string, productDto:ProductDto, @GetUser() user:User):Promise<Product>{
        try{
            return this.productRepository.updateProduct(id, productDto, user);
        }catch(error){
            throw new InternalServerErrorException('Failed to Update Product');
        }
    }

    async deleteProduct(id: string, @GetUser() user:User):Promise<Product>{
        try{
            return this.productRepository.deleteProduct(id, user);
        }catch(error){
            throw new InternalServerErrorException('Failed to Delete Product');
        }
    }
    async getProduct(id: string, @GetUser() user:User):Promise<Product>{
        try{
            return this.productRepository.getProduct(id, user);
        }catch(error){
            throw new InternalServerErrorException('Failed to Show Product');
        }
    }
        async getAllProducts(@GetUser() user:User):Promise<Product[]>{
            try{
                return this.productRepository.getAllProducts(user);
            }catch(error){
                throw new InternalServerErrorException('Failed to Show Products');
            }
    }

    

}
