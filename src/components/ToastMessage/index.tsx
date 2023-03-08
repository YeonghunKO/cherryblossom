import { Dispatch, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

function ToastMessage(props: {
  image: StaticImageData | string;
  popToastMsg: boolean;
  setPopToastMsg: Dispatch<SetStateAction<boolean>>;
  message: string;
}) {
  const { image, popToastMsg, setPopToastMsg, message } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopToastMsg(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [popToastMsg, setPopToastMsg]);

  return (
    <>
      {popToastMsg && (
        <div className="absolute">
          <div className="top-1/10 mx-30 relative left-1/2 z-10 mt-11 flex h-[44px] w-[296px] translate-y-[-50%] translate-x-[-50%] items-center justify-center rounded-[6px] bg-white">
            <Image src={image} width={22} height={18} alt="img" />
            <p className="mx-3 leading-4">{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ToastMessage;
