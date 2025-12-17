import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { canbo } from "./canbo";

@Entity("vaitro")
export class vaitro {
    @PrimaryColumn({ type: "varchar", length: 6 })
    id_vaitro!: string;

    @Column({ type: "varchar", length: 255 })
    mota!: string;

    @OneToMany(() => canbo, (cb) => cb.vaitro)
    ds_canbo!: canbo[];
}