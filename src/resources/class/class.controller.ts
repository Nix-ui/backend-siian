import { Controller,Get,Post,Param,Body, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user-interface/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/user-interface/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user-interface/auth/guards/roles.guard';
import { RegisterClassDto } from './dto/register-class.dto';

@ApiTags('class')
@Controller('class')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassController {
    constructor(private classService: ClassService) {}
    @Post('')
    @Roles('teacher')
    async registerClass(@Body() registerClassDto: RegisterClassDto) {
        return this.classService.registerClass(registerClassDto);
    }
    @Get('/course/:course')
    @Roles('teacher','student')
    async getClassByCourseId(@Param('course') course: number){
        return this.classService.getClassByCourseId(course);
    }
    @Get('/student/:studentUuid/academic-period/:academicPeriod')
    @Roles('teacher','student')
    async getClassByAcademicPeriodId(@Param('academicPeriod') academicPeriod: number,@Param('studentUuid') studentUuid: string){
        return this.classService.getClassByStudentUuidAndAcademicPeriod(studentUuid,academicPeriod);
    }
    @Get('/course/:id/date/:classDate')
    @Roles('student')
    async getClassByStudentId(@Param('id') id: number, @Param('classDate') classDate: string){
        return this.classService.getClassByCourseIdAndClassDate(id,classDate);
    }
}
