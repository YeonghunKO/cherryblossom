import React, { ReactNode } from 'react';

const CardContainerBackGroundImg = React.memo(function backGroundImgComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative h-full w-full px-5 pt-[44px] pb-[66px]">
      <div className="relative flex h-full w-full justify-center rounded-[10px] border-4 border-solid border-[#F6F6F6] bg-[url('/backgrounds/0.svg')] bg-cover bg-center shadow-md">
        {children}
      </div>
    </div>
  );
});
export default CardContainerBackGroundImg;
