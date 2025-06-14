import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UserRolesDto {
    @ApiProperty({ example: '1', description: 'The ID of the user' })
    @IsNotEmpty()
    @IsString()
    userUuid: string;
    @ApiProperty({ example: '1', description: 'the roles' })
    @IsNotEmpty()
    @IsString()
    roles: string[];
}