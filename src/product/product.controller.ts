import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDto } from './Types/product.dto';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
    constructor(@Inject() private prodService: ProductService){}
    @Post('/createProduct')
    async createProduct(@Body() prodDTO: ProductDto, @GetUser() user: User):Promise<Product>{
     try{
        
        const product = await this.prodService.createProduct(prodDTO, user);
        return product;
     }catch(error){
        console.log(error);
     }
    }
    @Put('/updateProduct/:id')
    async updateProduct(@Param('id') id: string, @Body() prodDTO: ProductDto, @GetUser() user:User): Promise<Product>{
        try{
            const product = await this.prodService.updateProduct(id, prodDTO, user);
            return product;
        }catch(err){
            console.log(err);
        }
    }
    @Delete('/deleteProduct/:id')
    async deleteProduct(@Param('id') id: string, @GetUser() user:User): Promise<Product>{
        try{
            const product = await this.prodService.deleteProduct(id, user);
            return product;
        }catch(err){
            console.log(err);
        }
    }
    @Get('/getProduct/:id')
    async getProduct(@Param('id') id: string, @GetUser() user:User): Promise<Product>{
        try{
            const product = await this.prodService.getProduct(id, user);
            return product;
        }catch(err){
            console.log(err);
        }
    }
    @Get('/getAllProducts')
    async getAllProducts( @GetUser() user:User): Promise<Product[]>{
        try{
            const product = await this.prodService.getAllProducts(user);
            return product;
        }catch(err){
            console.log(err);
        }
    }
}
