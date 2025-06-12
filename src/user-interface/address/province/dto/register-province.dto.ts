import { IsNotEmpty, IsString } from 'class-validator';
export class RegisterProvinceDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    department: string;
}