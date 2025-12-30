import React from "react";
import { HeartPulse, Stethoscope } from "lucide-react";

export default function VictimList({ victims }) {
  return (
    <div className="rounded-xl border border-gray-700 bg-[#1b2838] p-6">
        <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-pink-400"> Danh sách nạn nhân
            </h2>
        </div>

        {victims && victims.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-[#2c1b1b] text-xs uppercase text-pink-300">
                        <tr>
                            <th className="px-4 py-3">Họ tên</th>
                            <th className="px-4 py-3">Giới tính</th>
                            <th className="px-4 py-3">Tình trạng</th>
                            <th className="px-4 py-3">Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {victims.map((nn) => (
                            <tr key={nn.id_nannhan} className="hover:bg-[#2c1b1b]/30">
                                <td className="px-4 py-3 font-medium text-white">{nn.hovaten}</td>
                                <td className="px-4 py-3 capitalize">{nn.gioitinh}</td>
                                <td className="px-4 py-3">
                                    <span
                                    className={`rounded px-2 py-1 text-xs font-bold border ${
                                        nn.tinhtrang === "đã chết"
                                        ? "bg-gray-700 text-gray-300 border-gray-500"
                                        : nn.tinhtrang === "bị thương"
                                        ? "bg-red-900/40 text-red-300 border-red-800"
                                        : "bg-green-900/40 text-green-300 border-green-800"
                                    }`}
                                    >
                                    {nn.tinhtrang}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-400">{nn.diachi || "Chưa rõ"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="rounded-lg border border-dashed border-gray-600 py-6 text-center text-gray-500 flex flex-col items-center">
                <p>Không có thông tin nạn nhân trong vụ án này.</p>
            </div>
        )}
    </div>
  );
}