import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto, AuthUserResponseDto } from './dto/auth-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginUser: AuthUserDto): Promise<AuthUserResponseDto> {
        return await this.authService.login(loginUser);
    }
}
