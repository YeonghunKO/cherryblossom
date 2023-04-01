import { ERROR_MESSAGE, MESSAGE } from '@/src/constants/message';
import { FocusEvent, KeyboardEvent } from 'react';

export const handleTextBlur = (event: FocusEvent<HTMLDivElement>) => {
  if (event.target.innerText === '') {
    event.target.innerText = MESSAGE.placeholder;
  }
};

export const handleTextFocus = (event: FocusEvent<HTMLDivElement>) => {
  if (event.target.innerText === MESSAGE.placeholder) {
    event.target.innerText = '';
  }
};

export const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  const lines = event.target.innerHTML.split('<div>');
  // h-140px일 떄 최대 height는 8
  // 8줄일 때 enter 입력 금지
  if (event.key === 'Enter' && lines.length === 8) {
    event.preventDefault();
    return alert(ERROR_MESSAGE.message_length_limit);
  }

  // 8줄 이상이면 입력 금지
  if (lines.length > 8 && event.key !== 'Backspace') {
    event.preventDefault();
    return alert(ERROR_MESSAGE.message_length_limit);
  }

  // 엔터를 입력하지 않고 그냥 쓸 때 100자 이상 입력 금지
  if (event.target.innerText.length >= 120 && event.key !== 'Backspace') {
    event.preventDefault();
    return alert(ERROR_MESSAGE.message_length_limit);
  }
};
