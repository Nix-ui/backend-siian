import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/Teacher.entity';
import { DatabaseModule } from 'src/database/database.module';
import { SubjectModule } from 'src/admin-interface/subject/subject.module';
import { CarrerModule } from 'src/admin-interface/carrer/carrer.module';
import { AcademicPeriodModule } from 'src/admin-interface/academic-period/academic-period.module';
import { UserModule } from 'src/user-interface/user/user.module';
import { RoleModule } from 'src/user-interface/role/role.module';
import { Course } from 'src/entities/Course.entity';
import { Subject } from 'src/entities/Subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher,Course,Subject]),
    DatabaseModule,
    SubjectModule,
    CarrerModule,
    AcademicPeriodModule,
    UserModule,RoleModule
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService]
})
export class TeacherModule {}
