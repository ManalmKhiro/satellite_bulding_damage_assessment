import { useNavigate, useLocation } from "react-router-dom";

import {
  BarChart3,
  ScanSearch,
  Upload,
  User,
  Target,
  Download,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import { ResponsiveContainer } from "recharts";

function MenuItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 cursor-pointer"
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default function Results() {

  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state;

  if (!result) {
    return (
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/analyze")}
          className="bg-[#216474] text-white px-6 py-3 rounded-xl"
        >
          Go to Analyze
        </button>
      </div>
    );
  }

  const isArea = result.mode === "area";
  const stats = result.statistics || {};

 const chartData = [
  { name: "Missile", value: stats.missile_damaged || 0 },
  { name: "Destroyed", value: stats.destroyed || 0 },
  { name: "Damaged", value: stats.damaged || 0 },
  { name: "Safe", value: stats.safe || 0 },
];

  const colors = [
  "#7c3aed", // Missile
  "#ef4444", // Destroyed
  "#eab308", // Damaged
  "#22c55e", // Safe
];

  const downloadPDF = () => {
    window.open("http://127.0.0.1:5000/download-report", "_blank");
  };

  const toImage = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    if (img.startsWith("data:image")) return img;
    return `data:image/jpeg;base64,${img}`;
  };

  const getResultUI = (cls) => {

 if (cls === "Missile-Damaged Building") {
    return {
      color: "text-gray-700",
      bg: "bg-gray-500",
      soft: "bg-gray-100",
      border: "border-gray-300",
      label: "Missile Damaged Building",
    };
  }

  if (cls === "destroyed") {
    return {
      color: "text-red-600",
      bg: "bg-red-500",
      soft: "bg-red-50",
      border: "border-red-200",
      label: "Destroyed Building",
    };
  }

  if (cls === "damaged") {
    return {
      color: "text-yellow-600",
      bg: "bg-yellow-500",
      soft: "bg-yellow-50",
      border: "border-yellow-200",
      label: "Damaged Building",
    };
  }

  return {
    color: "text-[#6FBEB2]",
    bg: "bg-[#6FBEB2]",
    soft: "bg-[#6FBEB2]/10",
    border: "border-[#6FBEB2]",
    label: "Safe Building",
  };
};
  const ui = getResultUI(result.class || "no_damage");

  return (
    <div className="h-screen flex bg-slate-100">

      {/* SIDEBAR */}
      <div className="w-[260px] bg-[#005461] text-white p-5 flex flex-col justify-between">

        <div>
          <h1 className="text-2xl font-bold mb-10">Damage AI</h1>

          <div className="space-y-2">
            <MenuItem icon={<BarChart3 size={20} />} text="Dashboard" onClick={() => navigate("/")} />
            <MenuItem icon={<Upload size={20} />} text="Analyze Images" onClick={() => navigate("/analyze")} />

            <div className="bg-white/10 rounded-xl">
              <MenuItem icon={<ScanSearch size={20} />} text="Results" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-3 flex gap-3 items-center">
          <User />
          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-xs opacity-70">admin@system.com</p>
          </div>
        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* HEADER */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h1 className="text-3xl font-bold flex gap-3 items-center">
            <BarChart3 />
            {isArea ? "Area Analysis Dashboard" : "Single Building Result"}
          </h1>

          <button
            onClick={downloadPDF}
            className="fixed bottom-6 right-6 z-50 bg-[#216474] text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
          >
            <Download size={20} />
          </button>
        </div>

        {/* ================= SINGLE ================= */}
        {!isArea && (
          <>
            <div className="grid grid-cols-1 gap-4 mb-6">

              {/* <div className="bg-white rounded-3xl p-5">
                <p>Confidence</p>
                <h2 className="text-3xl font-bold">
                  {(result.confidence * 100).toFixed(1)}%
                </h2>
              </div> */}

              {/* 🔥 NEW: Damage Percent (REPLACED CONFIDENCE) */}
              {result.damage_percent !== undefined && (
                <div className="bg-white rounded-3xl p-5">
                  <p>Damage Level</p>
                  <h2 className="text-3xl font-bold">
                    {result.damage_percent}%
                  </h2>
                </div>
              )}

            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">

              <div className="bg-white rounded-3xl p-6">
                <h2 className="font-bold mb-4">Original Image</h2>

                <img
                  src={toImage(result.originalImage)}
                  className="rounded-2xl w-full max-h-[250px] object-contain"
                  alt=""
                />
              </div>

              <div className="bg-white rounded-3xl p-6">
                <h2 className="font-bold mb-4">Heatmap (AI)</h2>

                <img
                  src={toImage(result.heatmap)}
                  className="rounded-2xl w-full max-h-[250px] object-contain"
                  alt=""
                />
              </div>

            </div>
          </>
        )}

        {/* ================= AREA ================= */}
        {isArea && (
          <>
            <div className="grid grid-cols-3 gap-5 mb-6">

              <div className="bg-white rounded-3xl p-5">
                <p>Total Buildings</p>
                <h2>{stats.total_buildings}</h2>
              </div>

              <div className="bg-white rounded-3xl p-5">
                <p>Estimated Population</p>
                <h2>{stats.estimated_population}</h2>
              </div>

              <div className="bg-white rounded-3xl p-5">
                <p>Affected Population</p>
                <h2>{stats.affected_population}</h2>
              </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl p-6 mb-6">

              <h2 className="font-bold text-xl mb-4">
                Building Details
              </h2>

              <table className="w-full">

                <thead>
                  <tr className="border-b">
                    <th>ID</th>
                    <th>Class</th>
                    <th>Damage %</th>
                    <th>Population</th>
                    <th>Confidence</th>
                  </tr>
                </thead>

                <tbody>

                  {result.buildings?.map((b) => (
                    <tr key={b.id} className="text-center border-b h-12">
                      <td>{b.id}</td>
                      <td>{b.class}</td>
                      <td>{b.damage_percent}%</td>
                      <td>{b.population}</td>
                      <td>{(b.confidence * 100).toFixed(1)}%</td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </>
        )}

        {/* RESULT BADGE */}
        {!isArea && (
          <div className="bg-white rounded-3xl p-6 mb-6">

            <div className={`p-5 rounded-2xl border ${ui.border} ${ui.soft}`}>
              <div className={`inline-flex gap-2 px-4 py-2 rounded-xl text-white ${ui.bg}`}>
                <Target size={18} />
                {ui.label}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}