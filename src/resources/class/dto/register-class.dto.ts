import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterClassDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    courseId: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    classDate: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startTime: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    endTime: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    classroom: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string | 'virtual' | 'presencial' | 'semipresencial';
}