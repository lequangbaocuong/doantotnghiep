import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { nghipham } from '../entity/nghipham';


export const suspectController = {
    async addSuspect(req: Request, res: Response) {
        try {
            const {
                id_vuan, 
                hoten,
                gioitinh,
                ngaysinh,
                cccd,
                tinhtrangbatgiu,
                diachi
            } = req.body;

            const file = req.file;
            let anhPath = '';
            if (file) {
                anhPath = file.path;
            }
            if (!id_vuan || !hoten) {
                return res.status(400).json({ message: "Thiếu thông tin bắt buộc (Mã vụ án, Họ tên)" });
            }
            
            let validNgaySinh = null;
            
            if (ngaysinh && ngaysinh.toString().trim() !== "") {
                const cleanDate = ngaysinh.toString().trim();
                
                // Trường hợp 1: Chỉ nhập năm (VD: "1995")
                if (cleanDate.length === 4) {
                    validNgaySinh = `${cleanDate}-01-01`; 
                } 
                // Trường hợp 2: Nhập đầy đủ ngày tháng (VD: "1995-12-25")
                else {
                    validNgaySinh = cleanDate;
                }
            }

            const suspectRepo = AppDataSource.getRepository(nghipham);

            const lastSuspect = await suspectRepo.find({
                order: { id_nghipham: "DESC" },
                take: 1
            });

            let newId = "NP0001";

            if (lastSuspect.length > 0) {
                const lastId = lastSuspect[0].id_nghipham;
                if (lastId.startsWith("NP")) {
                    const numberPart = parseInt(lastId.substring(2));
                    if (!isNaN(numberPart)) {
                        newId = `NP${(numberPart + 1).toString().padStart(4, "0")}`;
                    }
                }
            }

            const newSuspect = suspectRepo.create({
                id_nghipham: newId, 
                id_vuan,
                hoten,
                gioitinh,
                ngaysinh: validNgaySinh,
                cccd,
                tinhtrangbatgiu,
                diachi,
                anh: anhPath
            });

            await suspectRepo.save(newSuspect);

            return res.status(201).json({
                success: true,
                message: "Đã thêm nghi phạm vào hồ sơ vụ án!",
                data: newSuspect
            });

        } catch (error) {
            console.error("Lỗi thêm nghi phạm:", error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    },
    
    async getSuspectsByCase(req: Request, res: Response) {
        try {
            const { id_vuan } = req.params;
            const suspectRepo = AppDataSource.getRepository(nghipham);
            
            const suspects = await suspectRepo.find({
                where: { id_vuan: id_vuan }
            });
            
            return res.status(200).json(suspects);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi lấy danh sách nghi phạm" });
        }
    },

    async getDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const suspectRepo = AppDataSource.getRepository(nghipham);

            const suspect = await suspectRepo.findOne({
                where: { id_nghipham: id },
                relations: ["hosovuan"] 
            });

            if (!suspect) {
                return res.status(404).json({ message: "Không tìm thấy nghi phạm" });
            }

            return res.status(200).json(suspect);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    },

    async updateSuspect(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                hoten,
                gioitinh,
                ngaysinh,
                cccd,
                tinhtrangbatgiu,
                diachi
            } = req.body;

            const suspectRepo = AppDataSource.getRepository(nghipham);
            const suspect = await suspectRepo.findOneBy({ id_nghipham: id });

            if (!suspect) {
                return res.status(404).json({ message: "Không tìm thấy nghi phạm" });
            }

            if (req.file) {
                suspect.anh = req.file.path || `/uploads/evidences/${req.file.filename}`;
            }
            suspect.hoten = hoten || suspect.hoten;
            suspect.gioitinh = gioitinh || suspect.gioitinh;
            suspect.cccd = cccd || suspect.cccd;
            suspect.tinhtrangbatgiu = tinhtrangbatgiu || suspect.tinhtrangbatgiu;
            suspect.diachi = diachi || suspect.diachi;

            if (ngaysinh !== undefined && ngaysinh !== null) {
                if (ngaysinh.toString().trim() === "") {
                    suspect.ngaysinh = null;
                } 
                else {
                    const cleanDate = ngaysinh.toString().trim();
                    if (cleanDate.length === 4) {
                        suspect.ngaysinh = `${cleanDate}-01-01`; 
                    } 
                    else {
                        suspect.ngaysinh = cleanDate;
                    }
                }
            }

            await suspectRepo.save(suspect);

            return res.status(200).json({
                success: true,
                message: "Cập nhật thông tin nghi phạm thành công!",
                data: suspect
            });

        } catch (error) {
            console.error("Lỗi cập nhật nghi phạm:", error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }
};