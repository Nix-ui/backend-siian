import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Course } from "./Course.entity";

@Index("class_index_14", ["courseId"], {})
@Entity("class", { schema: "siian" })
export class Class {
  @Column("int", { primary: true, name: "courseId" })
  courseId: number;

  @Column("timestamp", {
    primary: true,
    name: "classDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  classDate: Date;

  @Column("time", { primary: true, name: "startTime" })
  startTime: string;

  @Column("time", { name: "endTime" })
  endTime: string;

  @Column("varchar", { primary: true, name: "ubication", length: 6 })
  ubication: string;

  @Column("enum", {
    name: "type",
    enum: ["virtual", "semipresencial", "presencial"],
    default: "presencial", // ¡CAMBIO AQUÍ! Elimina la función de flecha
  })
  type: "virtual" | "semipresencial" | "presencial";

  @ManyToOne(() => Course, (course) => course.classes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "courseId", referencedColumnName: "id" }])
  course: Course;
}