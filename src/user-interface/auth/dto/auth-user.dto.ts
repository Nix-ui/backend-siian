import { IsEmail, IsNotEmpty, IsString,IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthUserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class JwtPayloadDto {
    @ApiProperty({
        description: 'The user uuid',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty()
    @IsString()
    uuid: string;
    @ApiProperty({ example: '1234567890' })
    @IsString()
    @IsNotEmpty()
    email: string;
    @ApiProperty({
        description: 'The user roles',
        example:'["admin", "user"]'
    })
    @IsNotEmpty()
    @IsString()
    roles: string[];
}

export class AuthUserResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
    access_token: string;
}
