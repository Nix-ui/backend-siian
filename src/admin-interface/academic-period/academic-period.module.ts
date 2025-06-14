import { Module } from '@nestjs/common';
import { AcademicPeriodController } from './academic-period.controller';
import { AcademicPeriodService } from './academic-period.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Academicperiod } from 'src/entities/Academicperiod.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Academicperiod]),
    DatabaseModule
  ],
  controllers: [AcademicPeriodController],
  providers: [AcademicPeriodService],
  exports: [AcademicPeriodService],
})
export class AcademicPeriodModule {}
