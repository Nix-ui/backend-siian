import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/Teacher.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/entities/Course.entity';
import { Subject } from 'src/entities/Subject.entity';
import { UserService } from 'src/user-interface/user/user.service';
import { CreateTeacherDto, CreateTeacherWithSubjectsDto, RegisterTeacherDto, RegisterTeacherWithSubjectsDto } from './dto/register-teacher.dto';
import { DatabaseService } from 'src/database/database.service';
import { SubjectService } from 'src/admin-interface/subject/subject.service';
import { RoleService } from 'src/user-interface/role/role.service';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        private userService: UserService,
        private databaseService: DatabaseService,
        private subjectService: SubjectService,
        private roleService: RoleService
    ) { }
    async getTeacherByUuid(uuid: string) {
        return this.teacherRepository.findOne({
            where: {
                userUuid: uuid
            }
        });
    }
    async registerTeacher(registerTeacher: CreateTeacherDto) {
        const user = await this.userService.createUser(registerTeacher);
        const foundUser = await this.userService.getUserByEmail(registerTeacher.email);
        if (!foundUser) {
            throw new Error('User not found');
        }
        this.databaseService.executeStoredProcedure('insertTeacher',
            [
                foundUser.uuid,
                registerTeacher.hireDate
            ]
        )
        this.roleService.asignRoleToUserByEmailAndRoleName(user.email, 'teacher');
        return this.getTeacherByUuid(user.uuid);
    }
    async registerTeacherWithSubjects(registerTeacher: CreateTeacherWithSubjectsDto) {
        const user = await this.userService.createUser(registerTeacher);
        const foundUser = await this.userService.getUserByEmail(registerTeacher.email);
        if (!foundUser) {
            throw new Error('User not found');
        }
        this.databaseService.executeStoredProcedure('insertTeacher',
            [
                foundUser.uuid,
                registerTeacher.hireDate
            ]
        )
        const teacher = await this.getTeacherByUuid(user.uuid);
        this.roleService.asignRoleToUserByEmailAndRoleName(user.email, 'teacher');
        registerTeacher.subjects.forEach((subjectCode) => {
            this.databaseService.executeStoredProcedure('assingSubjectToTeacherUuid',
                [
                    foundUser.uuid,
                    subjectCode
                ]);
        });
        return this.getTeacherByUuid(user.uuid);
    }
}
