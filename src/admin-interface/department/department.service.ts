import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department.entity';
import { Repository } from 'typeorm';
import { RegisterDepartmentDto } from './dto/register-department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
    ) {}
    async createDepartment(department: RegisterDepartmentDto): Promise<Department> {
        return await this.departmentRepository.save(department);
    }
    async getDepartments(): Promise<Department[]> {
        return await this.departmentRepository.find();
    }
    async getDepartmentById(id: number): Promise<Department | null> {
        return await this.departmentRepository.findOne({
            where: {
                id,
            },
        });
    }
    async getDepartmentByName(name: string): Promise<Department | null> {
        return await this.departmentRepository.findOne({
            where: {
                name,
            },
        });
    }
}
