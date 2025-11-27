import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { chungcu } from "./chungcu";
import { dontogiac } from "./dontogiac";

export type GioiTinh = "nam" | "nữ" | "khác";

@Entity("nguoidan")
export class nguoidan {
    @PrimaryColumn({ type: "varchar", length: 6 })
    id_nguoidan!: string;

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

    @Column({ type: "boolean", default: true })
    lan_dau_dang_nhap!: boolean;

    @Column({ type: "varchar", length: 255 })
    diachi!: string;

    @Column({ type: "varchar", length: 255 })
    anh!: string;

    @OneToMany(() => chungcu, chungcu => chungcu.nguoidan)
    chungcus!: chungcu[];

    @OneToMany(() => dontogiac, dontogiac => dontogiac.nguoidan)
    dontogiacs!: dontogiac[];
}