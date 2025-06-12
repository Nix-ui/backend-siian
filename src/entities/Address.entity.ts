import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Province } from "./Province.entity";
import { User } from "./User.entity";

@Index("address_index_2", ["provinceId"], {})
@Entity("address", { schema: "siian" })
export class Address {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "provinceId" })
  provinceId: number;

  @Column("varchar", { name: "street", length: 50 })
  street: string;

  @Column("varchar", {
    name: "details",
    nullable: true,
    length: 100,
    default: () => "'Sin detalles'",
  })
  details: string | null;

  @ManyToOne(() => Province, (province) => province.addresses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "provinceId", referencedColumnName: "id" }])
  province: Province;

  @OneToMany(() => User, (user) => user.address)
  users: User[];
}
