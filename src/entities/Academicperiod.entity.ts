import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";

@Index("name", ["name"], { unique: true })
@Entity("academicperiod", { schema: "siian" })
export class Academicperiod {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 7 })
  name: string;

  @Column("timestamp", {
    name: "startDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  startDate: Date;

  @Column("timestamp", { name: "endDate", default: () => "CURRENT_TIMESTAMP" })
  endDate: Date;

  @OneToMany(() => Course, (course) => course.academicPeriod2)
  courses: Course[];
}
