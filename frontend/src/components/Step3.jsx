import React, { useState } from "react";
import axios from "axios";

export default function ReportStep3({ data, prevStep }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
       if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key !== "files") {
          formData.append(key, data[key]);
        }
      });

      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const res = await axios.post(
        "http://localhost:5000/api/submit-report",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      alert("Gửi thành công! Mã tố giác: " + res.data.id_togiac);

    } catch (error) {
      console.error("Lỗi khi gửi tố giác:", error);
      alert("Không thể gửi tố giác. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {/* Link quay lại */}
      <p
        onClick={prevStep}
        className="text-red-600 hover:text-red-700 font-medium cursor-pointer mb-6 inline-block text-left"
      >
        ← Quay lại bước trước
      </p>

      <h2 className="text-xl font-bold mb-6 text-gray-700">XÁC NHẬN GỬI TỐ GIÁC</h2>

      <p className="text-gray-600 mb-8">
        Vui lòng kiểm tra kỹ thông tin trước khi gửi.  
        Mọi thông tin sai lệch sẽ chịu trách nhiệm theo quy định pháp luật.
      </p>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 transition"
      >
        Gửi tố giác
      </button>
    </div>
  );
}
