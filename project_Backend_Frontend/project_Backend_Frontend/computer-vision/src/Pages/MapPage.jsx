import {
  MapPinned,
  ScanSearch,
  Upload,
  User,
  FileText,
  Settings,
  CircleHelp,
  BarChart3,
  RefreshCw,
  ArrowLeft
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import { getMapData } from "../services/mapApi";

import { useNavigate } from "react-router-dom";

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

export default function MapPage() {

  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState([]);

const iconGreen = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const iconOrange = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const iconRed = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const getMarkerIcon = (damage) => {

  if (damage >= 80)
    return iconRed;

  if (damage >= 30)
    return iconOrange;

  return iconGreen;

};

const loadData = async () => {

  try {

    const data = await getMapData();

    setAnalyses(data);

  } catch (err) {

    console.log(err);

  }

};

useEffect(() => {

  loadData();

}, []);



  return (

    <div className="h-screen flex bg-slate-100">

      {/* ================= Sidebar ================= */}

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

            <MenuItem
              icon={<Upload size={20} />}
              text="Analyze Images"
              onClick={() => navigate("/analyze")}
            />

            <MenuItem
              icon={<ScanSearch size={20} />}
              text="Results"
              onClick={() => navigate("/results")}
            />

            <div className="bg-[#216474]/20 border border-[#216474] rounded-xl">

              <MenuItem
                icon={<MapPinned size={20} />}
                text="Damage Map"
              />

            </div>

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

      {/* ================= Main ================= */}

      <div className="flex-1 overflow-y-auto p-5">

        <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">

          <h1 className="text-3xl font-bold">
            Damage Assessment Map
          </h1>

          <p className="text-slate-500 mt-2">

            Interactive GIS Map for Building Damage Analysis

          </p>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-bold">

              Interactive Map

            </h2>

            <div className="flex gap-3">

              <button
                onClick={loadData}
                className="bg-[#216474] text-white px-5 py-2 rounded-xl flex items-center gap-2"
              >

                <RefreshCw size={18} />

                Refresh

              </button>

              <button
                onClick={() => navigate("/results")}
                className="border px-5 py-2 rounded-xl flex items-center gap-2"
              >

                <ArrowLeft size={18} />

                Back

              </button>

            </div>

          </div>

          {/* هنا سنضع الخريطة */}

          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              height: "600px"
            }}
          >

            {
                <MapContainer
  center={[35.8, 36.6]}
  zoom={9}
  style={{
    height: "100%",
    width: "100%"
  }}
>

  <TileLayer
    attribution="&copy; OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {

    analyses.map((item, index) => {

      const lat = Number(item.location?.latitude);
      const lng = Number(item.location?.longitude);

      if (isNaN(lat) || isNaN(lng))
        return null;

      const damage =
        item.damage_percent ??
        item.statistics?.average_damage ??
        0;

      return (

        <Marker
          key={index}
          position={[lat, lng]}
          icon={getMarkerIcon(damage)}
        >

          <Popup>

            <div className="space-y-2">

              <h3 className="font-bold">

                {item.location?.village}

              </h3>

              <p>

                Damage :

                {" "}

                {damage}%

              </p>

              {

                item.mode === "single"

                  ?

                  <>

                    <p>

                      Class :

                      {" "}

                      {item.class}

                    </p>

                  </>

                  :

                  <>

                    <p>

                      Buildings :

                      {" "}

                      {item.buildings?.length}

                    </p>

                    <p>

                      Affected Population :

                      {" "}

                      {item.statistics?.affected_population}

                    </p>

                  </>

              }

            </div>

          </Popup>

        </Marker>

      );

    })

  }

</MapContainer>
            
            }

          </div>

        </div>

      </div>

    </div>

  );

}