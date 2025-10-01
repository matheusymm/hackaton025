import axios from "axios";
import "dotenv/config";
const API_KEY = "AIzaSyAwCW4eSvBExvDdItM_Nww8yKQcj0hclAk";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

interface YoutubeApiResponse {
  items: {
    id: {
      videoId: string;
    };
  }[];
}

export const getVideosIdsByQuery = async (query: string, duration: "short") => {
  if (!API_KEY) {
    throw new Error(
      "Chave da API do YouTube não encontrada. Verifique o arquivo .env"
    );
  }

  try {
    const response = await axios.get<YoutubeApiResponse>(BASE_URL, {
      params: {
        key: API_KEY,
        part: "snippet",
        q: query,
        type: "video",
        videoDuration: duration,
        maxResults: 100,
      },
    });

    const videoIds = response.data.items.map((item) => item.id.videoId);
    return videoIds;
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    throw new Error("Não foi possível buscar os vídeos.");
  }
};
