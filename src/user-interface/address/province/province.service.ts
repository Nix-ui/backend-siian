import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from 'src/entities/Province.entity';
import { DepartmentAddressService } from '../department-address/department-address.service';
import { RegisterProvinceDto } from './dto/register-province.dto';

@Injectable()
export class ProvinceService {
    constructor(
        @InjectRepository(Province)
        private provinceRepository: Repository<Province>,
        private departmentAddressService: DepartmentAddressService
    ) {}
    async getAllProvince(): Promise<Province[]> {
        return await this.provinceRepository.find();
    }
    async getProvinceByDepartment(department: string): Promise<Province[]> {
        const departmentAddress = await this.departmentAddressService.GetDepartmentByName(department);
        if(!departmentAddress) return [];
        return await this.provinceRepository.find({
            where: {
                departmentId: departmentAddress.id
            }
        });
    }
    async getProvinceById(id: number): Promise<Province | null> {
        return await this.provinceRepository.findOne({
            where: {
                id: id
            }
        });
    }
    async getProvinceByDepartmentAndName(department: string, name: string): Promise<Province | null> {
        const departmentAddress = await this.departmentAddressService.GetDepartmentByName(department);
        if(!departmentAddress) return null;
        return await this.provinceRepository.findOne({
            where: {
                departmentId: departmentAddress.id,
                name: name
            }
        });
    }
    async registerProvince(data: RegisterProvinceDto): Promise<Province | null> {
        const departmentAddress = await this.departmentAddressService.GetDepartmentByName(data.department);
        if(!departmentAddress) return null;
        const province = new Province();
        province.name = data.name;
        province.departmentId = departmentAddress.id;
        return await this.provinceRepository.save(province);
    }

}
