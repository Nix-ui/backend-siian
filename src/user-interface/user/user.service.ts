import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { Repository, Timestamp } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from '../address/address.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { NewUserDto, RegisterUserDto } from './dto/register-user.dto';
import { ProvinceService } from '../address/province/province.service';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { Role } from 'src/entities/Role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly addressService: AddressService,
        private readonly provinceService: ProvinceService,
        private readonly databaseService: DatabaseService
    ) {
    }
    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
    }
    async getUserByUuid(uuid: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { uuid } });
    }
    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }
    async createUser(user: CreateUserDto): Promise<any> {
        let registerUser: RegisterUserDto;
        registerUser = {
            id: user.id,
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
            firstName: user.firstName,
            maternalLastName: user.maternalLastName,
            paternalLastName: user.paternalLastName,
            userState: 'active',
            createdDate: Date.now().toString(),
            lastLoginDate: Date.now().toString(),
            department: user.department,
            province: user.province,
            street: user.street,
            details: user.details,
        };
        const addressDto: CreateAddressDto = {
            department: user.department,
            province: user.province,
            street: user.street
        };
        if (user.details) {
            addressDto.details = user.details;
        }
        let newestUser= new NewUserDto();
        const address = await this.addressService.registerAddress(addressDto);
        const actualTime = new Date();
        const timeZone = actualTime.getTimezoneOffset();
        const timeActual = new Date().setTime(actualTime.getTime() - timeZone * 60 * 1000)
        newestUser.uuid = undefined;
        newestUser.id=registerUser.id;
        newestUser.email=registerUser.email;
        newestUser.password=registerUser.password;
        newestUser.firstName=registerUser.firstName;
        newestUser.maternalLastName=registerUser.maternalLastName;
        newestUser.paternalLastName=registerUser.paternalLastName;
        newestUser.userState=registerUser.userState;
        newestUser.createdDate =new Date(timeActual).toISOString().replace('T', ' ').split('.')[0];
        newestUser.lastLoginDate = new Date(timeActual).toISOString().replace('T', ' ').split('.')[0];
        newestUser.addressId=address.id;
        return this.databaseService.executeStoredProcedure(`insertUser`, [newestUser.id, newestUser.email, newestUser.password, newestUser.userState,newestUser.firstName,newestUser.createdDate,newestUser.lastLoginDate,newestUser.addressId,newestUser.maternalLastName,newestUser.paternalLastName]);;
    }
    async asignRoleToUser(userUuid: string, role:Role): Promise<User> {
        const user = await this.getUserByUuid(userUuid);
        if (!user) {
            throw new Error('User not found');
        }
        const updateUser = await this.userRepository.save({
            ...user,
            roles: [role]
        });
        return await this.userRepository.save(updateUser);
    }
    async asignRole(userUuid: string, role: string): Promise<User> {
        const user = await this.getUserByUuid(userUuid);
        if (!user) {
            throw new Error('User not found');
        }
        const roleEntity = await this.databaseService.executeStoredProcedure(`getRoleByName`, [role]);
        const updateUser = await this.userRepository.save({
            ...user,
            roles: [roleEntity]
        });
        return await this.userRepository.save(updateUser);
    }
    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
