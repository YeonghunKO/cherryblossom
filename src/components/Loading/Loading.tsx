import Image from 'next/image';
import React from 'react';
import BackGroundImg from '../CardContainerBackGroundImg';

export default function Loading() {
  return (
    <BackGroundImg>
      <div className="h-full w-full bg-[#040404] bg-opacity-50">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image src="/loading.gif" width="131" height="86" alt="loading-img" />
          <p className="mt-5 flex h-8 w-[237px] items-center justify-center rounded-full border-2 border-solid border-[#EDEDED] bg-white">
            지금 초대장을 제작하고 있습니다
          </p>
        </div>
      </div>
    </BackGroundImg>
  );
}
