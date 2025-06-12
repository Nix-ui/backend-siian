import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Student } from "./Student.entity";
import { Teacher } from "./Teacher.entity";
import { Address } from "./Address.entity";
import { Role } from "./Role.entity";

@Index("email", ["email"], { unique: true })
@Index("id", ["id"], { unique: true })
@Index("user_index_3", ["email"], {})
@Index("user_index_4", ["email"], {})
@Index("user_index_5", ["id"], {})
@Index("user_index_6", ["addressId"], {})
@Entity("user", { schema: "siian" })
export class User {
  @Column("varchar", { primary: true, name: "uuid", length: 100 })
  uuid: string;

  @Column("varchar", { name: "id", nullable: true, unique: true, length: 20 })
  id: string | null;

  @Column("varchar", { name: "email", unique: true, length: 60 })
  email: string;

  @Column("varchar", { name: "password", length: 60 })
  password: string;

  @Column("timestamp", {
    name: "createdDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @Column("enum", { name: "userState", enum: ["active", "inactive", "delete"] })
  userState: "active" | "inactive" | "delete";

  @Column("timestamp", {
    name: "lastLoginDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastLoginDate: Date;

  @Column("varchar", { name: "firstName", length: 40 })
  firstName: string;

  @Column("int", { name: "addressId" })
  addressId: number;

  @Column("varchar", { name: "maternalLastName", length: 40 })
  maternalLastName: string;

  @Column("varchar", { name: "paternalLastName", length: 40 })
  paternalLastName: string;

  @OneToMany(() => Student, (student) => student.userUu)
  students: Student[];

  @OneToOne(() => Teacher, (teacher) => teacher.userUu)
  teacher: Teacher;

  @ManyToOne(() => Address, (address) => address.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "addressId", referencedColumnName: "id" }])
  address: Address;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: "userrole",
    joinColumns: [{ name: "userUuid", referencedColumnName: "uuid" }],
    inverseJoinColumns: [{ name: "roleId", referencedColumnName: "id" }],
    schema: "siian",
  })
  roles: Role[];
}
