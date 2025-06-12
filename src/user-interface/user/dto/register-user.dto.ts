import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class RegisterUserDto {
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
    @ApiProperty({
        description: 'estado del usuario',
        example: 'active',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    userState: 'active' | 'inactive' | 'delete';
    @ApiProperty({
        description: 'fecha de creacion del usuario',
        example: '2021-01-01',
        type: String,
    })
    @IsNotEmpty()
    @IsDateString()
    createdDate: string
    @ApiProperty({
        description: 'fecha de ultimo login del usuario',
        example: '2021-01-01',
        type: String,
    })
    @IsNotEmpty()
    @IsDateString()
    lastLoginDate: string;
}

export class NewUserDto{
    uuid?: string;
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
        type: String
    })
    maternalLastName: string;
    @ApiProperty({
        description: 'apellidos paterno del usuario',
        example: 'Perez',
        type: String
    })
    paternalLastName: string
    @ApiProperty({
        description: 'user state',
        example: 'active',
        type: String
    })
    userState: 'active' | 'inactive' | 'delete';
    @ApiProperty({
        description: 'fecha de creacion del usuario',
        example: '2021-01-01'
    })
    @IsNotEmpty()
    createdDate: string;
    @ApiProperty({
        description: 'fecha de ultimo login del usuario',
        example: '2021-01-01',
        type: String,
    })
    @IsNotEmpty()
    lastLoginDate: string;
    @ApiProperty({
        description: 'id de la direccion del usuario',
        example: '2',
        type: String,
    })
    @IsNotEmpty()
    addressId:number ;
    constructor(){
        const actualTime = new Date();
        const timeZone = actualTime.getTimezoneOffset();
        const timeActual = new Date().setTime(actualTime.getTime() - timeZone * 60 * 1000)
        this.userState = 'active';
        this.createdDate = new Date(timeActual).toISOString().replace('T', ' ').split('.')[0];
        this.lastLoginDate = new Date(timeActual).toISOString().replace('T', ' ').split('.')[0];
    }
}