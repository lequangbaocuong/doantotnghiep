// DuyetTruyNa.jsx
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DuyetTruyNa() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {

    axios.get("http://localhost:5000/api/wanted/pending")
      .then(res => {
         setList(res.data);
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  return (
    <div className="min-h-screen bg-[#0f1a26] text-white p-8">

      <div className="bg-[#1b2838] p-6 rounded-2xl shadow-lg border border-gray-700">
        <table className="w-full text-left text-gray-300">
          <tbody className="divide-y divide-gray-700">
            {list.map((item) => (
              <tr key={item.id_truyna} className="hover:bg-[#22344a]">
                <td className="px-4 py-3 font-mono text-[#ff5252]">{item.id_truyna}</td>
                <td className="px-4 py-3 font-bold">{item.hoten}</td>
                <td className="px-4 py-3">{item.toidanh}</td>
                <td className="px-4 py-3">{item.id_canbo || "Cán bộ"}</td>
    
                <td className="px-4 py-3 flex justify-center">
                  <button 
                    onClick={() => navigate(`/thutruong/duyet-truy-na/${item.id_truyna}`)}
                    className="flex items-center gap-2 bg-[#2e4a68] text-blue-300 px-4 py-2 rounded hover:bg-[#3d5e82] hover:text-white transition"
                  >
                    <Eye size={16} /> Xem chi tiết & Duyệt
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}