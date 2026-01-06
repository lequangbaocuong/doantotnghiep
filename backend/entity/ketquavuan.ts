import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { hosovuan } from "./hosovuan";

@Entity("ketquavuan")
export class ketquavuan {
    @PrimaryColumn()
    id_ketqua!: string;

    @Column()
    id_vuan!: string;

    @Column()
    thoigianbaocao!: Date;

    @Column()
    nguoibaocao!: string;

    @Column("text")
    tomtat!: string;

    @Column("text")
    dongco!: string;

    @Column()
    trangthai!: string; // 'chờ duyệt', 'đã duyệt', 'từ chối'

    @OneToOne(() => hosovuan)
    @JoinColumn({ name: "id_vuan" })
    vuan!: hosovuan;
}