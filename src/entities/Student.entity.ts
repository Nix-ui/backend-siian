import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Enrollment } from "./Enrollment.entity";
import { User } from "./User.entity";
import { Carrer } from "./Carrer.entity";

@Index("userUuid", ["userUuid"], {})
@Entity("student", { schema: "siian" })
export class Student {
  @Column("varchar", { primary: true, name: "userUuid", length: 100 })
  userUuid: string;

  @Column("int", { primary: true, name: "carrerId" })
  carrerId: number;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.studentUu)
  enrollments: Enrollment[];

  @ManyToOne(() => User, (user) => user.students, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userUuid", referencedColumnName: "uuid" }])
  userUu: User;

  @ManyToOne(() => Carrer, (carrer) => carrer.students, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "carrerId", referencedColumnName: "id" }])
  carrer: Carrer;
}
