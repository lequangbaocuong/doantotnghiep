import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { hosovuan } from '../entity/hosovuan';
import { dontogiac } from '../entity/dontogiac';
import { generateId } from '../utils/idrgenerate.util';
import { canbo } from '../entity/canbo';
import { chungcu } from '../entity/chungcu';
import { nannhan } from '../entity/nannhan';
import { Like } from 'typeorm';

export const caseController = {

    async createCase(req: Request, res: Response) {
        try {
            const {
                tenvuan,
                mota,
                nguoitao, 
                mucdo,
                id_togiac, 
                id_canbo,
                trangthai
            } = req.body;

            const nannhanRepo = AppDataSource.getRepository(nannhan);
            const caseRepo = AppDataSource.getRepository(hosovuan);
            const reportRepo = AppDataSource.getRepository(dontogiac);
            const evidenceRepo = AppDataSource.getRepository(chungcu);

            const newCase = caseRepo.create({
                id_vuan: generateId('VA'),
                tenvuan,
                mota,
                nguoitao: nguoitao || "Admin",
                ngaytao: new Date(),
                trangthai: trangthai || "Đang điều tra",
                mucdo, 
                id_togiac: id_togiac || null,
                id_canbo: id_canbo || null
            });

            const savedCase = await caseRepo.save(newCase);

            if (id_togiac) {
                await reportRepo.update(id_togiac, { 
                    trangthai: "đang xử lý"
                });

                await evidenceRepo.update(
                    { mota: Like(`%${id_togiac}%`) }, 
                    { id_vuan: savedCase.id_vuan }
                )
                await nannhanRepo.update(
                    { id_togiac: id_togiac }, 
                    { id_vuan: savedCase.id_vuan }
                );
            }

            return res.status(201).json({
                success: true,
                message: "Tạo hồ sơ vụ án thành công (Đã đồng bộ chứng cứ)!",
                data: savedCase
            });

        } catch (error) {
            console.error("Lỗi tạo vụ án:", error);
            return res.status(500).json({ message: "Lỗi server khi tạo vụ án" });
        }
    },

    async getCaseDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const caseRepo = AppDataSource.getRepository(hosovuan);

            const caseDetail = await caseRepo.findOne({
                where: { id_vuan: id },
                relations: ["ds_nghipham", "dontogiac", "canbo", "ds_chungcu", "ds_nannhan"]
            });

            if (!caseDetail) return res.status(404).json({ message: "Không tìm thấy vụ án" });
            return res.status(200).json(caseDetail);

        } catch (error) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async assignOfficer(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const { id_canbo } = req.body; 
            const caseRepo = AppDataSource.getRepository(hosovuan);
            const existingCase = await caseRepo.findOneBy({ id_vuan: id });
            
            if (!existingCase) return res.status(404).json({ message: "Không tìm thấy vụ án!" });

            existingCase.id_canbo = id_canbo;
            await caseRepo.save(existingCase);

            return res.status(200).json({ 
                success: true,
                message: "Phân công điều tra viên thành công!",
                data: existingCase
            });
        } catch (error) { return res.status(500).json({ message: "Lỗi phân công" }); }
    },

    async getAllCases(req: Request, res: Response) {
        try {
            const caseRepo = AppDataSource.getRepository(hosovuan);
            const cases = await caseRepo.find({ order: { ngaytao: "DESC" } });
            
            // Format dữ liệu trả về
            const formattedCases = cases.map(c => ({
                id_vuan: c.id_vuan,
                tenvuan: c.tenvuan,
                mucdo: c.mucdo,
                trangthai: c.trangthai,
                ngaytao: c.ngaytao,
                nguoitao: c.nguoitao || "Admin",
                // Chú ý: Cần join relation dontogiac ở trên nếu muốn lấy loaitoipham
                loaitoipham: "Đang cập nhật", 
                diachi: "Đang cập nhật"
            }));
            
            return res.status(200).json(formattedCases);
        } catch (e) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async getInvestigators(req: Request, res: Response) {
        try {
            const canboRepo = AppDataSource.getRepository(canbo);
            const investigators = await canboRepo.find({
                where: { id_vaitro: 'VT003' },
                select: ['id_canbo', 'hoten', 'email'] 
            });
            return res.status(200).json(investigators);
        } catch (error) { return res.status(500).json({ message: "Lỗi lấy danh sách cán bộ" }); }
    }
};