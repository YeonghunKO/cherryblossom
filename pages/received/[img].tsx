import React from 'react';
import Head from 'next/head';
import { getImageUrlFromFirebase } from '@/src/utils';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Loading from '@/src/components/Loading/Loading';

const ReceivedComponent = dynamic(() => import('./ReceivedComponent'), {
  loading: () => <Loading />,
});

export default function Received({ imgUrl, imageName }: { imgUrl: string; imageName: string }) {
  return (
    <>
      <Head>
        <title>✨초대장이 도착했습니다✨</title>
      </Head>
      <ReceivedComponent imgUrl={imgUrl} imageName={imageName} />
    </>
  );
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const imgUrl = await getImageUrlFromFirebase(query.img as string);
  return {
    props: {
      imgUrl,
      imageName: query.img,
    },
  };
};
