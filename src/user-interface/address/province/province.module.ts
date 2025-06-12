import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { Province } from 'src/entities/Province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentAddressModule } from '../department-address/department-address.module';
@Module({
  imports: [TypeOrmModule.forFeature([Province]), DepartmentAddressModule],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService]
})
export class ProvinceModule {}
