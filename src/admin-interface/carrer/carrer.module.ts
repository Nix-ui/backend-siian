import { Module } from '@nestjs/common';
import { CarrerController } from './carrer.controller';
import { CarrerService } from './carrer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrer } from 'src/entities/Carrer.entity';
import { DepartmentModule } from '../department/department.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carrer]),DepartmentModule,DatabaseModule],
  controllers: [CarrerController],
  providers: [CarrerService],
  exports: [CarrerService],
})
export class CarrerModule {}
