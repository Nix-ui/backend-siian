import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/User.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }
    @Post()
    async registerUser(@Body() user: CreateUserDto): Promise<User> {
        console.log(user);
        return await this.userService.createUser(user);
    }
}
