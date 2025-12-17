import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { chungcu } from '../entity/chungcu';
import { generateId } from '../utils/idreport.util';

export const evidenceController = {
    
    async submitEvidence(req: Request, res: Response) {
        try {
            const { id_vuan, mota, loaichungcu, id_nguoidan } = req.body;
            const file = req.file; 

            if (!id_vuan || !file) {
                return res.status(400).json({ message: "Thiếu thông tin vụ án hoặc file đính kèm!" });
            }

            const repo = AppDataSource.getRepository(chungcu);

            const newEvidence = repo.create({
                id_chungcu: generateId('CC'),
                id_vuan,
                mota,
                loaichungcu: loaichungcu || 'tài liệu',
                duongdantaptin: `/uploads/evidences/${file.filename}`,
                ngaygui: new Date(),
                id_nguoidan: id_nguoidan || null 
            });

            await repo.save(newEvidence);

            return res.status(201).json({ 
                success: true, 
                message: "Gửi chứng cứ thành công! Cảm ơn sự đóng góp của bạn." 
            });

        } catch (error) {
            console.error("Lỗi gửi chứng cứ:", error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }
};