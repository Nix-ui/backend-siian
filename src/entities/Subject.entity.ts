import { Column, Entity, Index, ManyToMany, OneToMany,JoinTable } from "typeorm";
import { Course } from "./Course.entity";
import { Teacher } from "./Teacher.entity";
import { Carrer } from "./Carrer.entity";

@Index("IDX_d011c391e37d9a5e63e8b04c97", ["name"], { unique: true })
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

  @ManyToMany(() => Carrer, (carrer) => carrer.subjects)
  @JoinTable({
    name: "subjectcarrer",
    joinColumns: [{ name: "subjectcode", referencedColumnName: "code" }],
    inverseJoinColumns: [{ name: "carrerid", referencedColumnName: "id" }],
    schema: "siian",
  })
  carrers: Carrer[];

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers: Teacher[];
}
