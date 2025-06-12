import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSubjectDto {
    @ApiProperty({
        description: 'nombre del materia',
        example: 'Matemáticas',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        description: 'Codigo de la materia',
        example: 'MAT-101',
        type: String})
    @IsNotEmpty()
    @IsString()
    code: string;
}
export class RegisterSubjectDto {
    @ApiProperty({
        description: 'nombre del materia',
        example: 'Matemáticas',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        description: 'Codigo de la materia',
        example: 'MAT-101',
        type: String})
    @IsNotEmpty()
    @IsString()
    code: string;
    @ApiProperty({
        description: 'nombre de la carrera',
        example: 'Ingeniería de Sistemas',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    carrer: string;
}