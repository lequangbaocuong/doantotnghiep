import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { hosovuan } from "./hosovuan"; 
import { vaitro } from "./vaitro";

export type GioiTinh = "nam" | "nữ" | "khác";

@Entity("canbo")
export class canbo {
    @PrimaryColumn({ type: "varchar", length: 6 })
    id_canbo!: string;

    @Column({ type: "varchar", length: 12, unique: true })
    cccd!: string;

    @Column({ type: "varchar", length: 255 })
    matkhau!: string;

    @Column({ type: "varchar", length: 100 })
    hoten!: string;

    @Column({ type: "varchar", length: 11, nullable: true })
    sodienthoai!: string;

    @Column({
        type: "enum",
        enum: ["nam", "nữ", "khác"],
        default: "khác"
    })
    gioitinh!: GioiTinh;

    @Column({ type: "varchar", length: 50, nullable: true })
    email!: string;

    @Column({ type: "date", nullable: true })
    ngaysinh!: Date;

    @Column({ type: "varchar", length: 255, nullable: true })
    diachi!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    anh!: string;
    
    @Column({ type: "varchar", length: 6, nullable: true })
    id_vaitro!: string;

    @OneToMany(() => hosovuan, (hosovuan) => hosovuan.id_canbo)
    ds_hosovuan!: hosovuan[];

    @ManyToOne(() => vaitro, (vt) => vt.ds_canbo)
    @JoinColumn({ name: "id_vaitro" }) // Tên cột trong DB là id_vaitro
    vaitro!: vaitro;
}