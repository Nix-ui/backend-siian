import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/Student.entity';
import { CarrerModule } from 'src/admin-interface/carrer/carrer.module';
import { Carrer } from 'src/entities/Carrer.entity';
import { UserModule } from 'src/user-interface/user/user.module';
import { RoleModule } from 'src/user-interface/role/role.module';
import { SubjectModule } from 'src/admin-interface/subject/subject.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Carrer]),
    CarrerModule,UserModule, RoleModule, SubjectModule
  ],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
