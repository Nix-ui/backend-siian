import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/entities/Enrollment.entity';
import { StudentModule } from '../student/student.module';
import { CourseModule } from 'src/admin-interface/course/course.module';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment]),
    StudentModule,
    CourseModule,
    DatabaseModule
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService]
})
export class EnrollmentModule {}
