import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1/characters";

export const getAllCharacters = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};
