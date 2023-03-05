import Layout from '@/src/components/Layout';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';
import { DEFAULT_SEO } from '@/src/constants/defaultSEO';
import { isEmptyObj } from '@/src/utils';
import SEO from '@/src/components/common/SEO';

import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
