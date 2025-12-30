import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { dontogiac } from "./dontogiac";
import { canbo } from "./canbo";
import { nghipham } from "./nghipham";
import { chungcu } from "./chungcu";
import { nannhan } from "./nannhan";

export type MucDo = 'ít nghiêm trọng' | 'nghiêm trọng' | 'rất nghiêm trọng' | 'đặc biệt nghiêm trọng';

@Entity("hosovuan")
export class hosovuan {
    @PrimaryColumn({ type: "varchar", length: 10 }) 
    id_vuan!: string;

    @Column({ type: "varchar", length: 255 })
    tenvuan!: string;

    @Column({ type: "text", nullable: true })
    mota!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    nguoitao!: string;

    @Column({ type: "datetime" })
    ngaytao!: Date;

    @Column({ type: "varchar", length: 50 })
    trangthai!: string;

    @Column({ 
        type: "enum", 
        enum: ['ít nghiêm trọng', 'nghiêm trọng', 'rất nghiêm trọng', 'đặc biệt nghiêm trọng'] 
    })
    mucdo!: MucDo;

    @Column({ type: "varchar", length: 10, nullable: true })
    id_togiac!: string;

    @Column({ type: "varchar", length: 6, nullable: true })
    id_canbo!: string;

    // @Column({ type: "varchar", length: 6, nullable: true })
    // id_nannhan!: string;

    @ManyToOne(() => dontogiac)
    @JoinColumn({ name: "id_togiac" })
    dontogiac!: dontogiac;

    @ManyToOne(() => canbo, (canbo) => canbo.ds_hosovuan)
    @JoinColumn({ name: "id_canbo" })
    canbo!: canbo;

    @OneToMany(() => nghipham, (np) => np.hosovuan)
    ds_nghipham!: nghipham[];

    @OneToMany(() => chungcu, (cc) => cc.hosovuan)
    ds_chungcu!: chungcu[];

    @OneToMany(() => nannhan, (nn) => nn.hosovuan)
    ds_nannhan!: nannhan[];
}

