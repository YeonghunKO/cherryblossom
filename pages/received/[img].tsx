import CompleteLayout from '@/src/components/CompleteLayout';
import InterActionCard from '@/src/components/InterActionCard';
import React, { useState } from 'react';

import Head from 'next/head';
import { getImageUrlFromFirebase } from '@/src/utils';
import { GetServerSidePropsContext } from 'next';

export default function Received({ imgUrl, imageName }: { imgUrl: string; imageName: string }) {
  const [isAnimationOver, setIsAnimationOver] = useState(false);

  return (
    <>
      <Head>
        <title>✨초대장이 도착했습니다✨</title>
      </Head>
      <div className="relative flex h-full w-full items-center justify-center">
        {isAnimationOver ? (
          <CompleteLayout type="receive" imageUrl={imgUrl} imageName={imageName} />
        ) : (
          <InterActionCard
            needOpenBtn={true}
            imageUrl={imgUrl}
            setIsAnimationOver={setIsAnimationOver}
          />
        )}
      </div>
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
