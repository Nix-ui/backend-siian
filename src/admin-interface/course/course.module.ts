import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/Course.entity';
import { AcademicPeriodModule } from '../academic-period/academic-period.module';
import { TeacherModule } from 'src/teacher-interface/teacher/teacher.module';
import { Subject } from 'src/entities/Subject.entity';
import { SubjectModule } from '../subject/subject.module';
import { DatabaseModule } from 'src/database/database.module';
import { Teacher } from 'src/entities/Teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Subject, Teacher]),
    AcademicPeriodModule,
    TeacherModule, SubjectModule, DatabaseModule
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
