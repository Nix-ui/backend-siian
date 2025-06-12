import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { Course } from "./Course.entity";
import { Teacher } from "./Teacher.entity";
import { Carrer } from "./Carrer.entity";

@Index("name", ["name"], { unique: true })
@Index("subject_index_10", ["name"], {})
@Entity("subject", { schema: "siian" })
export class Subject {
  @Column("varchar", { primary: true, name: "code", length: 7 })
  code: string;

  @Column("varchar", { name: "name", unique: true, length: 40 })
  name: string;

  @OneToMany(() => Course, (course) => course.subjectCode2)
  courses: Course[];

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers: Teacher[];
  @ManyToMany(() => Carrer, (carrer) => carrer.subjects)
  carrers:Carrer[];
}
