import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ProductDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    description: string;

    @IsNotEmpty()
    price: number;

}