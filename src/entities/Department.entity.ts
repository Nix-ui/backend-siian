import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Carrer } from "./Carrer.entity";

@Index("name", ["name"], { unique: true })
@Entity("department", { schema: "siian" })
export class Department {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => Carrer, (carrer) => carrer.department)
  carrers: Carrer[];
}
