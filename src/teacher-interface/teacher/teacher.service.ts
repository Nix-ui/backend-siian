import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/Teacher.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/entities/Course.entity';
import { Subject } from 'src/entities/Subject.entity';
import { UserService } from 'src/user-interface/user/user.service';
import { RegisterTeacherDto, RegisterTeacherWithSubjectsDto } from './dto/register-teacher.dto';
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
    async registerTeacher(registerTeacher: RegisterTeacherDto) {
        const user = await this.userService.createUser(registerTeacher);
        this.databaseService.executeStoredProcedure('insertTeacher',
            [
                user.uuid,
                registerTeacher.hireDate
            ]
        )
        this.roleService.asingRoleToUserByUuidAndRoleName(user.uuid, 'teacher');
        return this.getTeacherByUuid(user.uuid);
    }
    async registerTeacherWithSubjects(registerTeacher: RegisterTeacherWithSubjectsDto) {
        const user = await this.userService.createUser(registerTeacher);
        this.databaseService.executeStoredProcedure('insertTeacher',
            [
                user.uuid,
                registerTeacher.hireDate
            ]
        )
        const teacher = await this.getTeacherByUuid(user.uuid);
        this.roleService.asingRoleToUserByUuidAndRoleName(user.uuid, 'teacher');
        const subjects = registerTeacher.subjectCodes.map(async (subjectCode) => {
            const subject = await this.subjectService.getSubjectByCode(subjectCode);
            if (subject && teacher) {
                teacher.subjects.push(subject);
            }
        });
        if (teacher) {
            await this.teacherRepository.save(teacher);
        }
        return this.getTeacherByUuid(user.uuid);
    }
}
