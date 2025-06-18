import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/entities/Class.entity';
import { Repository } from 'typeorm';
import { RegisterClassDto } from './dto/register-class.dto';
import { CourseService } from 'src/admin-interface/course/course.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepository: Repository<Class>,
        private courseService: CourseService,
        private databaseService: DatabaseService
    ) {}
    async registerClass(registerClassDto: RegisterClassDto): Promise<Class> {
        return this.databaseService.executeStoredProcedure('register_class', [
            registerClassDto.courseId,
            registerClassDto.classDate,
            registerClassDto.startTime,
            registerClassDto.endTime,
            registerClassDto.classroom,
            registerClassDto.type
        ]);
    }
    async getClassByCourseId(courseId: number): Promise<Class[]> {
        return this.classRepository.find({
            where: {
                courseId: courseId
            }
        });
    }
    async getClassByCourseIdAndClassDate(courseId: number, classDate: string): Promise<Class[]> {
        return this.databaseService.executeStoredProcedure('get_class_by_course_id_and_class_date', [courseId, classDate]) as Promise<Class[]>;
    }
    async getClassByStudentUuidAndAcademicPeriod(studentUuid: string,academicPeriod:number): Promise<Class[]> {
        const classes = await this.databaseService.executeStoredProcedure('get_class_by_student_uuid', [studentUuid,academicPeriod]) ;
        return classes;
    }
}
