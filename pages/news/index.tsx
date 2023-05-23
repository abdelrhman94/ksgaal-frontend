import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NewsService from '@/services/NewsService';
import { useRouter } from 'next/router';

const index: FC = () => {
  const { locale } = useRouter();
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['fetch news', locale],
    queryFn: () => NewsService.getAllNews(locale),
  });

  console.log('first', data);
  return (
    <>
      <h1>News Page</h1>
    </>
  );
};
export default index;
