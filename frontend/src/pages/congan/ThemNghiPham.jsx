import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, User, Upload } from "lucide-react";
import axios from "axios";

export default function ThemNghiPham() {
    const location = useLocation();
    const navigate = useNavigate();

    const { id_vuan, tenvuan } = location.state || {};

    const [formData, setFormData] = useState({
        hoten: "",
        gioitinh: "nam",
        ngaysinh: "",
        cccd: "",
        tinhtrangbatgiu: "đang bắt giữ",
        diachi: "",
        anh: null,
    });

    useEffect(() => {
        if (!id_vuan) {
            alert("Chưa chọn vụ án! Vui lòng quay lại danh sách.");
            navigate("/congan/caselists");
        }
    }, [id_vuan, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("id_vuan", id_vuan);
            data.append("hoten", formData.hoten);
            data.append("gioitinh", formData.gioitinh);
            data.append("ngaysinh", formData.ngaysinh);
            data.append("cccd", formData.cccd);
            data.append("tinhtrangbatgiu", formData.tinhtrangbatgiu);
            data.append("diachi", formData.diachi);

            if (formData.anh) {
                data.append("anh", formData.anh);
            }

            const res = await axios.post(
                "http://localhost:5000/api/suspects/add",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("✅ " + res.data.message);
            navigate(`/congan/chitietvuan/${id_vuan}`);
        } catch (error) {
            console.error(error);
            alert(
                "❌ Lỗi: " +
                    (error.response?.data?.message ||
                        "Không thể thêm nghi phạm")
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1a26] px-8 py-10 text-white">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white"
            >
                <ArrowLeft size={20} />
                Quay lại
            </button>

            <h1 className="mb-2 text-center text-3xl font-bold uppercase text-[#ff5252]">
                Thêm nghi phạm vào hồ sơ
            </h1>
            <p className="mb-8 text-center text-gray-400">
                Vụ án:{" "}
                <span className="font-semibold text-white">{tenvuan}</span> (Mã:{" "}
                {id_vuan})
            </p>

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-2xl border border-gray-700 bg-[#1b2838] p-8 shadow-lg"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#4ECDC4]">
                            <User />
                            Thông tin cá nhân
                        </h3>

                        <div>
                            <label className="mb-1 block text-gray-400">
                                Họ và tên *
                            </label>
                            <input
                                name="hoten"
                                required
                                onChange={handleChange}
                                placeholder="Nhập họ tên nghi phạm"
                                className="w-full rounded border border-gray-600 bg-[#162436] px-3 py-2 text-white"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-gray-400">
                                    Giới tính
                                </label>
                                <select
                                    name="gioitinh"
                                    onChange={handleChange}
                                    className="w-full rounded border border-gray-600 bg-[#162436] px-3 py-2 text-white"
                                >
                                    <option value="nam">Nam</option>
                                    <option value="nữ">Nữ</option>
                                    <option value="khác">Khác</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-gray-400">
                                    Ngày sinh / Năm sinh
                                </label>
                                <input
                                    type="text"
                                    name="ngaysinh"
                                    onChange={handleChange}
                                    placeholder="VD: 1990 hoặc 1990-12-25"
                                    className="w-full rounded border border-gray-600 bg-[#162436] px-3 py-2 text-white placeholder-gray-500"
                                />
                                <p className="mt-1 text-[10px] text-gray-500">
                                    Nhập năm sinh (YYYY) nếu không rõ ngày tháng.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-gray-400">
                                Số CCCD/CMND
                            </label>
                            <input
                                name="cccd"
                                onChange={handleChange}
                                placeholder="Nhập số CCCD (nếu có)"
                                className="w-full rounded border border-gray-600 bg-[#162436] px-3 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-gray-400">
                                Địa chỉ thường trú
                            </label>
                            <input
                                name="diachi"
                                onChange={handleChange}
                                placeholder="Địa chỉ..."
                                className="w-full rounded border border-gray-600 bg-[#162436] px-3 py-2 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#FF6B6B]">
                            <Upload />
                            Hồ sơ pháp lý
                        </h3>

                        <div>
                            <label className="mb-1 block text-gray-400">
                                Tình trạng hiện tại
                            </label>
                            <select
                                name="tinhtrangbatgiu"
                                onChange={handleChange}
                                className="w-full rounded border border-gray-600 bg-[#162436] px-3 py-2 text-white"
                            >
                                <option value="đang bắt giữ">
                                    Đang bắt giữ
                                </option>
                                <option value="đã bắt giữ">
                                    Đã bắt giữ (Đã có lệnh)
                                </option>
                                <option value="truy nã">Đang truy nã</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-gray-400">
                                Ảnh nghi phạm
                            </label>

                            <label className="group flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-[#0f1a26] transition hover:border-[#ff5252]">
                                <div className="flex flex-col items-center transition group-hover:-translate-y-1">
                                    <User
                                        size={32}
                                        className="mb-2 text-gray-500 group-hover:text-[#ff5252]"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Chọn ảnh chân dung...
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    name="anh"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>

                            {formData.anh && (
                                <p className="mt-2 text-center text-xs text-green-400">
                                    Đã chọn: {formData.anh.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end border-t border-gray-700 pt-6">
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded bg-[#ff5252] px-6 py-2 font-bold text-white transition hover:scale-105 hover:bg-red-600"
                    >
                        <Save size={18} />
                        Lưu hồ sơ nghi phạm
                    </button>
                </div>
            </form>
        </div>
    );
}
