import React, { useEffect, useState } from 'react';
import InterActionCard from '@/src/components/InterActionCard';
import { useRouter } from 'next/router';
import { getImageUrlFromFirebase } from '@/src/utils';
import dynamic from 'next/dynamic';
import Loading from '@/src/components/Loading/Loading';

const CompleteLayout = dynamic(() => import('@/src/components/CompleteLayout'));

export default function CompleteComponent() {
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const imageName = router.query.img as string;

  useEffect(() => {
    const getUrlString = async () => {
      const getImageUrl = await getImageUrlFromFirebase(imageName);
      setImageUrl(getImageUrl);
    };
    getUrlString();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [imageName]);

  useEffect(() => {
    const animation = setTimeout(() => {
      setIsAnimationOver(true);
    }, 4200);
    return () => clearTimeout(animation);
  }, [isAnimationOver]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : isAnimationOver ? (
        <CompleteLayout type="complete" imageUrl={imageUrl} imageName={imageName} />
      ) : (
        <InterActionCard needOpenBtn={false} imageUrl={imageUrl} />
      )}
    </div>
  );
}
