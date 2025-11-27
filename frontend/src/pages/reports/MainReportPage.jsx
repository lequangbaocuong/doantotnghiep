import React, { useState } from "react";
import ReportStep1 from "../../components/Step1";
import ReportStep2 from "../../components/Step2";
import ReportStep3 from "../../components/Step3";

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