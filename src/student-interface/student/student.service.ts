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
        const carrer = await this.carrerService.getCarrerByName(createStudentDto.carrer);
        console.log(carrer);
        if (carrer) {
            await this.userService.createUser(createStudentDto);
            const user = await this.userService.getUserByEmail(createStudentDto.email) as  User;
            this.roleService.asingRoleToUserByUuidAndRoleName(user.uuid, 'student');
            return this.studentRepository.save({
                carrerId: carrer.id,
                userUuid: user.uuid,
            });
        }else{
            throw new Error('Carrera no encontrada');
        }
        
    }
    async registerStudent(registerStudentDto: RegisterStudentDto): Promise<Student | null> {
        const user = await this.userService.getUserByEmail(registerStudentDto.email) as User;
        const carrer = await this.carrerService.getCarrerById(registerStudentDto.carrerId);
        if (!user || !carrer) {
            return null;
        }
        console.log(user);
        this.roleService.asingRoleToUserByUuidAndRoleName(user.uuid, 'student');
        const student = new Student();
        student.carrerId = carrer.id;
        student.userUuid = user.uuid;
        return await this.studentRepository.save(student);
    }
    async saveStudent(student: Student): Promise<Student> {
        console.log(student);
        return await this.studentRepository.save(student);
    }
}
