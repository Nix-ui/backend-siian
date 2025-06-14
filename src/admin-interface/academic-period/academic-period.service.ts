import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Academicperiod } from 'src/entities/Academicperiod.entity';
import { Repository } from 'typeorm';
import { RegisterAcademicPeriodDto } from './dto/register-academic-period';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class AcademicPeriodService {
    constructor(
        @InjectRepository(Academicperiod)
        private academicPeriodRepository: Repository<Academicperiod>,
        private databaseService: DatabaseService
    ) {}
    async registerAcademicPeriod(academicPeriod: RegisterAcademicPeriodDto): Promise<RegisterAcademicPeriodDto> {
        return this.databaseService.executeStoredProcedure<RegisterAcademicPeriodDto>(`insertAcademicPeriod`,
            [
                academicPeriod.name,
                academicPeriod.startDate,
                academicPeriod.endDate,
            ]
        )
    }
    async getAllAcademicPeriods(): Promise<Academicperiod[]> {
        return this.academicPeriodRepository.find();
    }
    async getAcademicPeriodById(id: number): Promise<Academicperiod | null> {
        return this.academicPeriodRepository.findOne({ where: { id } });
    }
    async getAcademicPeriodByName(name: string): Promise<Academicperiod | null> {
        return this.academicPeriodRepository.findOne({ where: { name } });
    }
}
