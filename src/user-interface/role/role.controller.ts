import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/entities/Role.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}
    @Post()
    async createRole(@Body() role: Role): Promise<Role> {
        return await this.roleService.createRole(role);
    }
    @Get('user/:userId')
    async getRolesByUserId(@Body() userId: string): Promise<Role[]> {
        return await this.roleService.getRolesByUserId(userId);
    }
    @Get('email/:email')
    async getRolesByEmail(@Body() email: string): Promise<Role[]> {
        return await this.roleService.getRolesByEmail(email);
    }
    @Patch('assign/:userId/:roleId')
    async assignRoleToUserById(
        @Body() userId: string,
        @Body() roleId: number
    ): Promise<Role> {
        return await this.roleService.assignRoleToUserById(userId, roleId);
    }
    
}
