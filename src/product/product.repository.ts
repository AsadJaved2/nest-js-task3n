import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Product } from "./product.entity";
import { ProductDto } from "./Types/product.dto";
import { User } from "src/auth/user.entity";
import { GetUser } from "src/auth/jwt/get-user.decorator";

@Injectable()
export class ProductRepository extends Repository<Product>{
    constructor(private dataSource: DataSource){
        super(Product, dataSource.createEntityManager());
    }

    async createProduct(productDto: ProductDto,@GetUser() user:User): Promise<Product>{
      try {
        const {title, description, price} = productDto;
    
        const product = this.create({ title, description, price,user});
        await this.save(product);
        return product;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
    async updateProduct(id: string, productDto: ProductDto,@GetUser() user:User): Promise<Product>{
      try {
        const {title, description, price} = productDto;
    
        const product = await this.findOne({where:{id}});
       product.title = title;
        product.description = description;
        product.price = price;
      await this.save(product);
        return product;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }

    async deleteProduct(id: string, @GetUser() user:User): Promise<Product>{
      try {

        const product = await this.findOne({where:{id}});
        await this.delete(product);
        return product;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }

    async getProduct(id: string, @GetUser() user:User): Promise<Product>{
      try {
        const product = await this.findOne({where:{id}});
        return product;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }

    async getAllProducts( @GetUser() user:User): Promise<Product[]>{
      try {
        const product = await this.find();
        return product;
      } catch(error) {
        throw new InternalServerErrorException();
      }
    }
    //user products :-this.find({where:{userId:id}})
    //category products :-this.find({where:{categoryId:id}})
    //userProduct this.find({where:{userId:user.id}})
}