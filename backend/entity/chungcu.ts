import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"; 
import { nguoidan } from "./nguoidan";

export type LoaiChungCu = "vật lý" | "phi vật lý";

@Entity("chungcu")
export class chungcu {
    @PrimaryColumn({ type: "varchar", length: 10 })
    id_chungcu!: string;

    @Column({ length: 255, nullable: true })
    duongdantaptin!: string;

    @Column({ 
        type: 'enum', 
        enum: ['vật lý', 'phi vật lý'] 
    })
    loaichungcu!: LoaiChungCu;

    @Column({ type: 'text', nullable: true })
    mota!: string;

    @Column({ type: 'datetime' })
    ngaygui!: Date;

    @Column({ length: 6, nullable: true })
    id_nguoidan?: string | null;

    @ManyToOne(() => nguoidan)
    @JoinColumn({ name: "id_nguoidan" })
    nguoidan!: nguoidan;
}