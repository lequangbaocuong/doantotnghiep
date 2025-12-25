import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, FileText, UserPlus, Paperclip, Download, Video, Plus, Calendar } from "lucide-react";
import axios from "axios";
import AddEvidence from "../../components/AddEvidence";

export default function ChiTietVuAn() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vuAn, setVuAn] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchCaseDetail = () => {
        setLoading(true);

        axios.get(`http://localhost:5000/api/cases/${id}`)
            .then((res) => {
                setVuAn(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCaseDetail();
    }, [id]);

    const getFileUrl = (path) => {
        if (!path) 
            return "";
        if (path.startsWith("http://") || path.startsWith("https://")) {
            return path;
        }
        return `http://localhost:5000${path}`;
    };

    if (loading) {
        return <div className="p-10 text-white">Đang tải dữ liệu...</div>;
    }

    if (!vuAn) {
        return <div className="p-10 text-white">Không tìm thấy vụ án</div>;
    }

    return (
        <div className="min-h-screen bg-[#0f1a26] p-8 text-white">
            <button
                onClick={() => navigate("/congan/caselists")}
                className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white"
            >
                <ArrowLeft size={20} /> Quay lại danh sách
            </button>

            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold uppercase text-[#ff5252]">
                        {vuAn.tenvuan}
                    </h1>
                    <p className="mt-1 text-gray-400">
                        Mã vụ án:{" "}
                        <span className="font-mono text-white">
                            {vuAn.id_vuan}
                        </span>
                    </p>
                </div>

                <div className="flex gap-2">
                    <span className="rounded-full border border-blue-600/50 bg-blue-600/20 px-3 py-1 text-sm capitalize text-blue-400">
                        {vuAn.trangthai}
                    </span>
                    <span className="rounded-full border border-red-600/50 bg-red-600/20 px-3 py-1 text-sm capitalize text-red-400">
                        {vuAn.mucdo}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-xl border border-gray-700 bg-[#1b2838] p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#4ECDC4]">
                            <FileText size={20} />
                            Nội dung vụ việc
                        </h2>

                        <p className="whitespace-pre-line text-gray-300">
                            {vuAn.mota}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-700 pt-6">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Ngày khởi tố
                                </p>
                                <p className="flex items-center gap-2 font-medium">
                                    <Calendar size={16} />
                                    {new Date(
                                        vuAn.ngaytao
                                    ).toLocaleDateString("vi-VN")}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Cán bộ thụ lý
                                </p>
                                <p className="font-medium">
                                    {vuAn.nguoitao || "Admin"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-700 bg-[#1b2838] p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-[#FF6B6B]">
                                <User size={20} />
                                Danh sách nghi phạm
                            </h2>

                            <button
                                onClick={() =>
                                    navigate("/congan/themnghipham", {
                                        state: {
                                            id_vuan: vuAn.id_vuan,
                                            tenvuan: vuAn.tenvuan,
                                        },
                                    })
                                }
                                className="flex items-center gap-2 rounded bg-[#2e4a68] px-3 py-1.5 text-sm transition hover:bg-[#3d5e82]"
                            >
                                <UserPlus size={16} />
                                Thêm nghi phạm
                            </button>
                        </div>

                        {vuAn.ds_nghipham?.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-300">
                                    <thead className="bg-[#162436] text-xs uppercase text-gray-400">
                                        <tr>
                                            <th className="px-4 py-3">
                                                Mã nghi phạm
                                            </th>
                                            <th className="px-4 py-3">
                                                Họ tên
                                            </th>
                                            <th className="px-4 py-3">CCCD</th>
                                            <th className="px-4 py-3">
                                                Tình trạng
                                            </th>
                                            <th className="px-4 py-3">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {vuAn.ds_nghipham.map((np) => (
                                            <tr
                                                key={np.id_nghipham}
                                                className="hover:bg-[#22344a]"
                                            >
                                                <td className="px-4 py-3 font-mono text-[#4ECDC4]">
                                                    {np.id_nghipham}
                                                </td>
                                                <td className="px-4 py-3 font-medium text-white">
                                                    {np.hoten}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {np.cccd}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded px-2 py-1 text-xs ${
                                                            np.tinhtrangbatgiu ===
                                                            "đang bắt giữ"
                                                                ? "bg-red-900/50 text-red-400"
                                                                : "bg-green-900/50 text-green-400"
                                                        }`}
                                                    >
                                                        {np.tinhtrangbatgiu}
                                                    </span>
                                                </td>
                                                <td
                                                    className="cursor-pointer px-4 py-3 text-blue-400 hover:underline"
                                                    onClick={() =>
                                                        navigate(
                                                            `/congan/nghipham/${np.id_nghipham}`
                                                        )
                                                    }
                                                >
                                                    Xem
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-gray-600 py-8 text-center text-gray-500">
                                Chưa xác định được nghi phạm nào.
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border border-gray-700 bg-[#1b2838] p-6">
                        <h3 className="mb-3 text-lg font-bold text-gray-300">
                            Nguồn gốc vụ án
                        </h3>

                        {vuAn.dontogiac ? (
                            <div className="space-y-3 text-sm">
                                <p>
                                    <span className="text-gray-500">Mã đơn:</span>{" "}
                                    {vuAn.dontogiac.id_togiac}
                                </p>
                                <p>
                                    <span className="text-gray-500">
                                        Tiêu đề:
                                    </span>{" "}
                                    {vuAn.dontogiac.tieude}
                                </p>
                                <p>
                                    <span className="text-gray-500">
                                        Địa điểm:
                                    </span>{" "}
                                    {vuAn.dontogiac.diachivuviec}
                                </p>
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/congan/danhsachtogiac/${vuAn.dontogiac.id_togiac}`
                                        )
                                    }
                                    className="text-xs text-[#ff5252] hover:underline"
                                >
                                    Xem chi tiết đơn tố giác →
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm italic text-gray-500">
                                Vụ án được khởi tố trực tiếp, không qua đơn tố giác.
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 rounded-xl border border-gray-700 bg-[#1b2838] p-6 lg:col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-[#f9ca24]">
                            <Paperclip size={20} />
                            Tài liệu & Chứng cứ
                        </h2>

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-1 rounded-full border border-[#f9ca24]/50 bg-[#f9ca24]/20 px-3 py-1.5 text-sm font-medium text-[#f9ca24] transition hover:bg-[#f9ca24]/40"
                        >
                            <Plus size={16} />
                            Thêm ảnh
                        </button>
                    </div>

                    {vuAn.ds_chungcu?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {vuAn.ds_chungcu.map((cc) => (
                                <div
                                    key={cc.id_chungcu}
                                    className="group flex flex-col gap-3 rounded border border-gray-600 bg-[#0f1a26] p-3 transition hover:border-[#f9ca24]"
                                >
                                    <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded bg-gray-800">
                                        {["hình ảnh", "vật lý"].includes(
                                            cc.loaichungcu
                                        ) ||
                                        cc.duongdantaptin?.match(
                                            /\.(jpeg|jpg|png|gif)$/i
                                        ) ? (
                                            <img
                                                src={getFileUrl(
                                                    cc.duongdantaptin
                                                )}
                                                alt="evidence"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-500">
                                                {cc.loaichungcu === "video" ? (
                                                    <Video size={32} />
                                                ) : (
                                                    <FileText size={32} />
                                                )}
                                                <span className="mt-1 text-xs uppercase">
                                                    {cc.loaichungcu}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 overflow-hidden pr-2">
                                            <p className="truncate text-sm font-bold capitalize text-white">
                                                {cc.loaichungcu}
                                            </p>
                                            <p className="line-clamp-2 text-xs text-gray-400">
                                                {cc.mota}
                                            </p>
                                            <p className="mt-1 text-[10px] text-gray-500">
                                                {new Date(
                                                    cc.ngaygui
                                                ).toLocaleDateString("vi-VN")}
                                            </p>
                                        </div>

                                        <a
                                            href={getFileUrl(
                                                cc.duongdantaptin
                                            )}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f9ca24] text-black shadow-lg transition hover:bg-yellow-400"
                                        >
                                            <Download size={14} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-gray-600 py-6 text-center text-sm text-gray-500">
                            Chưa có chứng cứ nào.
                        </div>
                    )}
                </div>
            </div>
            
            <AddEvidence
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                caseId={id}
                onSuccess={fetchCaseDetail}
            />
        </div>
    );
}
