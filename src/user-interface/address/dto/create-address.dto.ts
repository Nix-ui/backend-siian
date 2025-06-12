import {IsOptional ,IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    department: string;
    @IsNotEmpty()
    @IsString()
    province: string;
    @IsNotEmpty()
    @IsString()
    street: string;
    @IsOptional()
    @IsString()
    details?: string;
}