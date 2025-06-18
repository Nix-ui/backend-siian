import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user-interface/user/user.module';
import { AuthModule } from './user-interface/auth/auth.module';
import { RoleModule } from './user-interface/role/role.module';
import { DatabaseModule } from './database/database.module';
import { AddressModule } from './user-interface/address/address.module';
import config from './config/configuration';
import { StoredProcedureModule } from './database/storedprocedure/storedprocedure.module';
import { AdminModule } from './admin-interface/admin/admin.module';
import { DepartmentModule } from './admin-interface/department/department.module';
import { CarrerModule } from './admin-interface/carrer/carrer.module';
import { SubjectModule } from './admin-interface/subject/subject.module';
import { StudentModule } from './student-interface/student/student.module';
import { EnrollmentModule } from './student-interface/enrollment/enrollment.module';
import { CourseModule } from './admin-interface/course/course.module';
import { TeacherModule } from './teacher-interface/teacher/teacher.module';
import { AcademicPeriodModule } from './admin-interface/academic-period/academic-period.module';
import { ClassModule } from './resources/class/class.module';
import { NotesModule } from './resources/notes/notes.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV !== 'production' ? 'development.env' : undefined,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
        type: config().database.type,
        host: config().database.host,
        port: config().database.port,
        username: config().database.username,
        password: config().database.password,
        database: config().database.database,
        entities: [ __dirname + '/**/*.entity{.ts,.js}' ]
        }
      }
    }),UserModule, AuthModule, RoleModule, AddressModule,StoredProcedureModule, AdminModule, DepartmentModule, CarrerModule, SubjectModule, StudentModule, EnrollmentModule, CourseModule, TeacherModule, AcademicPeriodModule, ClassModule, NotesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
