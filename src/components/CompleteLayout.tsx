import { copyLink } from '@/pages/api/share';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ToastMessage from '@/src/components/ToastMessage';
import { saveImgToUser } from '../utils';

type propsType = {
  type: 'complete' | 'receive';
  imageUrl: string | undefined;
  imageName: string;
};

export default function CompleteLayout({ type, imageUrl, imageName }: propsType) {
  const [popToastMsg, setPopToastMsg] = useState(false);
  const [toastType, setToastType] = useState<'copy' | 'save'>('copy');
  const [checkClickedBtn, setCheckClickedBtn] = useState({ copy: false, save: false });
  const router = useRouter();

  const handleClickShareBtn = () => {
    setToastType('copy');
    if (imageName) copyLink(imageName, setPopToastMsg, setCheckClickedBtn);
  };

  const handleClickRewriteBtn = () => {
    if (type === 'complete') {
      router.push('/creation');
    } else {
      router.push('/intro');
    }
  };

  const handleClickSaveImgBtn = () => {
    setToastType('save');
    if (imageUrl !== undefined) {
      saveImgToUser(imageUrl, imageName);
      setPopToastMsg(true);
    }
    setCheckClickedBtn(prev => {
      return { ...prev, save: true };
    });
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center">
        <ToastMessage
          popToastMsg={popToastMsg}
          setPopToastMsg={setPopToastMsg}
          image={toastType === 'copy' ? '/mail_icon.svg' : '/photo_icon.svg'}
          message={
            toastType === 'copy' ? '초대장 링크가 복사되었습니다.' : '초대장이 앨범에 담겼습니다.'
          }
        />
      </div>
      <div className="px-5 pt-[44px]">
        <section id="card">
          <div className="relative w-[320px] h-[300px] mt-[66px] flex justify-center items-center border border-solid border-pink-200 bg-white z-20 rounded-[10px] shadow-md">
            <div className="absolute top-[-20px] bg-[#FEEFF4] w-[240px] h-[40px] flex justify-center items-center rounded-[10px] border-[3px] border-solid border-[#FFC9D4] shadow-blossom-pink drop-shadow-pageTitle">
              벚꽃 초대장
            </div>
            {imageUrl !== undefined && (
              <Image src={imageUrl} alt="image" width="300" height="300" />
            )}
          </div>
        </section>

        {type === 'complete' ? (
          <section id="middleBtn" className="w-full flex justify-between mt-4">
            <button
              onClick={handleClickShareBtn}
              className={`${
                checkClickedBtn.copy ? 'bg-btn-yellow' : 'bg-btn-yellow'
              } h-[50px] grow-0 w-full rounded-[10px] border border-solid border-white cursor-pointer`}
            >
              <p>편지 보내기</p>
            </button>
            <button
              onClick={handleClickRewriteBtn}
              className={`${
                checkClickedBtn.copy ? 'bg-btn-yellow' : 'bg-btn-yellow'
              } ml-[15px] w-full grow-0 h-[50px] rounded-[10px] border border-solid border-white cursor-pointer`}
            >
              <p>다시 작성하기</p>
            </button>
          </section>
        ) : (
          <section id="middleBtn" className="w-full flex justify-between mt-4">
            <button
              onClick={handleClickRewriteBtn}
              className="bg-btn-yellow w-full grow-0 h-[50px] rounded-[10px] border border-solid border-white cursor-pointer"
            >
              <p>나도 초대장 만들어보기</p>
            </button>
          </section>
        )}
      </div>
      <section
        id="footerBtn"
        onClick={handleClickSaveImgBtn}
        className={`${
          checkClickedBtn.save ? 'bg-[#E6ADAD]' : 'bg-[#AFE6AD]'
        } absolute bottom-0 w-full h-[48px] flex justify-center cursor-pointer`}
      >
        <button disabled={checkClickedBtn.save}>내 앨범에 담기</button>
      </section>
    </div>
  );
}
