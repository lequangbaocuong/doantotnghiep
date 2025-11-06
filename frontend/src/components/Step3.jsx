import React from "react";

export default function ReportStep3({ data }) {
  const handleSubmit = () => {
    alert("Tố giác/phản ánh của bạn đã được gửi. Cảm ơn sự hợp tác!");
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-6 text-gray-700">XÁC NHẬN GỬI TỐ GIÁC</h2>
      <p className="text-gray-600 mb-8">
        Vui lòng kiểm tra kỹ thông tin trước khi gửi. Mọi thông tin sai lệch sẽ chịu trách nhiệm theo quy định pháp luật.
      </p>

      <button onClick={handleSubmit} className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 transition">
        Gửi tố giác
      </button>
    </div>
  );
}
