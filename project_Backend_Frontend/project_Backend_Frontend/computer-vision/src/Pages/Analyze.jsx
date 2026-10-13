import {
  Upload,
  ScanSearch,
  User,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
  ArrowRight,
  CircleHelp,
  Brain,
  MapPinned,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationPicker from "../Components/LocationPicker";

function MenuItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 cursor-pointer"
    >
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default function Analyze() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);


  const [location, setLocation] = useState(null);


  const [model, setModel] = useState("CNN");
  const [mode, setMode] = useState("single");
  const [threshold, setThreshold] = useState(70);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    if (!location){
      alert("plase select image location on map.");
      return;
    }
    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.append("mode", mode);
    formData.append("model", model);
    formData.append("threshold", threshold);
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("village", location.village);

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      navigate("/results", {
        state: data,
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-slate-100">

      {/* SIDEBAR */}
      <div className="w-[260px] bg-[#005461] text-white p-5 flex flex-col justify-between">

        <div>

          <h1 className="text-2xl font-bold mb-10">
            Damage AI
          </h1>

          <div className="space-y-2">

            <MenuItem
              icon={<BarChart3 size={20} />}
              text="Dashboard"
            />

            <div className="bg-[#216474]/20 border border-[#216474] rounded-xl">
              <MenuItem
                icon={<Upload size={20} />}
                text="Analyze Images"
              />
            </div>

            <MenuItem
              icon={<ScanSearch size={20} />}
              text="Results"
              onClick={() => navigate("/results")}
            />

            <MenuItem
              icon={<MapPinned size={20} />}
              text="Damage Map"
              onClick={() => navigate("/map")}
            />



            <MenuItem
              icon={<FileText size={20} />}
              text="Reports"
            />

            <MenuItem
              icon={<Settings size={20} />}
              text="Settings"
            />

            <MenuItem
              icon={<CircleHelp size={20} />}
              text="Help"
            />

          </div>

        </div>

        <div className="bg-white/10 rounded-2xl p-3 flex items-center gap-3">

          <User />

          <div>
            <p className="font-semibold">
              Admin
            </p>

            <p className="text-xs opacity-70">
              admin@system.com
            </p>
          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-5">

        <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">

          <h1 className="text-3xl font-bold">
            AI Damage Detection System
          </h1>

          <p className="text-slate-500 mt-2">
            Upload image and detect building damage using AI
          </p>

        </div>

        <div className="grid grid-cols-12 gap-5">

          {/* UPLOAD */}
          <div className="col-span-9 bg-white rounded-3xl p-5 shadow-sm">

            <h2 className="text-xl font-bold mb-4">
              Upload Image
            </h2>

            <div className="border-2 border-dashed border-[#216474]/30 rounded-3xl h-[300px] flex items-center justify-center">

              {preview ? (
                <img
                  src={preview}
                  className="h-[200px] object-contain rounded-2xl"
                  alt=""
                />
              ) : (
                <div className="text-center">

                  <Upload
                    className="text-[#216474] mx-auto mb-3"
                  />

                  <p className="font-semibold">
                    Upload Image
                  </p>

                </div>
              )}

            </div>

            <div className="mt-5 flex gap-3">

              <label className="bg-[#216474] text-white px-6 py-3 rounded-xl cursor-pointer flex items-center gap-2">

                <Upload size={16} />

                Upload

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />

              </label>

              <button
                onClick={handleAnalyze}
                disabled={loading || !selectedFile}
                className="
                  bg-[#216474]
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  disabled:opacity-50
                "
              >

                <Sparkles size={18} />

                {loading
                  ? "Analyzing..."
                  : "Start Analysis"}

                <ArrowRight size={18} />

              </button>

            </div>


            <div className="mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Select Image Location
                </h2>

                <LocationPicker
                    location={location}
                    setLocation={setLocation}
                />

            </div>
              
          </div>
          
          {/* SETTINGS */}

          <div className="col-span-3 bg-white rounded-3xl p-5 shadow-sm">

            <h2 className="text-xl font-bold mb-5">
              Analysis Settings
            </h2>

            <div className="space-y-5">

              {/* MODEL */}

              <div>

                <label className="flex items-center gap-2 font-medium">

                  <Brain size={18} />

                  AI Model

                </label>

                <select
                  value={model}
                  onChange={(e) =>
                    setModel(e.target.value)
                  }
                  className="w-full border p-3 rounded-xl mt-2"
                >

                  <option value="CNN">
                    CNN
                  </option>

                  <option value="ResNet50">
                    ResNet50
                  </option>

                </select>

              </div>

              {/* ANALYSIS TYPE */}

              <div>

                <label>
                  Analysis Type
                </label>

                <p className="text-xs text-slate-500 mt-1">

                  {mode === "single"
                    ? "Analyze one building"
                    : "Analyze entire area"}

                </p>

                <div className="flex gap-3 mt-3">

                  <button
                    onClick={() =>
                      setMode("single")
                    }
                    className={`flex-1 p-3 border rounded-xl ${
                      mode === "single"
                        ? "bg-[#216474] text-white"
                        : ""
                    }`}
                  >
                    Single
                  </button>

                  <button
                    onClick={() =>
                      setMode("area")
                    }
                    className={`flex-1 p-3 border rounded-xl ${
                      mode === "area"
                        ? "bg-[#216474] text-white"
                        : ""
                    }`}
                  >
                    Area
                  </button>

                </div>

              </div>

              {/* THRESHOLD */}

              <div>

                <label>
                  Threshold
                </label>

                <p className="text-[#216474] font-bold">
                  {threshold}%
                </p>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={threshold}
                  onChange={(e) =>
                    setThreshold(
                      e.target.value
                    )
                  }
                  className="w-full accent-[#216474]"
                />

              </div>

              {/* CURRENT SETTINGS */}

              <div className="bg-slate-50 rounded-2xl p-4">

                <h3 className="font-bold mb-3">
                  Current Settings
                </h3>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">

                    <span>
                      Model
                    </span>

                    <span className="font-semibold">
                      {model}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>
                      Mode
                    </span>

                    <span className="font-semibold">
                      {mode}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>
                      Threshold
                    </span>

                    <span className="font-semibold">
                      {threshold}%
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}