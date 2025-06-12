import { Module } from '@nestjs/common';
import { DepartmentAddressController } from './department-address.controller';
import { DepartmentAddressService } from './department-address.service';
import { Departmentaddress } from 'src/entities/Departmentaddress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ TypeOrmModule.forFeature([Departmentaddress]) ],
  controllers: [DepartmentAddressController],
  providers: [DepartmentAddressService],
  exports: [DepartmentAddressService]
})
export class DepartmentAddressModule {}
