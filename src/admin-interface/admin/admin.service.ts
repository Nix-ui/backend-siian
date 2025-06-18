import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/user-interface/role/role.service';
import { UserService } from 'src/user-interface/user/user.service';
import { CarrerService } from '../carrer/carrer.service';
import { DepartmentService } from '../department/department.service';
import { SubjectService } from '../subject/subject.service';
import { RegisterCarrerDto, RegisterFullCarrerDto } from '../carrer/dto/register-carrer.dto';
import { RegisterDepartmentDto } from '../department/dto/register-department.dto';
import { RegisterSubjectDto, CreateSubjectDto } from '../subject/dto/register-subject.dto';
import { AssignRoleByNamesDto } from './dto/asign-role.dto';
import { RegisterUserDto } from 'src/user-interface/user/dto/register-user.dto';
import { CreateUserDto } from 'src/user-interface/user/dto/create-user.dto';
import { RegisterAcademicPeriodDto } from 'src/admin-interface/academic-period/dto/register-academic-period';
import { RegisterCourseDto } from '../course/dto/register-course.dto';
import { RegisterTeacherDto, RegisterTeacherWithSubjectsDto } from 'src/teacher-interface/teacher/dto/register-teacher.dto';
import { AcademicPeriodService } from '../academic-period/academic-period.service';
import { CourseService } from '../course/course.service';
import { TeacherService } from 'src/teacher-interface/teacher/teacher.service';
import { StudentService } from 'src/student-interface/student/student.service';
import { CreateStudentDto, RegisterStudentDto } from 'src/student-interface/student/dto/create-student.dto';


@Injectable()
export class AdminService {
    constructor(private roleService: RoleService,
        private userService: UserService,
        private carrerService: CarrerService,
        private departmentService: DepartmentService,
        private subjectService: SubjectService,
        private academicPeriodService: AcademicPeriodService,
        private courseService: CourseService,
        private teacherService: TeacherService,
        private studentService: StudentService,
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
    async createCarrer(registerCarrerDto: RegisterFullCarrerDto): Promise<any> {
        const carrer = await this.carrerService.createCarrer(registerCarrerDto);
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
    async registerAcademicPeriod(registerAcademicPeriodDto: RegisterAcademicPeriodDto): Promise<any> {
        const academicPeriod = await this.academicPeriodService.registerAcademicPeriod(registerAcademicPeriodDto);
        return academicPeriod;
    }
    async registerCourse(registerCourseDto: RegisterCourseDto): Promise<any> {
        const course = await this.courseService.registerCourse(registerCourseDto);
        return course;
    }
    async registerTeacher(registerTeacherDto: RegisterTeacherDto): Promise<any> {
        const teacher = await this.teacherService.registerTeacher(registerTeacherDto);
        return teacher;
    }
    async registerTeacherWithSubjects(registerTeacherWithSubjectsDto: RegisterTeacherWithSubjectsDto): Promise<any> {
        const teacher = await this.teacherService.registerTeacherWithSubjects(registerTeacherWithSubjectsDto);
        return teacher;
    }
    async registerStudent(registerStudentDto: RegisterStudentDto): Promise<any> {
        const student = await this.studentService.registerStudent(registerStudentDto);
        return student;
    }
    async createStudent(createStudentDto: CreateStudentDto): Promise<any> {
        const student = await this.studentService.createStudent(createStudentDto);
        return student;
    }
    async getCarrers(): Promise<any> {
        const carrers = await this.carrerService.getAllCarrers();
        return carrers;
    }
    async getCarrersByDepartmentId(departmentId: number): Promise<any> {
        const carrers = await this.carrerService.getCarrerByDepartmentId(departmentId);
        return carrers;
    }
    async getCarrersByDepartment(departmentName: string): Promise<any> {
        const carrers = await this.carrerService.getCarrerByDepartment(departmentName);
        return carrers;
    }
    async getDepartments(): Promise<any> {
        const departments = await this.departmentService.getDepartments();
        return departments;
    }
    async getSubjects(): Promise<any> {
        const subjects = await this.subjectService.getAllSubjects();
        return subjects;
    }
    async getSubjectsByCarrer(carrerName: string): Promise<any> {
        const subjects = await this.subjectService.getSubjectByCarrer(carrerName);
        return subjects;
    }
    async getSubjectsByCarrerId(carrerId: number): Promise<any> {
        const subjects = await this.subjectService.getSubjectByCarrerId(carrerId);
        return subjects;
    }
    async getAcademicPeriods(): Promise<any> {
        const academicPeriods = await this.academicPeriodService.getAllAcademicPeriods();
        return academicPeriods;
    }
}
