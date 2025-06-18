import { Controller, Get,Post, Param,Body, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user-interface/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/user-interface/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user-interface/auth/guards/roles.guard';
import { RegisterNotesDto } from './dto/register-notes.dto';

@ApiTags('notes')
@Controller('notes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotesController {
    constructor(private notesService: NotesService) {}
    @Post('')
    @Roles('teacher')
    async registerNotes(@Body() registerNotesDto: RegisterNotesDto) {
        return this.notesService.registerNotes(registerNotesDto);
    }
    @Get('/student/:studentEnrollmentId')
    @Roles('teacher','student')
    async getNotesByStudentEnrollmentId(@Param('studentEnrollmentId') studentEnrollmentId: number) {
        return this.notesService.getNotesByStudentEnrollmentId(studentEnrollmentId);
    }
    @Get('/student/:studentUuid/academic-period/:academicPeriod')
    @Roles('student','teacher')
    async getNotesByStudentAndAcademicPeriod(@Param('studentUuid') studentUuid: string, @Param('academicPeriod') academicPeriod: number) {
        return this.notesService.getNotesByStudentAndAcademicPeriod(studentUuid, academicPeriod);
    }

}
