import React, { useEffect, useState } from 'react';
import CompleteLayout from '@/src/components/CompleteLayout';
import InterActionCard from '@/src/components/InterActionCard';
import { useRouter } from 'next/router';
import { getImageUrlFromFirebase } from '@/src/utils';

export default function CompleteComponent() {
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
    <div className="relative flex h-full w-full items-center justify-center">
      {isAnimationOver ? (
        <CompleteLayout type="complete" imageUrl={imageUrl} imageName={imageName} />
      ) : (
        <InterActionCard needOpenBtn={false} imageUrl={imageUrl} />
      )}
    </div>
  );
}
