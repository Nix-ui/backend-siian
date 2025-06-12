import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { RoleModule } from 'src/user-interface/role/role.module';
import { UserModule } from 'src/user-interface/user/user.module';
import { CarrerModule } from '../carrer/carrer.module';
import { DepartmentModule } from '../department/department.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [RoleModule, UserModule, CarrerModule, DepartmentModule, SubjectModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
