import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListTodo, Calendar, Clock, CheckCircle, ArrowRight, FileText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NhiemVu() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reportContent, setReportContent] = useState("");

  const fetchTasks = () => {
    const token = localStorage.getItem("token_canbo");
    if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
    }

    setLoading(true);
    axios.get("http://localhost:5000/api/assignments/my-tasks", {
        headers: { Authorization: `Bearer ${token}` } 
    })
    .then(res => {
        setTasks(res.data);
        setLoading(false); 
    })
    .catch(err => {
        console.error(err);
        setLoading(false);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openReportModal = (task) => {
      setSelectedTask(task);
      setReportContent(task.ketqua || ""); 
      setShowModal(true);
  };

  const handleSubmitReport = async () => {
      if(!reportContent.trim()) return alert("Vui lòng nhập nội dung báo cáo!");
      
      try {
          const token = localStorage.getItem("token_canbo");
          await axios.put(`http://localhost:5000/api/assignments/submit-result/${selectedTask.id_nhiemvu}`, 
            { ketqua: reportContent },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          alert("✅ Báo cáo thành công! Nhiệm vụ đã hoàn thành.");
          setShowModal(false);
          fetchTasks(); 
      } catch (error) {
          console.error(error);
          alert("❌ Lỗi khi gửi báo cáo: " + (error.response?.data?.message || "Lỗi server"));
      }
  };

  const getStatusColor = (status) => {
      if (status === "Hoàn thành") return "text-green-400 border-green-400 bg-green-400/10";
      return "text-yellow-400 border-yellow-400 bg-yellow-400/10";
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8 relative">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#4ECDC4] uppercase flex items-center justify-center gap-3">
        <ListTodo /> Nhiệm vụ được phân công
      </h1>

      {loading ? (
          <div className="flex justify-center mt-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4ECDC4]"></div>
          </div>
      ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
              <p>Hiện tại đồng chí chưa được phân công nhiệm vụ nào.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                  <div key={task.id_nhiemvu} className="bg-[#1b2838] border border-gray-700 rounded-xl p-6 shadow-lg hover:border-[#4ECDC4] transition flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold text-[#FF6B6B] line-clamp-2" title={task.tennhiemvu}>
                              {task.tennhiemvu}
                          </h3>
                          <span className={`text-xs px-2 py-1 border rounded-full whitespace-nowrap ${getStatusColor(task.trangthai)}`}>
                              {task.trangthai || "Mới"}
                          </span>
                      </div>
                      
                      <div className="bg-[#0f1a26] p-3 rounded mb-4 text-sm text-gray-300 flex-grow">
                          <p className="mb-2">
                              <span className="text-gray-500 font-bold">Vụ án:</span> {task.kehoach?.hosovuan?.tenvuan || "Chưa cập nhật tên"}
                          </p>
                          <p className="italic mb-3">"{task.noidung}"</p>

                          {task.ketqua && (
                              <div className="mt-2 pt-2 border-t border-gray-700">
                                  <p className="text-green-400 font-bold flex items-center gap-1 text-xs">
                                      <CheckCircle size={12}/> Kết quả báo cáo:
                                  </p>
                                  <p className="text-white mt-1 text-xs whitespace-pre-line">{task.ketqua}</p>
                              </div>
                          )}
                      </div>

                      <div className="text-xs text-gray-400 space-y-2 mb-4">
                          <p className="flex items-center gap-2">
                              <Calendar size={14}/> Bắt đầu: {task.ngaybatdau ? new Date(task.ngaybatdau).toLocaleDateString('vi-VN') : "---"}
                          </p>
                          <p className="flex items-center gap-2">
                              <Clock size={14}/> Hạn chót: <span className="text-yellow-500">{task.ngayketthuc ? new Date(task.ngayketthuc).toLocaleDateString('vi-VN') : "---"}</span>
                          </p>
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <button 
                            onClick={() => navigate(`/congan/chitietvuan/${task.kehoach?.hosovuan?.id_vuan || task.kehoach?.id_vuan}`)}
                            className="flex-1 bg-[#2e4a68] hover:bg-[#3d5e82] py-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition"
                        >
                            Hồ sơ <ArrowRight size={16}/>
                        </button>
                        
                        {task.trangthai !== "Hoàn thành" && (
                            <button 
                                onClick={() => openReportModal(task)}
                                className="flex-1 bg-[#ff5252] hover:bg-red-600 py-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition"
                            >
                                <FileText size={16}/> Báo cáo
                            </button>
                        )}
                      </div>
                  </div>
              ))}
          </div>
      )}

      {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-[#1b2838] p-6 rounded-2xl w-full max-w-md border border-[#4ECDC4] shadow-2xl relative animate-fadeIn">
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                      <X size={24} />
                  </button>

                  <h2 className="text-xl font-bold text-[#4ECDC4] mb-4 flex items-center gap-2">
                      <FileText size={20}/> Báo cáo kết quả
                  </h2>
                  <p className="text-sm text-gray-300 mb-2">Nhiệm vụ: <span className="text-white font-bold">{selectedTask?.tennhiemvu}</span></p>

                  <textarea 
                    rows="5"
                    className="w-full bg-[#0f1a26] border border-gray-600 rounded p-3 text-white focus:border-[#4ECDC4] outline-none resize-none"
                    placeholder="Nhập chi tiết kết quả xác minh, điều tra..."
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                  ></textarea>

                  <div className="flex justify-end gap-3 mt-4">
                      <button 
                        onClick={() => setShowModal(false)} 
                        className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-bold"
                      >
                        Hủy
                      </button>
                      <button 
                        onClick={handleSubmitReport} 
                        className="px-4 py-2 rounded bg-[#4ECDC4] hover:bg-[#3dbdb4] text-black text-sm font-bold"
                      >
                        Gửi báo cáo & Hoàn thành
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}