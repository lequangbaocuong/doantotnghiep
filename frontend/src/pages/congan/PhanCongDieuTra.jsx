import React, { useState, useEffect } from "react";
import { Briefcase, FileText, ListTodo, Plus, User, Calendar } from "lucide-react";
import axios from "axios";

export default function PhanCongDieuTra() {
  const [cases, setCases] = useState([]);
  const [officers, setOfficers] = useState([]);
  
  const [selectedCase, setSelectedCase] = useState(null); 
  const [plans, setPlans] = useState([]); 
  const [selectedPlan, setSelectedPlan] = useState(null); 
  const [tasks, setTasks] = useState([]); 

  const [showPlanForm, setShowPlanForm] = useState(false);
  const [newPlan, setNewPlan] = useState({ noidung: "", thoihan: "" });

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ 
      tennhiemvu: "", noidung: "", ngaybatdau: "", ngayketthuc: "", id_canbo: "" 
  });

  useEffect(() => {
    const initData = async () => {
        try {
            const [resCases, resOff] = await Promise.all([
                axios.get("http://localhost:5000/api/cases"),
                axios.get("http://localhost:5000/api/cases/investigators")
            ]);
            setCases(Array.isArray(resCases.data) ? resCases.data : resCases.data.data);
            setOfficers(resOff.data);
        } catch (e) { console.error(e); }
    };
    initData();
  }, []);

  useEffect(() => {
    if (selectedCase) {
        axios.get(`http://localhost:5000/api/assignments/plans/${selectedCase}`)
             .then(res => {
                 setPlans(res.data);
                 setSelectedPlan(null); 
                 setTasks([]);
             });
    }
  }, [selectedCase]);

  useEffect(() => {
    if (selectedPlan) {
        axios.get(`http://localhost:5000/api/assignments/tasks/${selectedPlan}`)
             .then(res => setTasks(res.data));
    }
  }, [selectedPlan]);

  const handleCreatePlan = async () => {
      try {
          await axios.post("http://localhost:5000/api/assignments/plan", { ...newPlan, id_vuan: selectedCase });
          alert("Tạo kế hoạch thành công!");
          setShowPlanForm(false);
          const res = await axios.get(`http://localhost:5000/api/assignments/plans/${selectedCase}`);
          setPlans(res.data);
      } catch (e) { alert("Lỗi tạo kế hoạch"); }
  };

  const handleCreateTask = async () => {
      try {
          await axios.post("http://localhost:5000/api/assignments/task", { ...newTask, id_kehoach: selectedPlan });
          alert("Giao nhiệm vụ thành công!");
          setShowTaskForm(false);
          const res = await axios.get(`http://localhost:5000/api/assignments/tasks/${selectedPlan}`);
          setTasks(res.data);
      } catch (e) { alert("Lỗi giao nhiệm vụ"); }
  };

  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#FFA502] uppercase text-center">Chỉ đạo & Phân công điều tra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
        <div className="bg-[#1b2838] p-4 rounded-xl border border-gray-700 flex flex-col">
            <h2 className="font-bold mb-4 text-[#4ECDC4] flex items-center gap-2"><Briefcase size={20}/> 1. Chọn Vụ Án</h2>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {cases.map(c => (
                    <div key={c.id_vuan} onClick={() => setSelectedCase(c.id_vuan)}
                        className={`p-3 rounded border cursor-pointer transition ${selectedCase === c.id_vuan ? 'bg-[#4ECDC4]/20 border-[#4ECDC4]' : 'bg-[#0f1a26] border-gray-600'}`}
                    >
                        <p className="font-semibold text-sm line-clamp-1">{c.tenvuan}</p>
                        <p className="text-xs text-gray-400">{c.id_vuan}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-[#1b2838] p-4 rounded-xl border border-gray-700 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#FFA502] flex items-center gap-2"><FileText size={20}/> 2. Kế Hoạch</h2>
                <button disabled={!selectedCase} onClick={() => setShowPlanForm(!showPlanForm)} className="bg-[#FFA502] text-black p-1 rounded hover:bg-yellow-600 disabled:opacity-50"><Plus size={18}/></button>
            </div>

            {showPlanForm && (
                <div className="bg-[#0f1a26] p-3 rounded mb-3 border border-gray-600 animate-fadeIn">
                    <input type="date" className="w-full bg-transparent border border-gray-600 rounded p-2 mb-2 text-sm text-white" 
                        value={newPlan.thoihan} onChange={e => setNewPlan({...newPlan, thoihan: e.target.value})} />
                    <textarea placeholder="Nội dung kế hoạch..." className="w-full bg-transparent border border-gray-600 rounded p-2 text-sm text-white" rows="3"
                        value={newPlan.noidung} onChange={e => setNewPlan({...newPlan, noidung: e.target.value})}></textarea>
                    <button onClick={handleCreatePlan} className="w-full mt-2 bg-[#FFA502] text-black text-xs font-bold py-2 rounded">Lưu Kế Hoạch</button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {!selectedCase ? <p className="text-gray-500 text-center text-sm mt-10">← Chọn vụ án trước</p> : 
                 plans.length === 0 ? <p className="text-gray-500 text-center text-sm mt-10">Chưa có kế hoạch nào.</p> :
                 plans.map(p => (
                    <div key={p.id_kehoach} onClick={() => setSelectedPlan(p.id_kehoach)}
                        className={`p-3 rounded border cursor-pointer transition ${selectedPlan === p.id_kehoach ? 'bg-[#FFA502]/20 border-[#FFA502]' : 'bg-[#0f1a26] border-gray-600'}`}
                    >
                        <p className="text-sm line-clamp-2">{p.noidung}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Calendar size={10}/> Hạn: {new Date(p.thoihan).toLocaleDateString('vi-VN')}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-[#1b2838] p-4 rounded-xl border border-gray-700 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#FF6B6B] flex items-center gap-2"><ListTodo size={20}/> 3. Nhiệm Vụ</h2>
                <button disabled={!selectedPlan} onClick={() => setShowTaskForm(!showTaskForm)} className="bg-[#FF6B6B] text-white p-1 rounded hover:bg-red-600 disabled:opacity-50"><Plus size={18}/></button>
            </div>
            
            {showTaskForm && (
                <div className="bg-[#0f1a26] p-3 rounded mb-3 border border-gray-600 animate-fadeIn space-y-2">
                    <input placeholder="Tên nhiệm vụ" className="w-full bg-transparent border border-gray-600 rounded p-2 text-sm text-white" 
                        value={newTask.tennhiemvu} onChange={e => setNewTask({...newTask, tennhiemvu: e.target.value})} />
                    
                    <div className="flex gap-2">
                        <input type="date" className="w-1/2 bg-transparent border border-gray-600 rounded p-2 text-sm text-white" 
                            value={newTask.ngaybatdau} onChange={e => setNewTask({...newTask, ngaybatdau: e.target.value})} />
                        <input type="date" className="w-1/2 bg-transparent border border-gray-600 rounded p-2 text-sm text-white" 
                            value={newTask.ngayketthuc} onChange={e => setNewTask({...newTask, ngayketthuc: e.target.value})} />
                    </div>

                    <select className="w-full bg-[#1b2838] border border-gray-600 rounded p-2 text-sm text-white"
                        value={newTask.id_canbo} onChange={e => setNewTask({...newTask, id_canbo: e.target.value})}
                    >
                        <option value="">-- Chọn cán bộ thực hiện --</option>
                        {officers.map(off => (
                            <option key={off.id_canbo} value={off.id_canbo}>{off.hoten}</option>
                        ))}
                    </select>

                    <button onClick={handleCreateTask} className="w-full bg-[#FF6B6B] text-white text-xs font-bold py-2 rounded">Giao Nhiệm Vụ</button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {!selectedPlan ? <p className="text-gray-500 text-center text-sm mt-10">← Chọn kế hoạch trước</p> : 
                 tasks.length === 0 ? <p className="text-gray-500 text-center text-sm mt-10">Chưa có nhiệm vụ nào.</p> :
                 tasks.map(t => (
                    <div key={t.id_nhiemvu} className="p-3 rounded border bg-[#0f1a26] border-gray-600">
                        <p className="font-bold text-sm text-[#FF6B6B]">{t.tennhiemvu}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                            <span className="flex items-center gap-1"><User size={12}/> {t.canbo?.hoten || "Chưa giao"}</span>
                            <span className="bg-gray-700 px-2 py-0.5 rounded">{t.trangthai}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}