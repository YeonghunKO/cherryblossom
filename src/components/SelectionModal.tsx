import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import imageSrc from '../../public/modal_face_icon.svg';

type Props = {
  message: string;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  handleClickAgreeButton: () => void;
};
export default function SelectionModal({ message, setIsModal, handleClickAgreeButton }: Props) {
  return (
    <div className="z-100 absolute top-52 z-50 flex w-full justify-center font-pretendard">
      <div className="absolute left-1/2 z-20 flex h-[91px] w-full max-w-[320px] translate-y-[-50%] translate-x-[-50%] flex-col items-center justify-around rounded-[6px] bg-white px-[25px] shadow-md ">
        <div className="flex">
          <Image src={imageSrc} width={20} height={20} alt="img" />
          <p className="ml-[7px] text-[15px] font-bold leading-[24px]">{message}</p>
        </div>
        <div className="flex w-[296px] justify-center border-t border-solid border-[#D9D9D9] pt-2.5">
          <div>
            <button
              onClick={() => setIsModal(false)}
              className="h-[27px] w-[101px] rounded-[8px] border border-solid border-[#D9D9D9] bg-[#F6F6F6]"
            >
              취소
            </button>
            <button
              onClick={handleClickAgreeButton}
              className="ml-[15px] h-[27px] w-[101px] rounded-[8px] border border-solid border-[#D9D9D9] bg-[#F6F6F6]"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
