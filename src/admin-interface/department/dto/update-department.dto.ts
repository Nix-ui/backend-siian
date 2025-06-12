import { IsOptional, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class UpdateDepartmentDto {
    @ApiPropertyOptional({
        description: 'nombre del departamento',
        example: 'Departamento de Ingeniería',
        type: String,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;
    @ApiPropertyOptional({
        description: 'descripcion del departamento',
        example: 'Departamento de Ingeniería, Facultad de Ingeniería, Universidad Nacional de Ingeniería',
        type: String,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string
}

export class UpdateDepartmentDtoWithId extends UpdateDepartmentDto {
    @ApiProperty({
        description: 'id del departamento',
        example: '1',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}