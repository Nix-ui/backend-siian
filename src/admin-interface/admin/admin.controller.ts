import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AssignRoleByNamesDto } from './dto/asign-role.dto';
import { RegisterUserDto } from 'src/user-interface/user/dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user-interface/user/dto/create-user.dto';
import { JwtAuthGuard } from 'src/user-interface/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user-interface/auth/guards/roles.guard';
import { CurrentUser } from 'src/user-interface/auth/decorators/current-user.decorator';
import { Roles } from 'src/user-interface/auth/decorators/roles.decorator';
import { RegisterCarrerDto } from '../carrer/dto/register-carrer.dto';
import { RegisterDepartmentDto } from '../department/dto/register-department.dto';
import { CreateSubjectDto, RegisterSubjectDto } from '../subject/dto/register-subject.dto';
@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
    constructor(private adminService: AdminService) {}
    @Post('assign-role')
    @Roles('admin')
    async assignRole(@Body() assignRoleByNamesDto: AssignRoleByNamesDto) {
        return await this.adminService.assignRoleByNames(assignRoleByNamesDto);
    }
    @Post('register-user')
    @Roles('admin')
    async registerUser(@Body() createUser: CreateUserDto): Promise<any> {
        return await this.adminService.registerUser(createUser);
    }
    @Post('register-carrer')
    @Roles('admin')
    async registerCarrer(@Body() registerCarrerDto: RegisterCarrerDto): Promise<any> {
        return await this.adminService.registerCarrer(registerCarrerDto);
    }
    @Post('create-department')
    @Roles('admin')
    async registerDepartment(@Body() registerDepartmentDto: RegisterDepartmentDto): Promise<any> {
        return await this.adminService.registerDepartment(registerDepartmentDto);
    }
    @Post('register-subject')
    @Roles('admin')
    async registerSubject(@Body() registerSubjectDto: RegisterSubjectDto): Promise<any> {
        return await this.adminService.registerSubject(registerSubjectDto);
    }
    @Post('create-subject')
    @Roles('admin')
    async createSubject(@Body() createSubjectDto: CreateSubjectDto): Promise<any> {
        return await this.adminService.createSubject(createSubjectDto);
    }
}
