import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { chungcu } from '../entity/chungcu';
import { generateId } from '../utils/idrgenerate.util';

export const evidenceController = {
    
    async submitEvidence(req: Request, res: Response) {
        try {
            const { id_vuan, mota, loaichungcu, id_nguoidan } = req.body;
            const files = req.files as Express.Multer.File[];

            if (!id_vuan) {
                return res.status(400).json({ message: "Thiếu thông tin vụ án hoặc file đính kèm!" });
            }
            if (!files || files.length === 0) {
                return res.status(400).json({ message: "Vui lòng đính kèm ít nhất một tệp chứng cứ!" });
            }

            const repo = AppDataSource.getRepository(chungcu);
            const savedEvidences = [];

            for (const file of files) {
                const newEvidence = repo.create({
                    id_chungcu: generateId('CC'),
                    id_vuan,
                    mota,
                    loaichungcu: loaichungcu || 'tài liệu',
                    duongdantaptin: file.path, 
                    ngaygui: new Date(),
                    id_nguoidan: id_nguoidan || null 
                });

                const saved = await repo.save(newEvidence);
                savedEvidences.push(saved);
            }

            return res.status(201).json({ 
                success: true, 
                message: `Đã gửi ${savedEvidences.length} chứng cứ thành công!`,
                data: savedEvidences
            });

        } catch (error) {
            console.error("Lỗi gửi chứng cứ:", error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }
};