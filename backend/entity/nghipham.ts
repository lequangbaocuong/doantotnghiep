import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { hosovuan } from "./hosovuan";

export type GioiTinh = "nam" | "nữ" | "khác";
export type TinhTrang = 'đang bắt giữ' | 'đã bắt giữ' | 'tại ngoại' | 'truy nã'; 

@Entity("nghipham")
export class nghipham {
    @PrimaryColumn({ type: "varchar", length: 10 }) 
    id_nghipham!: string;

    @Column({ type: "varchar", length: 100 })
    hoten!: string;

    @Column({ type: "enum", enum: ["nam", "nữ", "khác"], default: "khác" })
    gioitinh!: GioiTinh;

    @Column({ type: "date", nullable: true })
    ngaysinh!: string;

    @Column({ type: "varchar", length: 12, unique: true, nullable: true })
    cccd!: string;

    @Column({ type: "enum", enum: ['đang bắt giữ', 'đã bắt giữ'], default: 'đang bắt giữ' })
    tinhtrangbatgiu!: TinhTrang;

    @Column({ type: "varchar", length: 255, nullable: true })
    diachi!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    anh!: string;

    @Column({ type: "varchar", length: 10 })
    id_vuan!: string;

    @ManyToOne(() => hosovuan)
    @JoinColumn({ name: "id_vuan" })
    hosovuan!: hosovuan;
}