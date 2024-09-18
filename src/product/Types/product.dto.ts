import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  IsUUID,
} from 'class-validator';
console.log('dto');
export class ProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;
}
