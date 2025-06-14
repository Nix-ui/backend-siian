import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto, AuthUserResponseDto } from './dto/auth-user.dto';
import { ApiTags, ApiBearerAuth,ApiResponse,ApiBasicAuth,ApiBody } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    @ApiResponse({ status: 200, description: 'Login successful',type: AuthUserResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBasicAuth('basic')
    @ApiBody({
        type: AuthUserDto,
        description: 'User credentials',
        examples: {
            user: {
                value: {
                    email: 'user@example.com',
                    password: 'password',
                },
            },
        }
    })
    async login(@Body() loginUser: AuthUserDto): Promise<AuthUserResponseDto> {
        return await this.authService.login(loginUser);
    }
}
