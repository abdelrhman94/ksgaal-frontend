import HttpService from '@/libs/axiosKeycloak';

const getHomeNews = async (lang: string | undefined, count: number) => {
  const response = await HttpService.get(
    `/News/GetHomeNews?count=${count}&lang=${lang}`
  );
  return response.data;
};

const HomeService = {
  getHomeNews,
};
export default HomeService;
