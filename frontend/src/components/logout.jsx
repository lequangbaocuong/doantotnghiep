export default function Logout({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1b2838] p-8 rounded-xl shadow-2xl text-center max-w-sm w-full transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-[#ff5252] mb-4">
          Xác nhận Đăng xuất
        </h2>
        <p className="text-gray-300 mb-6">
          Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
        </p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#ff5252] px-6 py-2 rounded-lg font-semibold hover:bg-[#e04848] transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}