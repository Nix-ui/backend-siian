import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber} from 'class-validator';
import { CreateUserDto } from 'src/user-interface/user/dto/create-user.dto';
import { RegisterUserDto } from 'src/user-interface/user/dto/register-user.dto';

export class CreateTeacherDto extends CreateUserDto{
    @ApiProperty(
        {
            description: 'Fecha de contratacion',
            example: '2023-01-01',
            required: true,
            type: String,
        }
    )
    @IsNotEmpty()
    @IsString()
    hireDate: string;
}
export class CreateTeacherWithSubjectsDto extends CreateTeacherDto{
    @ApiProperty(
        {
            description: 'Codigo de materias',
            example: ['MAT-001', 'MAT-002'],
            required: true,
            type: String,
        }
    )
    @IsNotEmpty()
    @IsString()
    subjects: string[];
}

export class RegisterTeacherDto extends RegisterUserDto {
    @ApiProperty(
        {
            description: 'Fecha de contratacion',
            example: '2023-01-01',
            required: true,
            type: String,
        }
    )
    @IsNotEmpty()
    @IsString()
    hireDate: string;
}

export class RegisterTeacherWithSubjectsDto extends RegisterTeacherDto{
    @ApiProperty(
        {
            description: 'Codigo de materias',
            example: ['MAT-001', 'MAT-002'],
            required: true,
            type: String,
        }
    )
    @IsNotEmpty()
    @IsString()
    subjectCodes: string[];
}