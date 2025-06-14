import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/Student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UserService } from 'src/user-interface/user/user.service';
import { RoleService } from 'src/user-interface/role/role.service';
import { CarrerService } from 'src/admin-interface/carrer/carrer.service';
import { User } from 'src/entities/User.entity';
import { Role } from 'src/entities/Role.entity';
import { RegisterStudentDto } from './dto/create-student.dto';


@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly carrerService: CarrerService,
    ) {}
    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        await this.userService.createUser(createStudentDto);
        const user = await this.userService.getUserByEmail(createStudentDto.email) as  User;
        const carrer = await this.carrerService.getCarrerByName(createStudentDto.carrer);
        this.roleService.asingRoleToUserByUuidAndRoleName(user.uuid, 'student');
        const student = new Student();
        if (carrer) {
            student.carrerId = carrer.id;
            student.userUuid = user.uuid;
            user.students.push(student);
            carrer.students.push(student);
            this.userService.saveUser(user);
            this.carrerService.saveCarrer(carrer);
        }
        return await this.studentRepository.save(student);
    }
    async registerStudent(registerStudentDto: RegisterStudentDto): Promise<Student | null> {
        const user = await this.userService.getUserByEmail(registerStudentDto.email) as User;
        const carrer = await this.carrerService.getCarrerById(registerStudentDto.carrerId);
        if (!user || !carrer) {
            return null;
        }
        this.roleService.asingRoleToUserByUuidAndRoleName(user.uuid, 'student');
        const student = new Student();
        student.carrerId = carrer.id;
        student.userUuid = user.uuid;
        user.students.push(student);
        carrer.students.push(student);
        this.userService.saveUser(user);
        this.carrerService.saveCarrer(carrer);
        return await this.studentRepository.save(student);
    }
    async saveStudent(student: Student): Promise<Student> {
        return await this.studentRepository.save(student);
    }
}
