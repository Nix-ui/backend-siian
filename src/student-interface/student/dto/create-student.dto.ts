import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/user-interface/user/dto/register-user.dto';
import { CreateUserDto } from 'src/user-interface/user/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    carrer: string;
}

export class RegisterStudentDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    carrerId:number ;
}
