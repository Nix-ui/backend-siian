import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDepartmentDto {
    @ApiProperty({
        description: 'nombre del departamento',
        example: 'Departamento de Ingeniería',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        description: 'descripcion del departamento',
        example: 'Departamento de Ingeniería, Facultad de Ingeniería, Universidad Nacional de Ingeniería',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    description: string
}