import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { hosovuan } from "./hosovuan";

export type TinhTrangNanNhan = 'còn sống' | 'bị thương' | 'đã chết' | 'mất tích';
export type GioiTinh = "nam" | "nữ" | "khác";

@Entity("nannhan")
export class nannhan {
    @PrimaryColumn({ type: "varchar", length: 6 })
    id_nannhan!: string;

    @Column({ type: "varchar", length: 50 })
    hovaten!: string;

    @Column({ type: "varchar", length: 11, nullable: true })
    sodienthoai!: string;

    @Column({ 
        type: "enum", 
        enum: ["nam", "nữ", "khác"], 
        default: "khác" })
    gioitinh!: GioiTinh;

    @Column({ type: "varchar", length: 255, nullable: true })
    diachi!: string;

    @Column({ 
        type: "enum", 
        enum: ['còn sống', 'bị thương', 'đã chết', 'mất tích'], 
        default: 'còn sống' 
    })
    tinhtrang!: TinhTrangNanNhan;

    @Column({ type: "varchar", length: 10, nullable: true })
    id_vuan!: string | null ;

    @ManyToOne(() => hosovuan)
    @JoinColumn({ name: "id_vuan" })
    hosovuan!: hosovuan;
}