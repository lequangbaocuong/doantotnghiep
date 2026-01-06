CREATE DATABASE DieutraToipham;
USE DieutraToipham;

-- =========================
-- BẢNG VAI TRÒ
-- =========================
CREATE TABLE vaitro (
    id_vaitro VARCHAR(6) PRIMARY KEY,
    mota VARCHAR(255)
);

-- =========================
-- BẢNG NGƯỜI DÂN
-- =========================
CREATE TABLE nguoidan (
    id_nguoidan VARCHAR(6) PRIMARY KEY,
    cccd VARCHAR(12) UNIQUE,
    matkhau VARCHAR(255),
    hoten VARCHAR(100),
    sodienthoai VARCHAR(11),
    gioitinh ENUM('nam', 'nữ', 'khác') DEFAULT 'khác',
    email VARCHAR(50),
    ngaysinh DATE,
    lan_dau_dang_nhap BOOLEAN default true,
    diachi VARCHAR(255),
    anh VARCHAR(255)
);

-- =========================
-- BẢNG CÁN BỘ
-- =========================
CREATE TABLE canbo (
    id_canbo VARCHAR(6) PRIMARY KEY,
    cccd VARCHAR(12) UNIQUE,
    matkhau VARCHAR(255),
    hoten VARCHAR(100),
    sodienthoai VARCHAR(11),
    gioitinh ENUM('nam', 'nữ', 'khác') DEFAULT 'khác',
    email VARCHAR(50),
    ngaysinh DATE,
    id_vaitro VARCHAR(6),
    FOREIGN KEY (id_vaitro) REFERENCES vaitro(id_vaitro)
        ON UPDATE CASCADE ON DELETE SET NULL,
	diachi VARCHAR(255),
    anh VARCHAR(255)
);

-- =========================
-- BẢNG CHỨNG CỨ NGƯỜI DÂN GỬI
-- =========================
CREATE TABLE chungcu (
    id_chungcu VARCHAR(10) PRIMARY KEY,
    id_nguoidan VARCHAR(6),
    duongdantaptin VARCHAR(255),
    loaichungcu ENUM('vật lý','phi vật lý'),
    mota TEXT,
    ngaygui DATETIME,
    FOREIGN KEY (id_nguoidan) REFERENCES nguoidan(id_nguoidan)
        ON UPDATE CASCADE ON DELETE SET NULL
);


-- =========================
-- BẢNG TỐ GIÁC TỘI PHẠM
-- =========================
CREATE TABLE dontogiac (
    id_togiac VARCHAR(10) PRIMARY KEY,
    id_nguoidan VARCHAR(6),
    tieude VARCHAR(255),
    noidung TEXT,
    loaitoipham ENUM('trộm cắp tài sản',
    'liên quan đến ma túy',
    'ảnh hưởng trật tự nơi công cộng',
    'khác'),
    andanh BOOLEAN DEFAULT FALSE,
    trangthai ENUM('chưa xử lý', 'đang xử lý', 'đã xử lý', 'từ chối'),
    ngaygui DATETIME,
    ngayxayra DATE,
    diachivuviec VARCHAR(255),
    FOREIGN KEY (id_nguoidan) REFERENCES nguoidan(id_nguoidan)
        ON UPDATE CASCADE ON DELETE SET NULL,
	vaitronguoidan ENUM('nạn nhân', 'nhân chứng', 'báo hộ')
);

