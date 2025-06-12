import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCarrerDto {
    @ApiProperty({
        description: 'nombre del carrera',
        example: 'Ingeniería de Sistemas',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        description: 'descripcion del carrera',
        example: 'Carrera de Ingeniería de Sistemas, Facultad de Ingeniería, Universidad Nacional de Ingeniería',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Numero de semestres del carrera',
        example: '8',
        type: Number,
    })
    totalSemester: number;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Estado del carrera',
        example: 'active',
        type: String,
    })
    state: string | 'active' | 'inactive'|'close';
    @ApiProperty({
        description: 'fecha de creacion del carrera',
        example: '2021-01-01',
        type: Number,
    })
    @IsOptional()
    @IsString()
    creationSDate?: string;
    @ApiProperty({
        description: 'Departamento del carrera',
        example: 'Facultad de Ingeniería',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    department: string;
}

export class RegisterFullCarrerDto{
    @ApiProperty({
        description: 'nombre del carrera',
        example: 'Ingeniería de Sistemas',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        description: 'descripcion del carrera',
        example: 'Carrera de Ingeniería de Sistemas, Facultad de Ingeniería, Universidad Nacional de Ingeniería',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    description: string;
    @ApiProperty({
        description: 'Numero de semestres del carrera',
        example: '8',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    totalSemester: number;
    @ApiProperty({
        description: 'Estado del carrera',
        example: 'active',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    state: string | 'active' | 'inactive'|'close';
    @ApiProperty({
        description: 'Id del departamento',
        example: '1',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    departmentId: number;
    @ApiProperty({
        description: 'fecha de creacion del carrera',
        example: '2021-01-01',
        type: Number,
    })
    @IsNotEmpty()
    @IsString()
    creationDate: string;
}