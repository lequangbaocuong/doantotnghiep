import { AppDataSource } from "../configs/data-source"; 
import { canbo } from "../entity/canbo";
import { vaitro } from "../entity/vaitro";
import * as bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    console.log("🔄 Đang kết nối Database...");
    await AppDataSource.initialize();
    console.log("✅ Kết nối thành công!");

    const canboRepo = AppDataSource.getRepository(canbo);
    const vaitroRepo = AppDataSource.getRepository(vaitro);

    let roleAdmin = await vaitroRepo.findOneBy({ id_vaitro: "VT001" });
    if (!roleAdmin) {
      console.log("🛠  Đang tạo vai trò Admin...");
      roleAdmin = vaitroRepo.create({
        id_vaitro: "VT001",
        mota: "Quản trị viên hệ thống",
      });
      await vaitroRepo.save(roleAdmin);
    }

    const email = "admin@gmail.com";
    const passwordRaw = "123456";
 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordRaw, salt);

    let adminUser = await canboRepo.findOneBy({ email });

    if (adminUser) {
      console.log("🔄 Tài khoản Admin đã tồn tại. Đang reset mật khẩu...");
      adminUser.matkhau = hashedPassword;
      adminUser.id_vaitro = "VT001";
      await canboRepo.save(adminUser);
      console.log(`✅ Đã reset mật khẩu Admin về: ${passwordRaw}`);
    } else {
      console.log("🆕 Đang tạo tài khoản Admin mới...");
      const newAdmin = canboRepo.create({
        id_canbo: "CB0000", 
        hoten: "Admin",
        email: email,
        cccd: "000000000000",
        sodienthoai: "0900000000",
        gioitinh: "khác", 
        ngaysinh: new Date(),
        matkhau: hashedPassword,
        id_vaitro: "VT001",
        diachi: "Hệ thống",
        anh: "" 
      });
      await canboRepo.save(newAdmin);
      console.log(`✅ Đã tạo Admin: ${email} / Pass: ${passwordRaw}`);
    }

    await AppDataSource.destroy();
    process.exit(0);

  } catch (error) {
    console.error("❌ Lỗi khi chạy Seed:", error);
    process.exit(1);
  }
};

seedAdmin();