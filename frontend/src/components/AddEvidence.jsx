import React, { useState } from "react";
import axios from "axios";
import { X, UploadCloud } from "lucide-react";

export default function AddEvidenceModal({ isOpen, onClose, caseId, onSuccess }) {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    if (!isOpen) return null;

    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            return alert("Vui lòng chọn ít nhất 1 hình ảnh!");
        }

        setUploading(true);

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            formData.append("id_vuan", caseId);
            formData.append(
                "mota",
                description ||
                    `Cán bộ bổ sung ảnh ngày ${new Date().toLocaleDateString("vi-VN")}`
            );
            formData.append("loaichungcu", "hình ảnh");

            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("files", selectedFiles[i]);
            }

            await axios.post(
                "http://localhost:5000/api/evidence/submit",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("✅ Thêm hình ảnh chứng cứ thành công!");
            setSelectedFiles(null);
            setDescription("");

            onSuccess?.();
            onClose();
        } catch (error) {
            console.error("Lỗi upload:", error);
            alert(
                "❌ Lỗi khi tải lên: " +
                    (error.response?.data?.message || error.message)
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in">
            <div className="relative w-full max-w-md rounded-xl border border-gray-600 bg-[#1b2838] p-6 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#f9ca24]">
                    <UploadCloud size={24} />
                    Bổ sung hình ảnh
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Chọn hình ảnh (Có thể chọn nhiều)
                        </label>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setSelectedFiles(e.target.files)}
                            className="
                                block w-full cursor-pointer text-sm text-gray-400
                                file:mr-4 file:rounded-full file:border-0
                                file:bg-[#f9ca24]/20 file:px-4 file:py-2
                                file:text-sm file:font-semibold file:text-[#f9ca24]
                                hover:file:bg-[#f9ca24]/30
                            "
                        />

                        {selectedFiles?.length > 0 && (
                            <p className="mt-2 text-sm text-green-400">
                                Đã chọn {selectedFiles.length} file.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Mô tả (Không bắt buộc)
                        </label>

                        <textarea
                            rows={3}
                            placeholder="VD: Ảnh chụp hiện trường góc phía Đông..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="
                                w-full resize-none rounded border border-gray-600
                                bg-[#0f1a26] p-3 text-white outline-none
                                focus:border-[#f9ca24]
                            "
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            disabled={uploading}
                            className="rounded bg-gray-600 px-4 py-2 font-medium text-white transition hover:bg-gray-500 disabled:opacity-50"
                        >
                            Hủy bỏ
                        </button>

                        <button
                            onClick={handleUpload}
                            disabled={uploading || !selectedFiles}
                            className="
                                flex items-center gap-2 rounded bg-[#f9ca24]
                                px-6 py-2 font-bold text-black transition
                                hover:bg-yellow-500
                                disabled:cursor-not-allowed disabled:opacity-50
                            "
                        >
                            {uploading ? (
                                "Đang tải lên..."
                            ) : (
                                <>
                                    <UploadCloud size={18} />
                                    Tải lên ngay
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
