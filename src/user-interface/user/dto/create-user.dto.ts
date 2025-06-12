import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        description: 'numero de identificacion del usuario(CI/DNI)',
        example: '1234567890',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    id: string;
    @ApiProperty({
        description: 'email del usuario',
        example: 'example@example.com',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    email: string;
    @ApiProperty({
        description: 'contraseña del usuario',
        example: 'asnkxamdasd',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password: string;
    @ApiProperty({
        description: 'nombres del usuario',
        example: 'Juan Manuel',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @ApiProperty({
        description: 'apellidos materno del usuario',
        example: 'Perez',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    maternalLastName: string;
    @ApiProperty({
        description: 'apellidos paterno del usuario',
        example: 'Perez',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    paternalLastName: string;
    @ApiProperty({
        description: 'departamento del usuario',
        example: 'La Paz',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    department: string;
    @ApiProperty({
        description: 'provincia del usuario',
        example: 'Murillo',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    province: string;
    @ApiProperty({
        description: 'calle del usuario',
        example: 'Calle 123',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    street: string;
    @ApiPropertyOptional({
        description: 'detalles adicionales del usuario',
        example: 'Casa 123',
        type: String,
    })
    @IsOptional()
    @IsString()
    details?: string;
}