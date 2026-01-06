import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { ketquavuan } from '../entity/ketquavuan';
import { hosovuan } from '../entity/hosovuan';
import { generateId } from '../utils/idrgenerate.util';

export const resultController = {
    async createReport(req: Request, res: Response) {
        try {
            const { id_vuan, tomtat, dongco, nguoibaocao } = req.body;

            if (!id_vuan) {
                return res.status(400).json({ message: "Thiếu mã vụ án (id_vuan)!" });
            }
            
            const repo = AppDataSource.getRepository(ketquavuan);
            const caseRepo = AppDataSource.getRepository(hosovuan);

            const exist = await repo.findOneBy({ id_vuan });
            if (exist) return res.status(400).json({ message: "Vụ án này đã có báo cáo kết luận!" });

            const newReport = repo.create({
                id_ketqua: generateId('KQ'),
                id_vuan,
                tomtat,
                dongco,
                nguoibaocao: nguoibaocao || "Cán bộ điều tra",
                thoigianbaocao: new Date(),
                trangthai: "chờ duyệt"
            });

            await repo.save(newReport);
            
            await caseRepo.update(id_vuan, { trangthai: "Chờ kết luận" });

            return res.json({ message: "Đã gửi kết luận điều tra, chờ thủ trưởng phê duyệt." });
        } catch (e) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async getPendingReports(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(ketquavuan);
            const list = await repo.find({
                where: { trangthai: "chờ duyệt" },
                relations: ["vuan"] 
            });
            return res.json(list);
        } catch (e) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async approveReport(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { trangthai } = req.body; 
            
            const repo = AppDataSource.getRepository(ketquavuan);
            const caseRepo = AppDataSource.getRepository(hosovuan);

            const report = await repo.findOneBy({ id_ketqua: id });
            if (!report) return res.status(404).json({ message: "Không tìm thấy báo cáo" });

            report.trangthai = trangthai;
            await repo.save(report);

            if (trangthai === 'đã duyệt') {
                await caseRepo.update(report.id_vuan, { trangthai: "Kết thúc" });
            } else {
                await caseRepo.update(report.id_vuan, { trangthai: "Đang điều tra" });
            }

            return res.json({ message: "Đã cập nhật quyết định!" });
        } catch (e) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async getReportByCase(req: Request, res: Response) {
        try {
            const { id_vuan } = req.params;
            const repo = AppDataSource.getRepository(ketquavuan);
            const report = await repo.findOneBy({ id_vuan });
            return res.json(report || null);
        } catch (e) { return res.status(500).json({ message: "Lỗi server" }); }
    }
};