import Loading from '@/src/components/Loading/Loading';
import { getImageUrlFromFirebase } from '@/src/utils';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

const CompleteComponent = dynamic(() => import('./CompleteComponent'), {
  loading: () => <Loading />,
});

export default function Complete({ imgUrl, imageName }: { imgUrl: string; imageName: string }) {
  return (
    <>
      <Head>
        <title>초대장이 완성되었어요!</title>
      </Head>
      <CompleteComponent imgUrl={imgUrl} imageName={imageName} />
    </>
  );
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  console.log(query);
  const imgUrl = await getImageUrlFromFirebase(query.img as string);
  return {
    props: {
      imgUrl,
      imageName: query.img,
    },
  };
};
