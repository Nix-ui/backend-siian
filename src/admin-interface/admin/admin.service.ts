import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/user-interface/role/role.service';
import { UserService } from 'src/user-interface/user/user.service';
import { CarrerService } from '../carrer/carrer.service';
import { DepartmentService } from '../department/department.service';
import { SubjectService } from '../subject/subject.service';
import { RegisterCarrerDto } from '../carrer/dto/register-carrer.dto';
import { RegisterDepartmentDto } from '../department/dto/register-department.dto';
import { RegisterSubjectDto, CreateSubjectDto } from '../subject/dto/register-subject.dto';
import { AssignRoleByNamesDto } from './dto/asign-role.dto';
import { RegisterUserDto } from 'src/user-interface/user/dto/register-user.dto';
import { CreateUserDto } from 'src/user-interface/user/dto/create-user.dto';

@Injectable()
export class AdminService {
    constructor(private roleService: RoleService,
        private userService: UserService,
        private carrerService: CarrerService,
        private departmentService: DepartmentService,
        private subjectService: SubjectService
    ) {}
    async assignRoleByNames(assignRoleByNamesDto: AssignRoleByNamesDto): Promise<any> {
        const { email, roleName } = assignRoleByNamesDto;
        const role = await this.roleService.asignRoleToUserByEmailAndRoleName(email, roleName);
        return role;
    }
    async registerUser(registerUser:CreateUserDto): Promise<any> {
        const user = await this.userService.createUser(registerUser);
        return user;
    }
    async registerCarrer(registerCarrerDto: RegisterCarrerDto): Promise<any> {
        const carrer = await this.carrerService.registerCarrer(registerCarrerDto);
        return carrer;
    }
    async registerDepartment(registerDepartmentDto: RegisterDepartmentDto): Promise<any> {
        const department = await this.departmentService.createDepartment(registerDepartmentDto);
        return department;
    }
    async registerSubject(registerSubjectDto: RegisterSubjectDto): Promise<any> {
        const subject = await this.subjectService.registerSubject(registerSubjectDto);
        return subject;
    }
    async createSubject(createSubjectDto: CreateSubjectDto): Promise<any> {
        const subject = await this.subjectService.createSubject(createSubjectDto);
        return subject;
    }
}
