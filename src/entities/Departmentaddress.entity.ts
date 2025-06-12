import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "./Province.entity";

@Entity("departmentaddress", { schema: "siian" })
export class Departmentaddress {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 20 })
  name: string;

  @OneToMany(() => Province, (province) => province.department)
  provinces: Province[];
}
