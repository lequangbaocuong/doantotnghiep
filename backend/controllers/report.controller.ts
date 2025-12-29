import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source'; 
import { nguoidan, GioiTinh } from '../entity/nguoidan';
import { dontogiac, LoaiToiPham, VaiTroNguoiDan } from '../entity/dontogiac';
import { chungcu, LoaiChungCu } from '../entity/chungcu';
import { generateId } from '../utils/idrgenerate.util';
import { nannhan, TinhTrangNanNhan } from '../entity/nannhan';

export const reportController = {
    async submitReport(req: Request, res: Response) {
        try {
            const {
                // Info người gửi (từ Token/Form)
                hoten, email, sodienthoai, diachi, cccd, gioitinh,
                
                // Info đơn tố giác
                loaitoipham, vaitronguoidan, tieude, noidung, diachivuviec, ngayxayra, andanh,
                loaichungcu, tinhtrang,

                // --- DỮ LIỆU GỬI HỘ (TIẾNG VIỆT) ---
                guiHo, // thay cho isGuarded
                tenNanNhan, 
                sdtNanNhan, 
                diachiNanNhan, 
                gioitinhNanNhan, 
                tinhtrangNanNhan
            } = req.body;
            
            const uploadedFiles = req.files as Express.Multer.File[];
            
            const nguoidanRepo = AppDataSource.getRepository(nguoidan);
            const dontogiacRepo = AppDataSource.getRepository(dontogiac);
            const chungcuRepo = AppDataSource.getRepository(chungcu);
            const nannhanRepo = AppDataSource.getRepository(nannhan);

            // 1. XỬ LÝ NGƯỜI BÁO TIN (Giữ nguyên logic cũ)
            let nguoidanId: string | null = null;
            let user = await nguoidanRepo.findOne({ where: { cccd } });

            if (!user) {
                const lastUser = await nguoidanRepo.find({ order: { id_nguoidan: "DESC" }, take: 1 });
                let newId = "ND0001";
                if (lastUser.length > 0 && lastUser[0].id_nguoidan.startsWith("ND")) {
                   // ... logic tạo ID
                   const numberPart = parseInt(lastUser[0].id_nguoidan.substring(2)); 
                   if (!isNaN(numberPart)) newId = `ND${(numberPart + 1).toString().padStart(4, "0")}`;
                }
                user = nguoidanRepo.create({
                    id_nguoidan: newId, cccd, hoten, sodienthoai, email,
                    gioitinh: gioitinh as GioiTinh, diachi, matkhau: '123456', anh: '', lan_dau_dang_nhap: true
                });
                await nguoidanRepo.save(user);
            }
            nguoidanId = user.id_nguoidan;

            // 2. XỬ LÝ NẠN NHÂN (Victim)
            if (vaitronguoidan === 'nạn nhân' || vaitronguoidan === 'đại diện') {
                
                const lastVictim = await nannhanRepo.find({ order: { id_nannhan: "DESC" }, take: 1 });
                let newVictimId = "NN0001";
                if (lastVictim.length > 0 && lastVictim[0].id_nannhan.startsWith("NN")) {
                    const num = parseInt(lastVictim[0].id_nannhan.substring(2));
                    if (!isNaN(num)) newVictimId = `NN${(num + 1).toString().padStart(4, "0")}`;
                }

                // CHUẨN BỊ DỮ LIỆU
                let _ten = hoten; 
                let _sdt = sodienthoai;
                let _dc = diachi;
                let _gt = gioitinh;
                let _tt = tinhtrang || tinhtrangNanNhan || 'còn sống';

                // NẾU GỬI HỘ -> LẤY DỮ LIỆU TỪ CÁC BIẾN TIẾNG VIỆT MỚI
                if (vaitronguoidan === 'đại diện' && String(guiHo) === 'true') {
                    _ten = tenNanNhan;
                    _sdt = sdtNanNhan;
                    _dc = diachiNanNhan;
                    _gt = gioitinhNanNhan;
                    _tt = tinhtrangNanNhan;
                }

                const newVictim = nannhanRepo.create({
                    id_nannhan: newVictimId,
                    hovaten: _ten,         
                    sodienthoai: _sdt, 
                    gioitinh: _gt as GioiTinh,    
                    diachi: _dc,        
                    tinhtrang: _tt as TinhTrangNanNhan,
                });
                await nannhanRepo.save(newVictim);
            }

            // 3. TẠO ĐƠN (Giữ nguyên)
            const newToGiac = dontogiacRepo.create({
                id_togiac: generateId('DT'),
                id_nguoidan: nguoidanId,
                tieude, noidung,
                loaitoipham: loaitoipham as LoaiToiPham,
                vaitronguoidan: vaitronguoidan as VaiTroNguoiDan,
                andanh: String(andanh) === '1' || String(andanh) === 'true',
                trangthai: 'chưa xử lý',
                ngaygui: new Date(),
                ngayxayra, diachivuviec
            });
            const savedToGiac = await dontogiacRepo.save(newToGiac);

            // 4. LƯU CHỨNG CỨ (Giữ nguyên)
            if (uploadedFiles && uploadedFiles.length > 0) {
                const chungcuEntities = uploadedFiles.map(file => {
                    return chungcuRepo.create({
                        id_chungcu: generateId('CC'),
                        id_nguoidan: nguoidanId,
                        duongdantaptin: file.path || `/uploads/evidences/${file.filename}`, 
                        loaichungcu: loaichungcu as LoaiChungCu,
                        mota: `Chứng cứ thuộc đơn tố giác mã số: ${savedToGiac.id_togiac}`,
                        ngaygui: new Date(),
                        id_vuan: undefined 
                    });
                });
                await chungcuRepo.save(chungcuEntities);
            }

            return res.status(200).json({ 
                success: true,
                message: 'Gửi tố giác thành công!', 
                id_togiac: savedToGiac.id_togiac 
            });

        } catch (error) {
            console.error('Lỗi API submit-report:', error);
            return res.status(500).json({ success: false, message: 'Lỗi server.' });
        }
    },
    // Các hàm khác giữ nguyên...
    async getAllReports(req: Request, res: Response) {
         try {
            const reportRepo = AppDataSource.getRepository(dontogiac);
            const reports = await reportRepo.find({ order: { ngaygui: "DESC" } });
            return res.status(200).json(reports);
        } catch (error) { return res.status(500).json({ message: "Lỗi server" }); }
    },

    async getReportDetail(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const reportRepo = AppDataSource.getRepository(dontogiac);
            const report = await reportRepo.findOne({
                where: { id_togiac: id },
                relations: ["nguoidan"] 
            });
            if (!report) return res.status(404).json({ message: "Không tìm thấy" });
            return res.status(200).json(report);
        } catch (error) { return res.status(500).json({ message: "Lỗi server" }); }
    }
};