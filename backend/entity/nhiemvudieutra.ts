import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { kehoachdieutra } from "./kehoachdieutra";
import { canbo } from "./canbo";

@Entity("nhiemvudieutra")
export class nhiemvudieutra {
    @PrimaryColumn({ type: "varchar", length: 10 })
    id_nhiemvu!: string;

    @Column({ type: "varchar", length: 255 })
    tennhiemvu!: string;

    @Column({ type: "text" })
    noidung!: string;

    @Column({ type: "varchar", length: 50, default: "chưa thực hiện" })
    trangthai!: string;

    @Column({ type: "date", nullable: true }) 
    ngaybatdau!: string;

    @Column({ type: "date", nullable: true })
    ngayketthuc!: string;
    
    @Column({ type: "varchar", length: 10 })
    id_kehoach!: string;

    @Column("text", { nullable: true })
    ketqua!: string;

    @ManyToOne(() => kehoachdieutra)
    @JoinColumn({ name: "id_kehoach" })
    kehoach!: kehoachdieutra;

    @Column({ type: "varchar", length: 6, nullable: true })
    id_canbo!: string;

    @ManyToOne(() => canbo)
    @JoinColumn({ name: "id_canbo" })
    canbo!: canbo;
}