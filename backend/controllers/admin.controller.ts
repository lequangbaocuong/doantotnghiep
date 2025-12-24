import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { canbo } from '../entity/canbo';
import { nguoidan } from '../entity/nguoidan';
import { vaitro } from '../entity/vaitro';
import * as bcrypt from 'bcryptjs';
import { Not, Equal } from 'typeorm'; 
export const adminController = {
    
    async getAllUsers(req: Request, res: Response) {
        try {
            const canboRepo = AppDataSource.getRepository(canbo);
            const danRepo = AppDataSource.getRepository(nguoidan);

            const [listCanBo, listDan] = await Promise.all([
                canboRepo.find({ relations: ["vaitro"] }), 
                danRepo.find()
            ]);

            const formattedCanBo = listCanBo.map(u => ({
                id: u.id_canbo,
                hoten: u.hoten,
                email: u.email,
                role: u.vaitro ? u.vaitro.mota : "Cán bộ", 
                type: 'canbo',
                id_vaitro: u.vaitro ? u.vaitro.id_vaitro : "",
                cccd: u.cccd,
                sodienthoai: u.sodienthoai,
                diachi: u.diachi,
                gioitinh: u.gioitinh
            }));

            const formattedDan = listDan.map(u => ({
                id: u.id_nguoidan,
                hoten: u.hoten,
                email: u.email,
                role: "Người dân",
                type: 'nguoidan',
                cccd: u.cccd,             
                sodienthoai: u.sodienthoai,
                diachi: u.diachi,
                gioitinh: u.gioitinh
            }));

            return res.json([...formattedCanBo, ...formattedDan]);
        } catch (e) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async createAccount(req: Request, res: Response) {
        try {
            const { hoten, email, cccd, id_vaitro, matkhau } = req.body;
            const repo = AppDataSource.getRepository(canbo);
            
            const existEmail = await repo.findOneBy({ email });
            if (existEmail) return res.status(400).json({ message: "Email đã tồn tại!" });
            
            if (cccd) {
                const existCCCD = await repo.findOneBy({ cccd });
                if (existCCCD) return res.status(400).json({ message: "CCCD đã tồn tại!" });
            }

            const lastCanbo = await repo.find({
                order: { id_canbo: 'DESC' },
                take: 1
            });

            let newId = 'CB0001'; 

            if (lastCanbo.length > 0) {
                const lastId = lastCanbo[0].id_canbo; 
                
                const numberPart = parseInt(lastId.substring(2)); 
                
                if (!isNaN(numberPart)) {
                    const nextNumber = numberPart + 1;
                    newId = `CB${nextNumber.toString().padStart(4, '0')}`;
                }
            }

            if (newId.length > 6) {
                return res.status(500).json({ message: "Hệ thống đã hết kho số ID (Vượt quá CB9999)" });
            }
            const matkhaubandau = matkhau || "123456"; 
            const salt = await bcrypt.genSalt(10);     
            const matkhaumahoa = await bcrypt.hash(matkhaubandau, salt);

            const newAcc = repo.create({
                id_canbo: newId, 
                hoten, email, cccd, 
                matkhau: matkhaumahoa, 
                id_vaitro,
                ngaysinh: new Date(), 
                gioitinh: "khác"
            });

            await repo.save(newAcc);
            return res.json({ message: "Cấp tài khoản thành công!", data: newAcc });

        } catch (e) { 
            console.error(e);
            return res.status(500).json({ message: "Lỗi tạo tài khoản" }); 
        }
    },

    async getRoles(req: Request, res: Response) {
        const roles = await AppDataSource.getRepository(vaitro).find();
        return res.json(roles);
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const { id, type } = req.params; 
            if (type === 'canbo') {
                await AppDataSource.getRepository(canbo).delete(id);
            } else {
                await AppDataSource.getRepository(nguoidan).delete(id);
            }
            return res.json({ message: "Đã xóa người dùng" });
        } catch (e) { return res.status(500).json({ message: "Lỗi xóa" }); }
    },

    async createCitizenAccount(req: Request, res: Response) {
        try {
            const { hoten, email, cccd, sodienthoai, diachi, matkhau } = req.body;
            const repo = AppDataSource.getRepository(nguoidan);

            if (!/^\d{12}$/.test(cccd)) {
                return res.status(400).json({ message: "Số CCCD không hợp lệ! Vui lòng nhập đúng 12 chữ số." });
            }

            const existEmail = await repo.findOneBy({ email });
            if (existEmail) return res.status(400).json({ message: "Email đã tồn tại!" });
            
            const existCCCD = await repo.findOneBy({ cccd });
            if (existCCCD) return res.status(400).json({ message: "Số CCCD này đã được đăng ký!" });

            const lastUser = await repo.find({ order: { id_nguoidan: "DESC" }, take: 1 });
            let newId = "ND0001";
            if (lastUser.length > 0 && lastUser[0].id_nguoidan.startsWith("ND")) {
                const num = parseInt(lastUser[0].id_nguoidan.substring(2));
                if (!isNaN(num)) newId = `ND${(num + 1).toString().padStart(4, "0")}`;
            }

            const matkhaubandau = matkhau || "123456"; 
            const salt = await bcrypt.genSalt(10);
            const matkhaumahoa = await bcrypt.hash(matkhaubandau, salt);

            const newAcc = repo.create({
                id_nguoidan: newId,
                hoten, email, cccd, sodienthoai, diachi,
                matkhau: matkhaumahoa,
                gioitinh: "khác",
                lan_dau_dang_nhap: true
            });

            await repo.save(newAcc);
            return res.json({ message: "Cấp tài khoản người dân thành công!", data: newAcc });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Lỗi server khi tạo tài khoản" });
        }
    },

    async updateCitizenAccount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { hoten, email, cccd, sodienthoai, diachi, gioitinh } = req.body;
            const repo = AppDataSource.getRepository(nguoidan);

            const user = await repo.findOneBy({ id_nguoidan: id });
            if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng!" });

            if (cccd && cccd !== user.cccd) {
                if (!/^\d{12}$/.test(cccd)) return res.status(400).json({ message: "CCCD phải đủ 12 số!" });
                
                const existCCCD = await repo.findOne({ where: { cccd: cccd, id_nguoidan: Not(Equal(id)) } });
                if (existCCCD) return res.status(400).json({ message: "CCCD này đã thuộc về người khác!" });
                
                user.cccd = cccd;
            }

            if (email && email !== user.email) {
                const existEmail = await repo.findOne({ where: { email: email, id_nguoidan: Not(Equal(id)) } });
                if (existEmail) return res.status(400).json({ message: "Email này đã thuộc về người khác!" });
                user.email = email;
            }

            if (hoten) user.hoten = hoten;
            if (sodienthoai) user.sodienthoai = sodienthoai;
            if (diachi) user.diachi = diachi;
            if (gioitinh) user.gioitinh = gioitinh;

            await repo.save(user);

            return res.json({ message: "Cập nhật thông tin thành công!", data: user });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Lỗi server khi cập nhật" });
        }
    },

    async updateOfficerAccount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { 
                hoten, email, cccd, sodienthoai, diachi, 
                gioitinh, ngaysinh, id_vaitro, matkhau 
            } = req.body;
            
            const repo = AppDataSource.getRepository(canbo);
            const user = await repo.findOneBy({ id_canbo: id });

            if (!user) return res.status(404).json({ message: "Không tìm thấy cán bộ!" });

            if (email && email !== user.email) {
                const exist = await repo.findOne({ where: { email, id_canbo: Not(Equal(id)) } });
                if (exist) return res.status(400).json({ message: "Email đã tồn tại!" });
                user.email = email;
            }

            if (cccd && cccd !== user.cccd) {
                if (!/^\d{12}$/.test(cccd)) return res.status(400).json({ message: "CCCD phải đủ 12 số!" });
                const exist = await repo.findOne({ where: { cccd, id_canbo: Not(Equal(id)) } });
                if (exist) return res.status(400).json({ message: "CCCD đã tồn tại!" });
                user.cccd = cccd;
            }

            if (matkhau) {
                const salt = await bcrypt.genSalt(10);
                user.matkhau = await bcrypt.hash(matkhau, salt);
            }

            if (hoten) user.hoten = hoten;
            if (sodienthoai) user.sodienthoai = sodienthoai;
            if (diachi) user.diachi = diachi;
            if (gioitinh) user.gioitinh = gioitinh;
            if (id_vaitro) user.id_vaitro = id_vaitro; 
            if (ngaysinh) user.ngaysinh = new Date(ngaysinh);

            await repo.save(user);
            return res.json({ message: "Cập nhật cán bộ thành công!", data: user });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Lỗi server khi cập nhật cán bộ" });
        }
    }
};