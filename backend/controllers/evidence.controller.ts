import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { chungcu,LoaiChungCu } from '../entity/chungcu';
import { generateId } from '../utils/idrgenerate.util';

export const evidenceController = {
    
    async submitEvidence(req: Request, res: Response) {
        try {
            const { id_vuan, mota, loaichungcu, id_nguoidan } = req.body;
            
            const files = req.files as Express.Multer.File[];

            if (!id_vuan) {
                return res.status(400).json({ message: "Thiếu thông tin vụ án!" });
            }
            if (!files || files.length === 0) {
                return res.status(400).json({ message: "Vui lòng đính kèm ít nhất một tệp chứng cứ!" });
            }

            const repo = AppDataSource.getRepository(chungcu);
            const evidenceEntities = [];

            for (const file of files) {
                const newId = generateId('CC'); 

                const newEvidence = repo.create({
                    id_chungcu: newId,
                    id_vuan,
                    id_nguoidan: id_nguoidan || null,
                    loaichungcu: (loaichungcu || 'vật lý') as LoaiChungCu,
                    mota: mota || 'Chứng cứ bổ sung',
                    duongdantaptin: file.path, 
                    ngaygui: new Date()
                });

                evidenceEntities.push(newEvidence);
            }

            const savedEvidences = await repo.save(evidenceEntities);

            return res.status(201).json({ 
                success: true, 
                message: `Đã gửi ${savedEvidences.length} chứng cứ thành công!`,
                data: savedEvidences
            });

        } catch (error: any) {
            console.error("Lỗi gửi chứng cứ:", error);
            const msg = error.sqlMessage || error.message || "Lỗi server";
            return res.status(500).json({ message: msg });
        }
    }
};