import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/cat.entity';
import { User } from '../auth/user.entity';

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

  @ManyToOne(() => Category, (category) => category.products, { eager: false })
  category: Category;

  @ManyToOne(() => User, (user) => user.products, { eager: false })
  user: User;
}
