import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { hosovuan } from "./hosovuan";
import { nhiemvudieutra } from "./nhiemvudieutra";

@Entity("kehoachdieutra")
export class kehoachdieutra {
    @PrimaryColumn({ type: "varchar", length: 10 }) 
    id_kehoach!: string;

    @Column({ type: "date" })
    thoihan!: Date;

    @Column({ type: "text" })
    noidung!: string;

    @Column({ type: "text", nullable: true })
    ketquadieutra!: string;

    @Column({ type: "varchar", length: 50, default: "mới tạo" })
    trangthai!: string;

    @Column({ type: "datetime" })
    ngaytao!: Date;

    @Column({ type: "varchar", length: 10 })
    id_vuan!: string;

    @ManyToOne(() => hosovuan)
    @JoinColumn({ name: "id_vuan" })
    hosovuan!: hosovuan;

    @OneToMany(() => nhiemvudieutra, (nv) => nv.kehoach)
    ds_nhiemvu!: nhiemvudieutra[];
}