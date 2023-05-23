import apiClient from "@/libs/axios";


const getAllNews = async (lang: any) => {
  const response = await apiClient.get<any>(`${lang}/api/v1/news`);
  return response.data;
};

const NewsService = {
  getAllNews,
};
export default NewsService;
