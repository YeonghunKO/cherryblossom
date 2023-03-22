import Image from 'next/image';
import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import CardContainerBackGroundImg from './CardContainerBackGroundImg';

export default function InterActionCard({
  needOpenBtn,
  setIsAnimationOver,
  image,
}: {
  needOpenBtn: boolean;
  setIsAnimationOver?: Dispatch<SetStateAction<boolean>>;
  image: ReactElement;
}) {
  const [isPullOut, setIsPullOut] = useState(false);
  const [isOpenBtn, setIsOpenBtn] = useState(false);

  useEffect(() => {
    if (!needOpenBtn) {
      const pullOut = setTimeout(() => {
        setIsPullOut(true);
      }, 500);
      return () => clearTimeout(pullOut);
    }
  }, [isPullOut, needOpenBtn]);

  useEffect(() => {
    if (needOpenBtn) {
      setIsOpenBtn(true);
    }
  }, [needOpenBtn]);

  const handleClickOpenBtn = () => {
    setIsOpenBtn(false);

    const pullOut = () => setIsPullOut(true);
    setTimeout(pullOut, 500);

    if (setIsAnimationOver) {
      const animation = () => setIsAnimationOver(true);
      setTimeout(animation, 2200);
    }
  };

  return (
    <CardContainerBackGroundImg>
      <div className="absolute z-0 mt-[260px] h-[110px] w-[250px] bg-white bg-auto"></div>
      <div className="absolute z-20 mt-[260px] flex justify-center">
        <Image src="/envelopeLower.svg" alt="evelopeLower" width={254} height={120} priority />
        {isOpenBtn && (
          <button
            onClick={handleClickOpenBtn}
            className="absolute bottom-10 h-8 w-[114px] cursor-pointer rounded-[55px] border border-solid border-[#EDEDED] bg-[#FFFFFF]"
          >
            초대장 열기
          </button>
        )}
      </div>
      <div
        className={`absolute z-10 mt-[180px] origin-bottom ${
          !isOpenBtn ? 'animate-[envelope_500ms_linear]' : 'rotate-180'
        }`}
      >
        <Image src="/envelopeTop.svg" alt="evelopeLower" width={258} height={80} priority />
      </div>

      {isPullOut && (
        <div
          className="z-20 mt-[120px] flex h-[260px] w-[280px] animate-[pull-out_1500ms] items-center justify-center overflow-hidden rounded-[10px] border border-solid border-[#FDC7D4]
                bg-white ease-in-out"
        >
          <div className="relative h-full w-full">{image}</div>
        </div>
      )}
    </CardContainerBackGroundImg>
  );
}
