import { Controller,Get, Body,Param } from '@nestjs/common';
import { DepartmentAddressService } from './department-address.service';
@Controller('department-address')
export class DepartmentAddressController {
    constructor(private readonly departmentAddressService: DepartmentAddressService) {}
    @Get()
    async getAllDepartments() {
        const actualTime = new Date();
        const timeZone = actualTime.getTimezoneOffset();
        const timeActual = new Date().setTime(actualTime.getTime() - timeZone * 60 * 1000)
        console.log(new Date(timeActual).toISOString());
        return await this.departmentAddressService.GetAllDepartments();
    }
    @Get(':name')
    async getDepartmentByName(@Param('name') name: string) {
        return await this.departmentAddressService.GetDepartmentByName(name);
    }
}
