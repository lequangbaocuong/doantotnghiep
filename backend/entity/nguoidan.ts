import { Entity, PrimaryColumn, Column } from "typeorm";

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
}