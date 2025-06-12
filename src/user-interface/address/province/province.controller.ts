import { Controller, Get, Post, Param } from '@nestjs/common';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
    constructor(private readonly provinceService: ProvinceService) {}
    @Get()
    async getAllProvinces() {
        return await this.provinceService.getAllProvince();
    }
    @Get(':name')
    async getProvinceByDepartment(@Param('name') name: string) {
        return await this.provinceService.getProvinceByDepartment(name);
    }
}
