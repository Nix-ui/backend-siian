import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class RegisterAcademicPeriodDto {
    @ApiProperty({
        description: 'Nombre del periodo académico',
        example: '2023-1',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        description: 'Fecha de inicio del periodo académico',
        example: '2023-01-01',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    startDate: string;
    @ApiProperty({
        description: 'Fecha de finalización del periodo académico',
        example: '2023-06-15',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    endDate: string;
}