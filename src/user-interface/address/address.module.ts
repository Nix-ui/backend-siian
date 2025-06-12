import { Module } from '@nestjs/common';
import { DepartmentAddressModule } from './department-address/department-address.module';
import { ProvinceModule } from './province/province.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/Address.entity';

@Module({
  imports: [DepartmentAddressModule, ProvinceModule,
    TypeOrmModule.forFeature([Address])
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
