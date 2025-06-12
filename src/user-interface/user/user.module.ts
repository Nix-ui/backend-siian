import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '../address/address.module';
import { ProvinceModule } from '../address/province/province.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ TypeOrmModule.forFeature([User]),
  AddressModule,ProvinceModule,DatabaseModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
