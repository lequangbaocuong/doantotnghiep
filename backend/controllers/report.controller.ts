// file: report.controller.ts (ví dụ)
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { nguoidan, GioiTinh } from '../entity/nguoidan';
import { dontogiac, LoaiToGiac } from '../entity/dontogiac';
import { chungcu, LoaiChungCu } from '../entity/chungcu';
import { generateId } from '../utils/idreport.util';

// Ánh xạ mức độ nghiêm trọng từ frontend (tiếng Việt) sang enum của backend
const severityMap: { [key: string]: LoaiToGiac } = {
    'Nhẹ': 'ít nghiêm trọng',
    'Vừa': 'nghiêm trọng',
    'Nghiêm trọng': 'rất nghiêm trọng',
    // Giả định 'Rất Nghiêm trọng' / 'Đặc biệt nghiêm trọng' cũng có thể được thêm vào
};

export const reportController = {
    async submitReport(req: Request, res: Response) {
        try {
            // Dữ liệu từ ReportStep1, ReportStep2 được gửi qua body
            const {
                fullname, email, phone, address, cccd, gender, relation, anonymous,
                crimeType, severity, datetime, location, description, evidenceType,
            } = req.body;
            
            // Files được upload qua middleware 'uploadEvidence'
            const uploadedFiles = req.files as Express.Multer.File[];
            
            const nguoidanRepo = getRepository(nguoidan);
            const dontogiacRepo = getRepository(dontogiac);
            const chungcuRepo = getRepository(chungcu);
            
            let nguoidanId: string | null = null;
            
            // 1. Xử lý thông tin người gửi
            if (!anonymous) {
                let user = await nguoidanRepo.findOne({ where: { cccd } });

                if (!user) {
                    // Tạo người dân mới nếu chưa tồn tại
                    user = nguoidanRepo.create({
                        id_nguoidan: generateId('ND'),
                        cccd: cccd,
                        matkhau: 'DefaultPassword', // Cần xử lý mã hóa trong thực tế
                        hoten: fullname,
                        sodienthoai: phone,
                        email: email,
                        gioitinh: gender as GioiTinh,
                        diachi: address,
                        anh: '', // Cần thêm logic upload ảnh đại diện nếu có
                    });
                    await nguoidanRepo.save(user);
                }
                nguoidanId = user.id_nguoidan;
            }

            // 2. Tạo đơn tố giác
            const newToGiac = dontogiacRepo.create({
                id_togiac: generateId('DT'),
                tieude: `Tố giác về ${crimeType} tại ${location}`, // Tạo tiêu đề mặc định
                noidung: description,
                loai: severityMap[severity] || 'ít nghiêm trọng',
                andanh: anonymous === 'true' ? true : false, // Chuyển string 'true'/'false' thành boolean
                ngaygui: new Date(),
                ngayxayra: new Date(datetime),
                diachivuviec: location,
                id_nguoidan: nguoidanId,
            });
            const savedToGiac = await dontogiacRepo.save(newToGiac);

            // 3. Xử lý bằng chứng (files)
            if (uploadedFiles && uploadedFiles.length > 0) {
                const chungcuEntities = uploadedFiles.map(file => {
                    return chungcuRepo.create({
                        id_chungcu: generateId('CC'),
                        duongdantaptin: file.path, // Đường dẫn file đã lưu trên server
                        loaichungcu: evidenceType as LoaiChungCu,
                        mota: `Bằng chứng cho tố giác ID: ${savedToGiac.id_togiac}`,
                        ngaygui: new Date(),
                        id_nguoidan: nguoidanId,
                        // Cần thêm trường id_togiac vào chungcu entity nếu muốn liên kết trực tiếp
                    });
                });
                await chungcuRepo.save(chungcuEntities);
            }

            return res.status(201).json({ 
                message: 'Tố giác đã được gửi thành công!', 
                id_togiac: savedToGiac.id_togiac 
            });

        } catch (error) {
            console.error('Lỗi khi gửi tố giác:', error);
            return res.status(500).json({ 
                message: 'Có lỗi xảy ra trong quá trình xử lý tố giác.' 
            });
        }
    }
};