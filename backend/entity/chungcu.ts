import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"; 
import { nguoidan } from "./nguoidan";
import { hosovuan } from "./hosovuan";

export type LoaiChungCu = "vật lý" | "phi vật lý";

@Entity("chungcu")
export class chungcu {
    @PrimaryColumn({ type: "varchar", length: 10 })
    id_chungcu!: string;

    @Column({ length: 255, nullable: true })
    duongdantaptin!: string;

    @Column({ type: "varchar", length: 50})
    loaichungcu!: string;

    @Column({ type: 'text', nullable: true })
    mota!: string;

    @Column({ type: 'datetime' })
    ngaygui!: Date;

    @Column({ length: 6, nullable: true })
    id_nguoidan?: string | null;

    @ManyToOne(() => nguoidan)
    @JoinColumn({ name: "id_nguoidan" })
    nguoidan!: nguoidan;

    @Column({ type: "varchar", length: 10 })
    id_vuan!: string;

    @ManyToOne(() => hosovuan)
    @JoinColumn({ name: "id_vuan" })
    hosovuan!: hosovuan;

    @OneToMany(() => chungcu, (cc) => cc.hosovuan)
    ds_chungcu!: chungcu[];
}