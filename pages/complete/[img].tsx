import CompleteLayout from '@/src/components/CompleteLayout';
import InterActionCard from '@/src/components/InterActionCard';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getImageUrlFromFirebase } from '@/src/utils';

export default function Complete() {
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const router = useRouter();
  const imageName = router.query.img as string;

  useEffect(() => {
    const getUrlString = async () => {
      const getImageUrl = await getImageUrlFromFirebase(imageName);
      setImageUrl(getImageUrl);
    };
    getUrlString();
  }, [imageName]);

  useEffect(() => {
    const animation = setTimeout(() => {
      setIsAnimationOver(true);
    }, 2200);
    return () => clearTimeout(animation);
  }, [isAnimationOver]);

  return (
    <>
      <Head>
        <title>초대장이 완성되었어요!</title>
      </Head>
      <div className="w-full h-full flex justify-center items-center relative">
        {isAnimationOver ? (
          <CompleteLayout type="complete" imageUrl={imageUrl} imageName={imageName} />
        ) : (
          <InterActionCard needOpenBtn={false} imageUrl={imageUrl} />
        )}
      </div>
    </>
  );
}
