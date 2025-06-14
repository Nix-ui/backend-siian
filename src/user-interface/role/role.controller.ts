import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/entities/Role.entity';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}
    @Post()
    @ApiResponse({ status: 201, description: 'The role has been successfully created.', type: Role, example:{
        "id":4,
        "name":"admin"
    } })
    @ApiBody({ type: Role })
    async createRole(@Body() role: Role): Promise<Role> {
        return await this.roleService.createRole(role);
    }
    @Get('user/:userId')
    @ApiResponse({ status: 200, description: 'The role has been successfully retrieved.', type: [Role] })
    @ApiResponse({ status: 404, description: 'The role was not found.'})
    async getRolesByUserId(@Body() userId: string): Promise<Role[]> {
        return await this.roleService.getRolesByUserId(userId);
    }
    @Get('email/:email')
    @ApiResponse({ status: 200, description: 'The role has been successfully retrieved.', type: [Role],example:{
        "id":4,
        "name":"admin"
    } })
    async getRolesByEmail(@Body() email: string): Promise<Role[]> {
        return await this.roleService.getRolesByEmail(email);
    }
    @Patch('assign/:userId/:roleId')
    @ApiResponse({ status: 200, description: 'The role has been successfully assigned.', type: Role })
    @ApiBody({ type: Role,examples:{
        student:{
            value:{
                "userId":1,
                "roleId":1
            }
        }
    } })
    async assignRoleToUserById(
        @Body() userId: string,
        @Body() roleId: number
    ): Promise<Role> {
        return await this.roleService.assignRoleToUserById(userId, roleId);
    }
    
}
