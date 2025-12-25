import React, { useState, useEffect } from "react";
import ReportStep1 from "../../components/Step1";
import ReportStep2 from "../../components/Step2";
import ReportStep3 from "../../components/Step3";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReportPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    cccd: "", // Thêm
    gender: "khác", // Thêm
    anonymous: false, // Thêm
    relation: "",
    crimeType: "",
    severity: "",
    datetime: "",
    location: "",
    description: "",
    evidence: [],
    evidenceType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
           alert("Vui lòng đăng nhập!");
           return navigate("/login");
        }

        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const user = res.data;
        const missingFields = [];

        if (!user.hoten) missingFields.push("Họ tên");
        if (!user.cccd) missingFields.push("CCCD");
        if (!user.sodienthoai) missingFields.push("Số điện thoại");
        if (!user.diachi) missingFields.push("Địa chỉ");

        if (missingFields.length > 0) {
          alert(
            `⚠️ Tài khoản của bạn chưa đủ điều kiện gửi tố giác.\n\n` +
            `Thiếu thông tin: ${missingFields.join(", ")}.\n\n` +
            `Hệ thống sẽ chuyển bạn đến trang Cập nhật thông tin ngay bây giờ.`
          );
          navigate("/profile"); 
        }

      } catch (error) {
        console.error("Lỗi kiểm tra profile:", error);
        if (error.response?.status === 401) {
            localStorage.clear();
            navigate("/login");
        }
      }
    };

    checkProfile(); 
  }, [navigate]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between mb-10">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`flex-1 text-center border-b-4 pb-2 ${
                step === num ? "border-red-600 text-red-600" : "border-gray-300 text-gray-400"
              }`}
            >
              <span className="font-semibold">Bước {num}</span>
            </div>
          ))}
        </div>

        {step === 1 && <ReportStep1 nextStep={nextStep} updateFormData={updateFormData} data={formData} />}
        {step === 2 && (
          <ReportStep2
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            data={formData}
          />
        )}
        {step === 3 && <ReportStep3 data={formData} prevStep={prevStep} />}
      </div>
    </div>
  );
}