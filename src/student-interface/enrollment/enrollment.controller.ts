import { Controller, UseGuards, Get,Post,Param,Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user-interface/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/user-interface/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user-interface/auth/guards/roles.guard';
import { RegisterEnrollmentDto } from './dto/register-enrollment.dto';

@ApiTags('enrollment')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('enrollment')
export class EnrollmentController {
    constructor(private enrollmentService: EnrollmentService) {}
    @Get('/student/:studentUuid')
    @Roles('student')
    async getEnrollmentsByStudentUuid(@Param('studentUuid') studentUuid: string) {
        return this.enrollmentService.getEnrollmentsByStudentUuid(studentUuid);
    }
    @Get('course/:course')
    @Roles('student')
    async getEnrollmentsByCourseId(@Param('course') course: number) {
        return this.enrollmentService.getEnrollmentsByCourseId(course);
    }
    @Get('/student/:studentUuid/academic-period/:academicPeriod')
    @Roles('student')
    async getEnrollmentsByStudentUuidAndAcademicPeriod(@Param('studentUuid') studentUuid: string, @Param('academicPeriod') academicPeriod: number){
        return this.enrollmentService.getEnrollmentsByStudentUuidAndAcademicPeriod(studentUuid, academicPeriod);
    }
    @Post('')
    @Roles('student')
    async registerEnrollment(@Body() registerEnrollmentDto: RegisterEnrollmentDto) {
        return this.enrollmentService.registerEnrollment(registerEnrollmentDto);
    }
    
}
