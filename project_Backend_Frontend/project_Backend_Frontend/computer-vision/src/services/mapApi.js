import axios from "axios";

const API = "http://localhost:5000";

export const getMapData = async () => {
    const response = await axios.get(`${API}/map-data`);
    return response.data;
};