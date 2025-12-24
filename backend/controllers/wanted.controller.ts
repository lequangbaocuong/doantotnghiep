import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { truyna, MucDo, GioiTinh } from '../entity/truyna';
import { generateId } from '../utils/idrgenerate.util';

export const truynaController = {
    async create(req: Request, res: Response) {
        try {
            const {
                hoten, tuoi, gioitinh, toidanh, mucdo, diachi, mota, id_canbo,
                anh_hien_co
            } = req.body;

            const file = req.file;

            let imagePath = '';
            if (file) {
                imagePath = `/uploads/evidences/${file.filename}`;
            } else if (anh_hien_co) {
                imagePath = anh_hien_co;
            }

            const truynaRepo = AppDataSource.getRepository(truyna);

            const newTruyNa = truynaRepo.create({
                id_truyna: generateId('TN'),
                hoten,
                tuoi: parseInt(tuoi),
                gioitinh: gioitinh as GioiTinh,
                toidanh,
                mucdo: mucdo as MucDo,
                diachi,
                mota,
                anh: imagePath, 
                trangthai: "chờ duyệt",
                id_canbo: id_canbo
            });

            await truynaRepo.save(newTruyNa);

            return res.status(201).json({
                success: true,
                message: "Đăng tải lệnh truy nã thành công, vui lòng chờ duyệt!",
                data: newTruyNa
            });

        } catch (error) {
            console.error("Lỗi đăng tải truy nã:", error);
            return res.status(500).json({ message: "Lỗi server khi đăng tải truy nã" });
        }
    },

    async getPending(req: Request, res: Response) {
        try {
            const truynaRepo = AppDataSource.getRepository(truyna);
            
            const list = await truynaRepo.find({
                where: { trangthai: 'chờ duyệt' },
                order: { id_truyna: 'DESC' } 
            });

            return res.status(200).json(list);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    },

    async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { trangthai } = req.body; 

            if (!['đã duyệt', 'từ chối'].includes(trangthai)) {
                return res.status(400).json({ message: "Trạng thái không hợp lệ" });
            }

            const truynaRepo = AppDataSource.getRepository(truyna);
            const notice = await truynaRepo.findOneBy({ id_truyna: id });

            if (!notice) {
                return res.status(404).json({ message: "Không tìm thấy lệnh truy nã" });
            }

            notice.trangthai = trangthai;
            notice.ngayduyet = new Date(); 

            await truynaRepo.save(notice);

            return res.status(200).json({ 
                success: true, 
                message: `Đã cập nhật trạng thái thành: ${trangthai}` 
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server khi duyệt" });
        }
    },

    async getPublicList(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(truyna);
            const list = await repo.find({
                where: { trangthai: 'đã duyệt' }, 
                order: { ngayduyet: 'DESC' },     
                take: 6                          
            });
            return res.json(list);
        } catch (e) { return res.status(500).json({ message: "Lỗi lấy dữ liệu" }); }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await AppDataSource.getRepository(truyna).delete(id);
            return res.json({ message: "Đã xóa bài đăng truy nã" });
        } catch (e) { return res.status(500).json({ message: "Lỗi xóa bài" }); }
    },

    async getApproved(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(truyna);
            const list = await repo.find({
                where: { trangthai: 'đã duyệt' }, 
                order: { ngayduyet: 'DESC' },     
                take: 6                           
            });
            return res.json(list);
        } catch (e) { return res.status(500).json({ message: "Lỗi lấy dữ liệu" }); }
    },

    async getAllWanted(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(truyna);
            const list = await repo.find({
                order: { ngayduyet: 'DESC' }
            });
            return res.json(list);
        } catch (e) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async deleteWanted(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const repo = AppDataSource.getRepository(truyna);
            await repo.delete(id);
            return res.json({ message: "Đã xóa bài đăng!" });
        } catch (e) { return res.status(500).json({ message: "Lỗi xóa" }); }
    }
};