import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { kehoachdieutra } from '../entity/kehoachdieutra';
import { nhiemvudieutra } from '../entity/nhiemvudieutra';
import { generateId } from '../utils/idrgenerate.util';

export const assignmentController = {
    async getPlansByCase(req: Request, res: Response) {
        try {
            const { id_vuan } = req.params;
            const repo = AppDataSource.getRepository(kehoachdieutra);
            const plans = await repo.find({ 
                where: { id_vuan },
                order: { ngaytao: "DESC" }
            });
            return res.json(plans);
        } catch (e) { return res.status(500).json({ message: "Lỗi lấy kế hoạch" }); }
    },

    async createPlan(req: Request, res: Response) {
        try {
            const { id_vuan, noidung, thoihan } = req.body;
            const repo = AppDataSource.getRepository(kehoachdieutra);
            const newPlan = repo.create({
                id_kehoach: generateId('KH'),
                id_vuan, noidung, thoihan,
                ngaytao: new Date(),
                trangthai: "đã duyệt"
            });
            await repo.save(newPlan);
            return res.json({ message: "Tạo kế hoạch thành công", data: newPlan });
        } catch (e) { return res.status(500).json({ message: "Lỗi tạo kế hoạch" }); }
    },

    async getTasksByPlan(req: Request, res: Response) {
        try {
            const { id_kehoach } = req.params;
            const repo = AppDataSource.getRepository(nhiemvudieutra);
            const tasks = await repo.find({ 
                where: { id_kehoach },
                relations: ["canbo"] 
            });
            return res.json(tasks);
        } catch (e) { return res.status(500).json({ message: "Lỗi lấy nhiệm vụ" }); }
    },

    async createTask(req: Request, res: Response) {
        try {
            const { id_kehoach, tennhiemvu, noidung, ngaybatdau, ngayketthuc, id_canbo } = req.body;
            const repo = AppDataSource.getRepository(nhiemvudieutra);
            const newTask = repo.create({
                id_nhiemvu: generateId('NV'),
                id_kehoach, 
                tennhiemvu, noidung, 
                ngaybatdau, ngayketthuc,
                id_canbo, 
                trangthai: "đã giao"
            });
            await repo.save(newTask);
            return res.json({ message: "Giao nhiệm vụ thành công", data: newTask });
        } catch (e) { return res.status(500).json({ message: "Lỗi giao nhiệm vụ" }); }
    },

    async getMyTasks(req: Request, res: Response) {
        try {
            const id_canbo = (req as any).userPayload?.id_canbo || (req as any).user?.id_canbo;

            if (!id_canbo) {
                return res.status(401).json({ message: "Không xác định được danh tính cán bộ" });
            }

            const taskRepo = AppDataSource.getRepository(nhiemvudieutra);
            
            const tasks = await taskRepo.find({
                where: { id_canbo: id_canbo },
                relations: ['kehoach', 'kehoach.hosovuan'], 
                order: { ngaybatdau: 'DESC' }
            });

            return res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server khi lấy danh sách nhiệm vụ" });
        }
    }
};