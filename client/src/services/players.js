import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1/players/";

export const getAllPlayers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const saveAllPlayers = async (players) => {
    const res = await axios.post(baseUrl, { players: players });
    return res.data;
}