import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Product {

@PrimaryGeneratedColumn('uuid')
    id: string;

@Column() 
    title: string;

@Column() 
    description: string;


@Column('decimal') 
     price: number;
     
// @Column('uuid') 
//      userId: string;

@ManyToOne((_type) => User, (user) => user.products, {eager: false} )
@Exclude({toPlainOnly:true})
user: User;     

}