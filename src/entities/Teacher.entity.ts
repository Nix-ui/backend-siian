import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Course } from "./Course.entity";
import { User } from "./User.entity";
import { Subject } from "./Subject.entity";

@Entity("teacher", { schema: "siian" })
export class Teacher {
  @Column("varchar", { primary: true, name: "userUuid", length: 100 })
  userUuid: string;

  @Column("timestamp", {
    name: "hiringDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  hiringDate: Date;

  @OneToMany(() => Course, (course) => course.teacherUu)
  courses: Course[];

  @OneToOne(() => User, (user) => user.teacher, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userUuid", referencedColumnName: "uuid" }])
  userUu: User;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  @JoinTable({
    name: "teachersubject",
    joinColumns: [{ name: "teacherUuid", referencedColumnName: "userUuid" }],
    inverseJoinColumns: [{ name: "subjectCode", referencedColumnName: "code" }],
    schema: "siian",
  })
  subjects: Subject[];
}
