import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/entities/Enrollment.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../student/student.service';
import { CourseService } from 'src/admin-interface/course/course.service';
import { DatabaseService } from 'src/database/database.service';
import { RegisterEnrollmentDto } from './dto/register-enrollment.dto';
import { Course } from 'src/entities/Course.entity';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,
        private studentService: StudentService,
        private courseService: CourseService,
        private databaseService: DatabaseService
    ) {}
    async registerEnrollment(registerEnrollmentDto: RegisterEnrollmentDto): Promise<Enrollment> {
        return this.databaseService.executeStoredProcedure('register_enrollment', [
            registerEnrollmentDto.studentUuid,
            registerEnrollmentDto.courseId,
            registerEnrollmentDto.state,
            registerEnrollmentDto.enrollmentDate,
            registerEnrollmentDto.grade
        ]);
    }
    async getEnrollmentsByStudentUuid(studentUuid: string): Promise<Enrollment[]> {
        return this.enrollmentRepository.find({
            where: {
                studentUuid: studentUuid
            }
        });
    }
    async getEnrollmentsByCourseId(courseId: number): Promise<Enrollment[]> {
        return this.enrollmentRepository.find({
            where: {
                courseId: courseId
            }
        });
    }
    async getEnrollmentsByStudentUuidAndAcademicPeriod(studentUuid: string, academicPeriod: number): Promise<Enrollment[]> {
        const course = await this.courseService.getCourseByAcademicPeriodId(academicPeriod) as Course[];
        if(!course) {
            return [];
        }
        let enrollments: Enrollment[] = [];
        for (let i = 0; i < course.length; i++) {
            const enrollment = await this.enrollmentRepository.findOne({
                where: {
                    studentUuid: studentUuid,
                    courseId: course[i].id
                }
            });
            if(enrollment) {
                enrollments.push(enrollment);
            }
        }
        return enrollments;
    }
}
