import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto, AuthUserDto, AuthUserResponseDto } from './dto/auth-user.dto';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { User } from 'src/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { UserRolesDto } from './dto/user-roles.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService
    ) {}
    async checkPassword(password: string, user: User): Promise<boolean> {
        return await bcrypt.compare(password, user.password);
    }
    async validateUserByUuid(uuid: string): Promise<UserRolesDto | null> {
        const user = await this.userService.getUserByUuid(uuid);
        const responseUser = new UserRolesDto();
        if (user) {
            responseUser.userUuid = user.uuid;
            const roles = await this.roleService.getRolesByEmail(user.email);
            let roleNames;
            if(!roles) {
                roleNames = [];
            }else{
                roleNames = roles.map(role => role.name);
            }
            responseUser.roles = roleNames;
            return responseUser;
        }
        return null;
    }
    async login(loginUser:AuthUserDto): Promise<AuthUserResponseDto> {
        const user = await this.userService.getUserByEmail(loginUser.email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await this.checkPassword(loginUser.password, user);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        let roles = await this.roleService.getRolesByEmail(loginUser.email);
        let roleNames;
        if(!roles) {
            roleNames = [];
        }else{
            roleNames = roles.map(role => role.name);
        }
        const payload: JwtPayloadDto = {
            uuid: user.uuid,
            email: user.email,
            roles: roleNames
        };
        const access_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return { access_token };
    }
}