-- =========================
-- BẢNG TRUY NÃ
-- =========================
CREATE TABLE truyna (
    id_truyna VARCHAR(10) PRIMARY KEY,
    hoten VARCHAR(100),
    tuoi INT,
    gioitinh ENUM('nam','nữ','khác'),
    toidanh VARCHAR(255),
    mucdo ENUM('ít nghiêm trọng', 'nghiêm trọng', 'rất nghiêm trọng', 'đặc biệt nghiêm trọng'),
    diachi VARCHAR(255),
    mota TEXT,
    anh VARCHAR(255),
    trangthai VARCHAR(50),
    ngayduyet DATETIME,
    id_canbo VARCHAR(6),
    FOREIGN KEY (id_canbo) REFERENCES canbo(id_canbo)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- =========================
-- BẢNG HỒ SƠ VỤ ÁN
-- =========================
CREATE TABLE hosovuan (
    id_vuan VARCHAR(10) PRIMARY KEY,
    id_togiac VARCHAR(10),
    id_nghipham VARCHAR(10),
    tenvuan VARCHAR(255),
    mota TEXT,
    nguoitao VARCHAR(100),
    ngaytao DATETIME,
    trangthai VARCHAR(50),
    mucdo ENUM('ít nghiêm trọng', 'nghiêm trọng', 'rất nghiêm trọng', 'đặc biệt nghiêm trọng'),
    id_canbo VARCHAR(6),
    id_chungcu VARCHAR(10),
    FOREIGN KEY (id_togiac) REFERENCES dontogiac(id_togiac)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (id_canbo) REFERENCES canbo(id_canbo)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (id_chungcu) REFERENCES chungcu(id_chungcu)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- =========================
-- BẢNG LIÊN KẾT TỐ GIÁC - VỤ ÁN (N-N)
-- =========================
CREATE TABLE togiac_vuan (
    id_togiac VARCHAR(10),
    id_vuan VARCHAR(10),
    PRIMARY KEY (id_togiac, id_vuan),
    FOREIGN KEY (id_togiac) REFERENCES dontogiac(id_togiac)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_vuan) REFERENCES hosovuan(id_vuan)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- =========================
-- BẢNG NGHI PHẠM
-- =========================
CREATE TABLE nghipham (
    id_nghipham VARCHAR(10) PRIMARY KEY,
    id_vuan VARCHAR(10),
    hoten VARCHAR(100),
    gioitinh ENUM('nam','nữ','khác') DEFAULT 'khác',
    ngaysinh DATE,
    cccd VARCHAR(12) UNIQUE,
    tinhtrangbatgiu ENUM('đang bắt giữ', 'đã bắt giữ'),
    FOREIGN KEY (id_vuan) REFERENCES hosovuan(id_vuan)
        ON UPDATE CASCADE ON DELETE SET NULL,
	diachi VARCHAR(255),
    anh VARCHAR(255)
);

-- =========================
-- BẢNG VẬT CHỨNG
-- =========================
CREATE TABLE vatchung (
    id_vatchung VARCHAR(10) PRIMARY KEY,
    id_vuan VARCHAR(10),
    id_nghipham VARCHAR(10),
    mota TEXT,
    loaivatchung VARCHAR(50),
    thoigianthuthap DATETIME,
    FOREIGN KEY (id_vuan) REFERENCES hosovuan(id_vuan)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (id_nghipham) REFERENCES nghipham(id_nghipham)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- =========================
-- BẢNG NẠN NHÂN
-- =========================
CREATE TABLE nannhan (
    id_nannhan VARCHAR(6) PRIMARY KEY,
    id_vuan VARCHAR(10),
    hovaten VARCHAR(50),
    sodienthoai VARCHAR(11),
    gioitinh ENUM('nam','nữ','khác'),
    diachi VARCHAR(255),
    tinhtrang ENUM('còn sống','bị thương','đã chết','mất tích'),
    FOREIGN KEY(id_vuan) REFERENCES hosovuan(id_vuan)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- =========================
-- BẢNG KẾT QUẢ VỤ ÁN
-- =========================
CREATE TABLE ketquavuan (
    id_ketqua VARCHAR(10) PRIMARY KEY,
    id_vuan VARCHAR(10),
    thoigianbaocao DATETIME,
    nguoibaocao VARCHAR(50),
    tomtat TEXT,
    dongco TEXT,
    trangthai VARCHAR(50),
    FOREIGN KEY (id_vuan) REFERENCES hosovuan(id_vuan)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- =========================
-- BẢNG KẾ HOẠCH ĐIỀU TRA
-- =========================
CREATE TABLE kehoachdieutra (
    id_kehoach VARCHAR(10) PRIMARY KEY,
    id_vuan VARCHAR(10),
    thoihan DATE,
    noidung TEXT,
    ketquadieutra TEXT,
    trangthai VARCHAR(50),
    ngaytao DATETIME,
    FOREIGN KEY (id_vuan) REFERENCES hosovuan(id_vuan)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- =========================
-- BẢNG NHIỆM VỤ ĐIỀU TRA
-- =========================
CREATE TABLE nhiemvudieutra (
    id_nhiemvu VARCHAR(10) PRIMARY KEY,
    id_vuan VARCHAR(10),
    tennhiemvu VARCHAR(255),
    noidung TEXT,
    trangthai VARCHAR(50),
    ngaybatdau DATETIME,
    ngayketthuc DATETIME,
    FOREIGN KEY (id_vuan) REFERENCES hosovuan(id_vuan)
        ON UPDATE CASCADE ON DELETE SET NULL
);

use dieutratoipham;
select * from dontogiac;


-- Sửa bảng Chứng cứ & các bảng liên quan
ALTER TABLE chungcu MODIFY COLUMN id_chungcu VARCHAR(10);
ALTER TABLE hosovuan MODIFY COLUMN id_chungcu VARCHAR(10);

-- 1. Tăng độ dài ID cho bảng Đơn Tố Giác
ALTER TABLE dontogiac MODIFY COLUMN id_togiac VARCHAR(10);

-- 2. Tăng độ dài cho các bảng liên quan (Khóa ngoại)
ALTER TABLE hosovuan MODIFY COLUMN id_togiac VARCHAR(10);
ALTER TABLE togiac_vuan MODIFY COLUMN id_togiac VARCHAR(10);

INSERT INTO vaitro (id_vaitro, mota) VALUES
('VT001', 'Admin hệ thống'),
('VT002', 'Trưởng công an phường'),
('VT003', 'Cán bộ điều tra');

INSERT INTO canbo (
    id_canbo, cccd, matkhau, hoten, sodienthoai, gioitinh, email, ngaysinh, id_vaitro, diachi, anh
)
VALUES
('CB001', '012345678901', '123456', 'Nguyễn Văn Minh', '0905123123', 'nam', 'minhca@police.vn', '1985-05-12', 'VT002', 'Sơn Trà - Đà Nẵng', NULL),
('CB002', '098765432109', '123456', 'Trần Thị Hạnh', '0905456789', 'nữ', 'hanhthe@police.vn', '1990-03-20', 'VT003', 'Sơn Trà - Đà Nẵng', NULL),
('CB003', '023456789012', '123456', 'Lê Hoàng Phúc', '0905333444', 'nam', 'phucdt@police.vn', '1993-11-01', 'VT003', 'Sơn Trà - Đà Nẵng', NULL);
INSERT INTO canbo (
    id_canbo, cccd, matkhau, hoten, sodienthoai, gioitinh, email, ngaysinh, id_vaitro, diachi, anh
)
VALUES
('CB004', '021234124214', '123456', 'Tran Vinh', '0924353312', 'nam', 'tranvinh@gmail.com', '1999-12-11', 'VT001',  'Sơn Trà - Đà Nẵng', NULL);


select * from hosovuan;

ALTER TABLE kehoachdieutra MODIFY COLUMN id_kehoach VARCHAR(10);

-- 2. Sửa bảng Nhiệm vụ điều tra (Sửa luôn để tránh lỗi tiếp theo)
ALTER TABLE nhiemvudieutra MODIFY COLUMN id_nhiemvu VARCHAR(10);


SET FOREIGN_KEY_CHECKS = 0;

-- 1. Sửa bảng NHIỆM VỤ ĐIỀU TRA
-- Xóa khóa ngoại cũ liên kết với vụ án
ALTER TABLE nhiemvudieutra DROP FOREIGN KEY nhiemvudieutra_ibfk_1;
ALTER TABLE nhiemvudieutra DROP COLUMN id_vuan;

-- Thêm cột liên kết với Kế hoạch
ALTER TABLE nhiemvudieutra ADD COLUMN id_kehoach VARCHAR(10);
ALTER TABLE nhiemvudieutra ADD CONSTRAINT fk_nhiemvu_kehoach 
FOREIGN KEY (id_kehoach) REFERENCES kehoachdieutra(id_kehoach) 
ON UPDATE CASCADE ON DELETE CASCADE;

-- Thêm cột liên kết với Cán bộ (để phân công)
ALTER TABLE nhiemvudieutra ADD COLUMN id_canbo VARCHAR(6);
ALTER TABLE nhiemvudieutra ADD CONSTRAINT fk_nhiemvu_canbo 
FOREIGN KEY (id_canbo) REFERENCES canbo(id_canbo) 
ON UPDATE CASCADE ON DELETE SET NULL;

-- 2. Đảm bảo độ dài cột ID đã được nới rộng (như đã sửa ở các bước trước)
ALTER TABLE kehoachdieutra MODIFY COLUMN id_kehoach VARCHAR(10);
ALTER TABLE nhiemvudieutra MODIFY COLUMN id_nhiemvu VARCHAR(10);

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;


USE DieutraToipham;

-- Thêm cột id_vuan vào bảng chungcu
ALTER TABLE chungcu ADD COLUMN id_vuan VARCHAR(10);
ALTER TABLE chungcu MODIFY COLUMN loaichungcu VARCHAR(50);
-- Tạo khóa ngoại liên kết (Optional nhưng nên làm)
ALTER TABLE chungcu ADD CONSTRAINT fk_chungcu_vuan 
FOREIGN KEY (id_vuan) REFERENCES hosovuan(id_vuan) 
ON UPDATE CASCADE ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS = 0;

-- 2. Xóa dữ liệu từng bảng (Dùng TRUNCATE để reset sạch sẽ)
TRUNCATE TABLE `togiac_vuan`;
TRUNCATE TABLE `ketquavuan`;
TRUNCATE TABLE `nhiemvudieutra`;
TRUNCATE TABLE `kehoachdieutra`;
TRUNCATE TABLE `vatchung`;
TRUNCATE TABLE `nannhan`;
TRUNCATE TABLE `nghipham`;
TRUNCATE TABLE `truyna`;
TRUNCATE TABLE `chungcu`;
TRUNCATE TABLE `hosovuan`;
TRUNCATE TABLE `dontogiac`;
TRUNCATE TABLE `nguoidan`;

-- Lưu ý: Không xóa bảng 'canbo' và 'vaitro' nếu bạn muốn giữ lại tài khoản Admin/Cán bộ để đăng nhập
-- Nếu muốn xóa luôn cả Cán bộ (reset toàn bộ hệ thống về 0), hãy bỏ comment 2 dòng dưới:
-- TRUNCATE TABLE `canbo`;
-- TRUNCATE TABLE `vaitro`;

-- 3. Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;

SELECT * FROM hosovuan ORDER BY ngaytao DESC LIMIT 5;

ALTER TABLE nannhan ADD COLUMN id_togiac VARCHAR(10);

-- Tạo khóa ngoại liên kết với bảng dontogiac (nếu cần thiết cho toàn vẹn dữ liệu)
ALTER TABLE nannhan ADD CONSTRAINT fk_nannhan_togiac 
FOREIGN KEY (id_togiac) REFERENCES dontogiac(id_togiac) 
ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE nhiemvudieutra ADD COLUMN ketqua TEXT NULL; 
ALTER TABLE nghipham 
MODIFY COLUMN tinhtrangbatgiu 
ENUM('đang bắt giữ', 'đã bắt giữ', 'truy nã', 'tại ngoại', 'khác') DEFAULT 'khác';