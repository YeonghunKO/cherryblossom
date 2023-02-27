import { Dispatch, SetStateAction } from 'react';

export const copyLink = async (
  imageName: string,
  setPopToastMsg: Dispatch<SetStateAction<boolean>>,
  setCheckClickedBtn: Dispatch<SetStateAction<{ copy: boolean; save: boolean }>>
) => {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}/received/${imageName}`);
    setPopToastMsg(true);
    setCheckClickedBtn(prev => {
      return { ...prev, copy: true };
    });
  } catch (error) {
    alert('링크 복사에 실패했어요.');
  }
};
