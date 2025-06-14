import { Controller, Get, Body, Post, UseGuards, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AssignRoleByNamesDto } from './dto/asign-role.dto';
import { RegisterUserDto } from 'src/user-interface/user/dto/register-user.dto';
import { ApiTags,ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user-interface/user/dto/create-user.dto';
import { JwtAuthGuard } from 'src/user-interface/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user-interface/auth/guards/roles.guard';
import { CurrentUser } from 'src/user-interface/auth/decorators/current-user.decorator';
import { Roles } from 'src/user-interface/auth/decorators/roles.decorator';
import { RegisterCarrerDto } from '../carrer/dto/register-carrer.dto';
import { RegisterDepartmentDto } from '../department/dto/register-department.dto';
import { CreateSubjectDto, RegisterSubjectDto } from '../subject/dto/register-subject.dto';
import { RegisterAcademicPeriodDto } from 'src/admin-interface/academic-period/dto/register-academic-period';
import { RegisterCourseDto } from '../course/dto/register-course.dto';
import { RegisterTeacherDto, RegisterTeacherWithSubjectsDto } from 'src/teacher-interface/teacher/dto/register-teacher.dto';
import { CreateStudentDto, RegisterStudentDto } from 'src/student-interface/student/dto/create-student.dto';




@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
    constructor(private adminService: AdminService) {}
    @Post('assign-role')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Role assigned successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async assignRole(@Body() assignRoleByNamesDto: AssignRoleByNamesDto) {
        return await this.adminService.assignRoleByNames(assignRoleByNamesDto);
    }
    @Post('register-user')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerUser(@Body() createUser: CreateUserDto): Promise<any> {
        return await this.adminService.registerUser(createUser);
    }
    @Post('register-carrer')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Carrer registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerCarrer(@Body() registerCarrerDto: RegisterCarrerDto): Promise<any> {
        return await this.adminService.registerCarrer(registerCarrerDto);
    }
    @Post('create-department')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Department registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerDepartment(@Body() registerDepartmentDto: RegisterDepartmentDto): Promise<any> {
        return await this.adminService.registerDepartment(registerDepartmentDto);
    }
    @Post('register-subject')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Subject registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerSubject(@Body() registerSubjectDto: RegisterSubjectDto): Promise<any> {
        return await this.adminService.registerSubject(registerSubjectDto);
    }
    @Post('create-subject')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Subject created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async createSubject(@Body() createSubjectDto: CreateSubjectDto): Promise<any> {
        return await this.adminService.createSubject(createSubjectDto);
    }
    
    @Post('register-academic-period')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Academic period registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerAcademicPeriod(@Body() registerAcademicPeriodDto: RegisterAcademicPeriodDto): Promise<any> {
        return await this.adminService.registerAcademicPeriod(registerAcademicPeriodDto);
    }
    @Post('register-course')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Course registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerCourse(@Body() registerCourseDto: RegisterCourseDto): Promise<any> {
        return await this.adminService.registerCourse(registerCourseDto);
    }
    @Post('register-teacher')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Teacher registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerTeacher(@Body() registerTeacherDto: RegisterTeacherDto): Promise<any> {
        return await this.adminService.registerTeacher(registerTeacherDto);
    }
    @Post('register-teacher-with-subjects')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Teacher registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerTeacherWithSubjects(@Body() registerTeacherWithSubjectsDto: RegisterTeacherWithSubjectsDto): Promise<any> {
        return await this.adminService.registerTeacherWithSubjects(registerTeacherWithSubjectsDto);
    }
    @Post('register-student')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Student registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async registerStudent(@Body() registerStudentDto: RegisterStudentDto): Promise<any> {
        return await this.adminService.registerStudent(registerStudentDto);
    }
    @Post('create-student')
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'Student created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<any> {
        return await this.adminService.createStudent(createStudentDto);
    }

}
