export default function LoginSuccess({ isOpen, onClose }) { 
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1b2838] p-8 rounded-xl shadow-2xl text-center max-w-sm w-full transform transition-all duration-300 scale-100">
        <h1 className="text-3xl font-bold text-[#4caf50] mb-4">
          Đăng nhập thành công!
        </h1>
        <p className="text-gray-300 mb-6">
          Chào mừng bạn đã truy cập vào hệ thống quản lý thông tin tội phạm công an phường Sơn Trà.
        </p>
        <button
          onClick={onClose} 
          className="bg-[#ff5252] px-6 py-2 rounded-lg font-semibold hover:bg-[#e04848] transition"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
}