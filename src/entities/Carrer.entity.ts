import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "./Department.entity";
import { Student } from "./Student.entity";
import { Subject } from "./Subject.entity";

@Index("carrer_index_9", ["departmentId"], {})
@Entity("carrer", { schema: "siian" })
export class Carrer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "totalSemester" })
  totalSemester: number;

  @Column("int", { name: "departmentId" })
  departmentId: number;

  @Column("enum", { name: "state", enum: ["active", "close", "inactive"] })
  state: "active" | "close" | "inactive";

  @Column("timestamp", {
    name: "creationDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationDate: Date;

  @ManyToOne(() => Department, (department) => department.carrers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "departmentId", referencedColumnName: "id" }])
  department: Department;

  @OneToMany(() => Student, (student) => student.carrer)
  students: Student[];

  @ManyToMany(() => Subject, (subject) => subject.carrers)
  subjects: Subject[];
}
