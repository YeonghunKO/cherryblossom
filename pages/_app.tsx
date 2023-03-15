import Layout from '@/src/components/Layout';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';
import { DEFAULT_SEO } from '@/src/constants/defaultSEO';
import { isEmptyObj } from '@/src/utils';
import SEO from '@/src/components/common/SEO';

import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../src/lib/gtag'

export default function App({ Component, pageProps }: AppProps) {
  // GA 설정 
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <script async  src="https://www.googletagmanager.com/gtag/js?id=G-5E1HZMVFPL"  />
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5E1HZMVFPL');`}} />

      {isEmptyObj(pageProps) ? (
        <DefaultSeo {...DEFAULT_SEO} />
      ) : (
        <SEO imageName={pageProps.imageName} />
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
}
