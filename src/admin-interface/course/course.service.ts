import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities/Course.entity';
import { Repository } from 'typeorm';
import { AcademicPeriodService } from '../academic-period/academic-period.service';
import { TeacherService } from 'src/teacher-interface/teacher/teacher.service';
import { SubjectService } from 'src/admin-interface/subject/subject.service';
import { RegisterCourseDto } from './dto/register-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { Subject } from 'src/entities/Subject.entity';
import { Teacher } from 'src/entities/Teacher.entity';


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        private academicPeriodService: AcademicPeriodService,
        private teacherService: TeacherService,
        private subjectService: SubjectService,
        private databaseService: DatabaseService,
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>
    ) { }
    async getCoursesByTeacher(uuid: string): Promise<Course[]> {
        return this.courseRepository.find({
            where: {
                teacherUuid: uuid
            }
        });
    }
    async registerCourse(registerCourse: RegisterCourseDto): Promise<Course> {
        let course = new Course();
        course.subjectCode = registerCourse.subjectCode;
        course.academicPeriod = registerCourse.academicPeriod;
        course.teacherUuid = registerCourse.teacherUuid;
        course.paralelNumber = registerCourse.paralelNumber;
        course.capacity = registerCourse.capacity;
        const teacher = await this.teacherService.getTeacherByUuid(registerCourse.teacherUuid);
        const subject = await this.subjectService.getSubjectByCode(registerCourse.subjectCode);
        teacher?.courses.push(course);
        subject?.courses.push(course);
        if(teacher && subject) {
            await this.teacherRepository.save(teacher);
            await this.subjectRepository.save(subject);
        }
        return this.courseRepository.save(course);
    }
    async saveCourse(course: Course): Promise<Course> {
        return this.courseRepository.save(course);
    }
    async getCourseByAcademicPeriodId(academicPeriodId: number): Promise<Course[]> {
        return this.courseRepository.find({
            where: {
                academicPeriod: academicPeriodId
            }
        });
    }
    async getCourseByAcademicPeriodIdAndTeacherUuid(academicPeriodId: number, teacherUuid: string): Promise<Course[]> {
        return this.courseRepository.find({
            where: {
                academicPeriod: academicPeriodId,
                teacherUuid: teacherUuid
            }
        });
    }
}
