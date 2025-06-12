import { Injectable } from '@nestjs/common';
import { DepartmentAddressService } from './department-address/department-address.service';
import { ProvinceService } from './province/province.service';
import { Address } from 'src/entities/Address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
    constructor(
        private departmentAddressService: DepartmentAddressService,
        private provinceService: ProvinceService,
        @InjectRepository(Address)
        private addressRepository: Repository<Address>
    ) { }
    async getAllAddress(): Promise<Address[]> {
        return await this.addressRepository.find();
    }
    async registerAddress(addressInfo: CreateAddressDto): Promise<Address> {
        const provinces = await this.provinceService.getProvinceByDepartment(addressInfo.department);
        const address = new Address();
        console.log(addressInfo);
        console.log(provinces);
        provinces.forEach(province => {
            if (province.name === addressInfo.province) {
                address.provinceId = province.id;
            }
        });
        address.street = addressInfo.street;
        if(addressInfo.details) {
            address.details = addressInfo.details;
        }else{
            address.details = null;
        }
        console.log(address);
        return await this.addressRepository.save(address);
    }
}
