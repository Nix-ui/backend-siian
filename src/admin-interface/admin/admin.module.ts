import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { RoleModule } from 'src/user-interface/role/role.module';
import { UserModule } from 'src/user-interface/user/user.module';
import { CarrerModule } from '../carrer/carrer.module';
import { DepartmentModule } from '../department/department.module';
import { SubjectModule } from '../subject/subject.module';
import { AcademicPeriodModule } from '../academic-period/academic-period.module';
import { CourseModule } from '../course/course.module';
import { TeacherModule } from 'src/teacher-interface/teacher/teacher.module';
import { StudentModule } from 'src/student-interface/student/student.module';
import { AuthModule } from 'src/user-interface/auth/auth.module';

@Module({
  imports: [RoleModule, UserModule, CarrerModule, DepartmentModule, SubjectModule
    ,AcademicPeriodModule,CourseModule,TeacherModule,StudentModule,AuthModule
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
