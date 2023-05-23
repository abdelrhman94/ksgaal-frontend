import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppContext } from 'next/app';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

function App({ Component, pageProps, headerData }: any) {
  const router = useRouter();
  const dir = router.locale === 'ar' ? 'rtl' : 'ltr'; // define direction of html tag

  // define query client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            staleTime: 500,
          },
        },
      })
  );

  useEffect(() => {
    document?.querySelector('html')?.setAttribute('dir', dir);
    document?.querySelector('body')?.setAttribute('dir', dir);
  }, [dir, router.locale]);

  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Expires" content="0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout headerData={headerData}>
          <Hydrate state={(pageProps as any)?.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </Layout>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  let isError = false;
  const queryClient = new QueryClient();
  let headerData;
  try {
    headerData = await queryClient.fetchQuery([], () => {});
  } catch (error) {
    isError = true;
  }
  return {
    isError,
    dehydratedState: dehydrate(queryClient),
    headerData,
  };
};

export default App;
