import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterNotesDto {
    @ApiProperty({
        description: 'The student enrollment id',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    studentEnrollmentId: number;
    @ApiProperty({
        description: 'The grade',
        example: 10
    })
    @IsNotEmpty()
    @IsNumber()
    grade: number;
    @ApiProperty({
        description: 'The calification date',
        example: '2023-01-01'
    })
    @IsNotEmpty()
    @IsString()
    calificationDate: string;
}