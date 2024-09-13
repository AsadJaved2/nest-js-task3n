import { Product } from 'src/product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {

@PrimaryGeneratedColumn('uuid')
    id: string;

@Column( {unique : true} ) 
    username: string;

@Column() 
    password: string;

@OneToMany((_type) => Product, (product) => product.user, {eager : true})
products:Product[];          
}