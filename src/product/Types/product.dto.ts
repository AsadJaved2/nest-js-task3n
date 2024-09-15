import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;
}
