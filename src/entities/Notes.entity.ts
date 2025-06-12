import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Enrollment } from "./Enrollment.entity";

@Index("notes_index_20", ["studentEnrollmentId"], {})
@Entity("notes", { schema: "siian" })
export class Notes {
  @Column("int", { primary: true, name: "studentEnrollmentId" })
  studentEnrollmentId: number;

  @Column("decimal", { name: "grade", nullable: true, precision: 10, scale: 0 })
  grade: string | null;

  @Column("timestamp", {
    primary: true,
    name: "calificationDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  calificationDate: Date;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.notes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "studentEnrollmentId", referencedColumnName: "id" }])
  studentEnrollment: Enrollment;
}
