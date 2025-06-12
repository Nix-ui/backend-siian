import { Injectable } from '@nestjs/common';
import { Departmentaddress } from 'src/entities/Departmentaddress.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentAddressService {
    constructor(
        @InjectRepository(Departmentaddress)
        private readonly departmentAddressRepository: Repository<Departmentaddress>,
    ) { }
    async GetAllDepartments(): Promise<Departmentaddress[]> {
        return await this.departmentAddressRepository.find();
    }
    async GetDepartmentByName(name: string): Promise<Departmentaddress | null> {
        return await this.departmentAddressRepository.findOne({
            where: {
                name: name
            }
        });
    }
    async registerDepartment(name:string ): Promise<Departmentaddress> {
        return await this.departmentAddressRepository.save({
            name: name
        });
    }
}
