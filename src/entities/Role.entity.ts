import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";

@Index("name", ["name"], { unique: true })
@Index("role_index_7", ["name"], {})
@Index("role_index_8", ["name"], {})
@Entity("role", { schema: "siian" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, unique: true, length: 40 })
  name: string | null;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
