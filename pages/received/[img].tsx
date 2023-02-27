import CompleteLayout from '@/src/components/CompleteLayout';
import InterActionCard from '@/src/components/InterActionCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { getImageUrlFromFirebase } from '@/src/utils';

export default function Received() {
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  const [needOpenBtn, setNeedOpenBtn] = useState(true);
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

  return (
    <>
      <Head>
        <title>✨초대장이 도착했습니다✨</title>
      </Head>
      <div className="w-full h-full flex justify-center items-center relative">
        {isAnimationOver ? (
          <CompleteLayout type="receive" imageUrl={imageUrl} imageName={imageName} />
        ) : (
          <InterActionCard
            needOpenBtn={needOpenBtn}
            imageUrl={imageUrl}
            setIsAnimationOver={setIsAnimationOver}
          />
        )}
      </div>
    </>
  );
}
