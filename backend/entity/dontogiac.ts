import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { nguoidan } from "./nguoidan";

export type LoaiToGiac = "ít nghiêm trọng" | "nghiêm trọng" | "rất nghiêm trọng" | "đặc biệt nghiêm trọng";
export type TrangThaiToGiac = "chưa xử lý" | "đang xử lý" | "đã xử lý" | "từ chối";

@Entity('dontogiac')
export class dontogiac {
    @PrimaryColumn({ length: 6 })
    id_togiac!: string;

    @Column({ length: 255, nullable: true })
    tieude!: string;

    @Column({ type: 'text' })
    noidung!: string;

    @Column({ 
        type: 'enum', 
        enum: ['ít nghiêm trọng', 'nghiêm trọng', 'rất nghiêm trọng', 'đặc biệt nghiêm trọng']})
    loai!: LoaiToGiac;

    @Column({ type: 'boolean', default: false })
    andanh!: boolean;

    @Column({ 
        type: 'enum', 
        enum: ['chưa xử lý', 'đang xử lý', 'đã xử lý', 'từ chối'], 
        default: 'chưa xử lý',
    })
    trangthai!: TrangThaiToGiac;

    @Column({ type: 'datetime' })
    ngaygui!: Date;

    @Column({ type: 'date', nullable: true })
    ngayxayra!: Date;

    @Column({ length: 255, nullable: true })
    diachivuviec!: string;

    @Column({ length: 6, nullable: true })
    id_nguoidan?: string | null;

    @ManyToOne(() => nguoidan, nguoidan => nguoidan.dontogiacs)
    @JoinColumn({ name: 'id_nguoidan' })
    nguoidan?: nguoidan | null;
}