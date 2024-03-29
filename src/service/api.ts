import axios from "axios";

const api = axios.create({
  baseURL: "https://api2.binance.com/api/v3/",
});

const getTickerItems = async () => {
  try {
    const response = await api.get(`ticker/24hr`);
    return response.data;
  } catch (e) {
    console.warn(`getTickerItems error`, e);
    throw new Error(`Service error: ${e.message}`);
  }
};

export default api;
export { getTickerItems };
