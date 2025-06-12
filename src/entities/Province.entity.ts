import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address.entity";
import { Departmentaddress } from "./Departmentaddress.entity";

@Index("province_index_0", ["name"], {})
@Index("province_index_1", ["departmentId"], {})
@Entity("province", { schema: "siian" })
export class Province {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 40 })
  name: string;

  @Column("int", { name: "departmentId" })
  departmentId: number;

  @OneToMany(() => Address, (address) => address.province)
  addresses: Address[];

  @ManyToOne(
    () => Departmentaddress,
    (departmentaddress) => departmentaddress.provinces,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "departmentId", referencedColumnName: "id" }])
  department: Departmentaddress;
}
