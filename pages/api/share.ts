import { Dispatch, SetStateAction } from 'react';

export const copyLink = async (
  imageName: string,
  setPopToastMsg: Dispatch<SetStateAction<boolean>>,
  setCheckClickedBtn: Dispatch<SetStateAction<{ copy: boolean; save: boolean }>>
) => {
  try {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.value = `https://cherryblossom-chi.vercel.app/received/${imageName}`;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setPopToastMsg(true);
    setCheckClickedBtn(prev => {
      return { ...prev, copy: true };
    });
  } catch (error) {
    alert('링크 복사에 실패했어요.');
  }
};
