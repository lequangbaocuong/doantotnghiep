import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListTodo, Calendar, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NhiemVu() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token_canbo");

    if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
    }

    axios.get("http://localhost:5000/api/assignments/my-tasks", {
        headers: { Authorization: `Bearer ${token}` } 
    })
    .then(res => {
        setTasks(res.data);
    })
    .catch(err => {
        console.error(err);
    });
  }, []);

  const getStatusColor = (status) => {
      if (status === "Hoàn thành") return "text-green-400 border-green-400";
      if (status === "Đang thực hiện") return "text-yellow-400 border-yellow-400";
      return "text-gray-400 border-gray-400";
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#4ECDC4] uppercase flex items-center justify-center gap-3">
        <ListTodo /> Nhiệm vụ được phân công
      </h1>

      {loading ? (
          <p className="text-center">Đang tải nhiệm vụ...</p>
      ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
              <p>Hiện tại đồng chí chưa được phân công nhiệm vụ nào.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                  <div key={task.id_nhiemvu} className="bg-[#1b2838] border border-gray-700 rounded-xl p-6 shadow-lg hover:border-[#4ECDC4] transition flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold text-[#FF6B6B] line-clamp-2">{task.tennhiemvu}</h3>
                          <span className={`text-xs px-2 py-1 border rounded-full ${getStatusColor(task.trangthai)}`}>
                              {task.trangthai || "Mới"}
                          </span>
                      </div>
                      
                      <div className="bg-[#0f1a26] p-3 rounded mb-4 text-sm text-gray-300 flex-grow">
                          <p className="mb-2"><span className="text-gray-500 font-bold">Vụ án:</span> {task.kehoach?.vuan?.tenvuan || "..."}</p>
                          <p className="line-clamp-3 italic">"{task.noidung}"</p>
                      </div>

                      <div className="text-xs text-gray-400 space-y-2 mb-4">
                          <p className="flex items-center gap-2"><Calendar size={14}/> Bắt đầu: {new Date(task.ngaybatdau).toLocaleDateString('vi-VN')}</p>
                          <p className="flex items-center gap-2"><Clock size={14}/> Hạn chót: <span className="text-yellow-500">{new Date(task.ngayketthuc).toLocaleDateString('vi-VN')}</span></p>
                      </div>

                      <button 
                        onClick={() => navigate(`/congan/chitietvuan/${task.kehoach?.id_vuan}`)}
                        className="w-full mt-auto bg-[#2e4a68] hover:bg-[#3d5e82] py-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition"
                      >
                          Xem hồ sơ vụ án <ArrowRight size={16}/>
                      </button>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
}