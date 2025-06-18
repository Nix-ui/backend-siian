import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from 'src/entities/Notes.entity';
import { Repository } from 'typeorm';
import { DatabaseService } from 'src/database/database.service';
import { RegisterNotesDto } from './dto/register-notes.dto';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Notes)
        private notesRepository: Repository<Notes>,
        private databaseService: DatabaseService
    ) {}
    async registerNotes(registerNotesDto: RegisterNotesDto): Promise<Notes> {
        return this.databaseService.executeStoredProcedure('register_notes', [
            registerNotesDto.studentEnrollmentId,
            registerNotesDto.grade,
            registerNotesDto.calificationDate
        ]);
    }
    async getNotesByStudentEnrollmentId(studentEnrollmentId: number): Promise<Notes[]> {
        return this.notesRepository.find({
            where: {
                studentEnrollmentId: studentEnrollmentId
            }
        });
    }
    async getNotesByStudentAndAcademicPeriod(studentUuid: string, academicPeriod: number): Promise<Notes[]> {
        return this.databaseService.executeStoredProcedure('get_notes_by_student_and_academic_period', [studentUuid, academicPeriod]) as Promise<Notes[]>;
    }
}
