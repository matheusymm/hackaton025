import { getVideosIdsByQuery } from "./getVideosIdsByQuery";

(async () => {
  try {
    const videos = await getVideosIdsByQuery("laptop+RAM+SSD+armazenamento");
    console.log("IDs dos vídeos encontrados:", videos);
  } catch (err) {
    console.error("Erro ao testar:", err);
  }
})();
