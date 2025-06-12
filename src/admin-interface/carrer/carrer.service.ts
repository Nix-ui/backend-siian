import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrer } from 'src/entities/Carrer.entity';
import { Repository } from 'typeorm';
import { RegisterCarrerDto,RegisterFullCarrerDto } from './dto/register-carrer.dto';
import { DepartmentService } from '../department/department.service';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class CarrerService {
    constructor(
        @InjectRepository(Carrer)
        private carrerRepository: Repository<Carrer>,
        private departmentService: DepartmentService,
        private databaseService: DatabaseService,
    ) {}
    async registerCarrer(carrer: RegisterCarrerDto): Promise<RegisterFullCarrerDto> {
        const department = await this.departmentService.getDepartmentByName(carrer.department);
        if (!department) {
            throw new Error('Department not found');
        }
        const timezone = new Date().getTimezoneOffset();
        const actualTime = new Date(new Date().getTime() - timezone * 60000);
        const newCarrer: RegisterFullCarrerDto = {
            name: carrer.name,
            description: carrer.description,
            departmentId: department.id,
            state: carrer.state as any, // Cast to any or to the correct enum if available
            totalSemester: carrer.totalSemester,
            creationDate: new Date(actualTime).toISOString().replace('T', ' ').split('.')[0]
        }
        return this.databaseService.executeStoredProcedure<RegisterFullCarrerDto>('insertCarrer',[
            newCarrer.name,
            newCarrer.description,
            newCarrer.totalSemester,
            newCarrer.departmentId,
            newCarrer.state,
            newCarrer.creationDate,
        ]);
    }
    async getAllCarrers(): Promise<Carrer[]> {
        return await this.carrerRepository.find();
    }
    async getCarrerByDepartment(departmentName: string): Promise<Carrer[]> {
        const department = await this.departmentService.getDepartmentByName(departmentName);
        if (!department) {
            throw new Error('Department not found');
        }
        return await this.carrerRepository.find({
            where: {
                departmentId: department.id,
                }
            });
    }
    async getCarrerById(id: number): Promise<Carrer | null> {
        return await this.carrerRepository.findOne({
            where: {
                id,
            },
        });
    }
    async getCarrerByName(name: string): Promise<Carrer | null> {
        return await this.carrerRepository.findOne({
            where: {
                name,
            },
        });
    }
}
