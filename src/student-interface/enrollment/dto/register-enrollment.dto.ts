import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterEnrollmentDto {
    @ApiProperty({
        description: 'The uuid of the student',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsString()
    studentUuid: string;
    @ApiProperty({
        description: 'The id of the course',
        example: '3',
    })
    @IsNotEmpty()
    @IsString()
    courseId: string;
    @ApiProperty({
        description: 'The state of the enrollment',
        example: 'inscrito',
    })
    @IsNotEmpty()
    @IsString()
    state: string | "inscrito" | "abandono" | "aprobado" | "reprobado";
    @ApiProperty({
        description: 'The date of the enrollment',
        example: '2021-01-01',
    })
    @IsNotEmpty()
    @IsString()
    enrollmentDate: string;
    @ApiProperty({
        description: 'The grade of the enrollment',
        example: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    grade: number;
}
