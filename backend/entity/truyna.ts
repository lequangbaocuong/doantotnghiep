import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { canbo } from "./canbo";

export type GioiTinh = "nam" | "nữ" | "khác";
export type MucDo = 'ít nghiêm trọng' | 'nghiêm trọng' | 'rất nghiêm trọng' | 'đặc biệt nghiêm trọng';

@Entity("truyna")
export class truyna {
    @PrimaryColumn({ type: "varchar", length: 10 }) // Nên thống nhất length 10 như các bảng khác
    id_truyna!: string;

    @Column({ type: "varchar", length: 100 })
    hoten!: string;

    @Column({ type: "int", nullable: true })
    tuoi!: number;

    @Column({
        type: "enum",
        enum: ["nam", "nữ", "khác"]
    })
    gioitinh!: GioiTinh;

    @Column({ type: "varchar", length: 255 })
    toidanh!: string;

    @Column({
        type: "enum",
        enum: ['ít nghiêm trọng', 'nghiêm trọng', 'rất nghiêm trọng', 'đặc biệt nghiêm trọng']
    })
    mucdo!: MucDo;

    @Column({ type: "varchar", length: 255, nullable: true })
    diachi!: string;

    @Column({ type: "text", nullable: true })
    mota!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    anh!: string;

    @Column({ type: "varchar", length: 50, default: "chờ duyệt" })
    trangthai!: string;

    @Column({ type: "datetime", nullable: true })
    ngayduyet!: Date;

    @Column({ type: "varchar", length: 6, nullable: true })
    id_canbo!: string;

    @ManyToOne(() => canbo)
    @JoinColumn({ name: "id_canbo" })
    canbo!: canbo;
}