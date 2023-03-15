import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { app } from '@/src/lib/firebase';

import html2canvas from 'html2canvas';

export const saveImg = (id: string, filename: string) => {
  const capture: HTMLElement | null = document.querySelector(`#${id}`);

  if (capture !== null) {
    return html2canvas(capture)
      .then(canvas => canvas.toDataURL(filename))
      .then(data => sendImgToFirebase(data, filename));
  }
};

const sendImgToFirebase = async (data: string, filename: string) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, filename);
  return uploadString(storageRef, data, 'data_url');
};

// 사용자가 이미지를 저장하려고 할 때
export const saveImgToUser = (uri: string, filename: string) => {
  let link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};

export const getImageUrlFromFirebase = async (imageName: string): Promise<string> => {
  const storage = getStorage();
  const imageRef = ref(storage, imageName);
  try {
    const urlstring = await getDownloadURL(imageRef);
    return urlstring;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const isEmptyObj = (obj: any) => {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};
