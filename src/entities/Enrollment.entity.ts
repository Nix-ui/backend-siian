import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course.entity";
import { Student } from "./Student.entity";
import { Notes } from "./Notes.entity";

@Index("enrollment_index_15", ["enrollmentDate"], {})
@Index("enrollment_index_16", ["state"], {})
@Index("enrollment_index_17", ["studentUuid"], {})
@Index("enrollment_index_18", ["courseId"], {})
@Index("enrollment_index_19", ["studentUuid", "courseId"], { unique: true })
@Entity("enrollment", { schema: "siian" })
export class Enrollment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "studentUuid", length: 100 })
  studentUuid: string;

  @Column("int", { name: "courseId" })
  courseId: number;

  @Column("enum", {
    name: "state",
    nullable: true,
    enum: ["inscrito", "aprobado", "reprobado", "abandono"],
    default:"inscrito",
  })
  state: "inscrito" | "aprobado" | "reprobado" | "abandono" | null;

  @Column("timestamp", {
    name: "enrollmentDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  enrollmentDate: Date;

  @Column("decimal", {
    name: "grade",
    precision: 10,
    scale: 0,
    default: () => "'0'",
  })
  grade: string;

  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "courseId", referencedColumnName: "id" }])
  course: Course;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "studentUuid", referencedColumnName: "userUuid" }])
  studentUu: Student;

  @OneToMany(() => Notes, (notes) => notes.studentEnrollment)
  notes: Notes[];
}
