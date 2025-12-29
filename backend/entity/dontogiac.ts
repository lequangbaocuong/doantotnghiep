import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { nguoidan } from "./nguoidan";

export enum LoaiToiPham {
    TROM_CAP = 'trộm cắp tài sản',
    MA_TUY = 'liên quan đến ma túy',
    TRAT_TU_CONG_CONG = 'ảnh hưởng trật tự nơi công cộng',
    KHAC = 'khác'
}

export enum VaiTroNguoiDan {
    NAN_NHAN = 'nạn nhân',
    NHAN_CHUNG = 'nhân chứng',
    BAO_HO = 'báo hộ'
}

export type TrangThaiToGiac = "chưa xử lý" | "đang xử lý" | "đã xử lý" | "từ chối";

@Entity('dontogiac')
export class dontogiac {
    @PrimaryColumn({ length: 10 })
    id_togiac!: string;

    @Column({ length: 255, nullable: true })
    tieude!: string;

    @Column({ type: 'text' })
    noidung!: string;

    @Column({ 
        type: 'enum', 
        enum: LoaiToiPham
    })
    loaitoipham!: LoaiToiPham;

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
    ngayxayra!: string; 

    @Column({ length: 255, nullable: true })
    diachivuviec!: string;

    @Column({ length: 6, nullable: true })
    id_nguoidan?: string | null;

    @Column({ 
        type: 'enum', 
        enum: VaiTroNguoiDan
    })
    vaitronguoidan!: VaiTroNguoiDan;

    @ManyToOne(() => nguoidan, nguoidan => nguoidan.dontogiacs)
    @JoinColumn({ name: 'id_nguoidan' })
    nguoidan?: nguoidan | null;
}