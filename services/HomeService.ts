import apiClient from '@/libs/axios';

const getHomeNews = async (lang: string | undefined, count: number) => {
  const response = await apiClient.get(
    `/News/GetHomeNews?count=${count}&lang=${lang}`
  );
  return response.data;
};

const HomeService = {
  getHomeNews,
};
export default HomeService;
