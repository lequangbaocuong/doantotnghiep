import React from "react";

export default function ReportStep3({ data, prevStep }) {
  const handleSubmit = () => {
    alert("Tố giác/phản ánh của bạn đã được gửi. Cảm ơn sự hợp tác!");
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
