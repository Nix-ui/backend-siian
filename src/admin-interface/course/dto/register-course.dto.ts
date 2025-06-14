import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber} from 'class-validator';
export class RegisterCourseDto {
    @ApiProperty({
        description: 'Codigo de materia',
        example: 'MAT-001',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    subjectCode: string;
    @ApiProperty({
        description: 'Codigo de profesor',
        example: 'IASDFSDF-SDGS-XCVHER-GEWDF',
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    teacherUuid: string;
    @ApiProperty({
        description: 'Numero de paralelo',
        example: 1,
        required: true,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    paralelNumber: number;
    @ApiProperty({
        description: 'Id del periodo academico',
        example: 1,
        required: true,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    academicPeriod: number;
    @ApiProperty({
        description: 'Capacidad del curso',
        example: 30,
        required: true,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    capacity: number;
}


