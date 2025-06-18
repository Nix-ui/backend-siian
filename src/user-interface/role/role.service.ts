import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private userService: UserService
    ) {}
    async createRole(role: Role): Promise<Role> {
        return await this.roleRepository.save(role);
    }
    async getRolesByUserId(userId: string): Promise<Role[]> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return [];
        }
        const roles = await this.roleRepository.find({
            where: {
                users: {
                    uuid: user.uuid
                }
            }
        });
        return roles;
    }
    async getRolesByEmail(email: string): Promise<Role[]> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            return [];
        }
        const roles = await this.roleRepository.find({
            where: {
                users: {
                    uuid: user.uuid
                }
            }
        });
        return roles;
    }
    async assignRoleToUserById(userId: string, roleId: number): Promise<Role> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const role = await this.roleRepository.findOne({
            where: {
                id: roleId
            }
        });
        if (!role) {
            throw new Error('Role not found');
        }
        const updatedRole = await this.roleRepository.save({
            ...role,
            users: [...role.users, user]
        })
        user.roles.push(role);
        
        return role;
    }
    async assignRoleToUserByEmail(email: string, roleId: number): Promise<Role> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const role = await this.roleRepository.findOne({
            where: {
                id: roleId
            }
        });
        if (!role) {
            throw new Error('Role not found');
        }
        const updatedRole = await this.roleRepository.save({
            ...role,
            users: [...role.users, user]
        })
        user.roles.push(role);
        return role;
    }
    async asignRoleToUserByEmailAndRoleName(email: string, roleName: string): Promise<Role> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const role = await this.roleRepository.findOne({
            where: {
                name: roleName
            }
        });
        if (!role) {
            throw new Error('Role not found');
        }
        const updateUser = await this.userService.asignRoleToUser(user.uuid, role);
        const updatedRole = await this.roleRepository.save({
            ...role,
            users: [updateUser]
        })
        return role;
    }
    async asingRoleToUserByUuidAndRoleName(uuid: string, roleName: string): Promise<Role> {
        const user = await this.userService.getUserByUuid(uuid);
        if (!user) {
            throw new Error('User not found');
        }
        const role = await this.roleRepository.findOne({
            where: {
                name: roleName
            }
        });
        if (!role) {
            throw new Error('Role not found');
        }
        const updateUser = await this.userService.asignRoleToUser(user.uuid, role);
        const updatedRole = await this.roleRepository.save(role);
        return updatedRole;
    }
    async getRoleByName(name: string): Promise<Role> {
        const role = await this.roleRepository.findOne({
            where: {
                name
            }
        });
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    }
    async saveRole(role: Role): Promise<Role> {
        return await this.roleRepository.save(role);
    }
}
