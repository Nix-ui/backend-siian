import { Controller, Post,Get, Body  } from '@nestjs/common';
import { AcademicPeriodService } from './academic-period.service';
import { RegisterAcademicPeriodDto } from './dto/register-academic-period';
@Controller('academic-period')
export class AcademicPeriodController {
    constructor(private readonly academicPeriodService: AcademicPeriodService) {}
    @Post()
    async registerAcademicPeriod(@Body() academicPeriod: RegisterAcademicPeriodDto) {
        return await this.academicPeriodService.registerAcademicPeriod(academicPeriod);
    }
    @Get()
    async getAcademicPeriods() {
        return await this.academicPeriodService.getAllAcademicPeriods();
    }
}
