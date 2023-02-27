import { useState } from 'react';
import Custom from '@/src/components/Creation/Custom';
import Display from '@/src/components/Creation/Display';
import PageTitle from '@/src/components/Creation/PageTitle';
import { saveImg } from '@/src/utils';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head';

/**
 * 초대장 생성 페이지
 */
type CustomTypes = 'background' | 'character' | 'sticker';
const Creation = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<CustomTypes>('background');
  const [selectedBackground, setSelectedBackground] = useState<number | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [isTextEmpty, setIsTextEmpty] = useState(true);
  const handleClickCreation = async () => {
    const filename = uuidv4();
    await saveImg('display', filename);
    const move = () =>
      router.push({
        pathname: '/complete/[img]',
        query: { img: filename },
      });
    setTimeout(move, 2000);
  };

  return (
    <>
      <Head>
        <title>초대장을 만들어보아요</title>
      </Head>
      <PageTitle />
      <Display
        selectedItem={selectedItem}
        selectedBackground={selectedBackground}
        selectedCharacter={selectedCharacter}
        selectedSticker={selectedSticker}
        isTextEmpty={isTextEmpty}
        setIsTextEmpty={(flag: boolean) => setIsTextEmpty(flag)}
      />
      <Custom
        selectedBackground={selectedBackground}
        selectedCharacter={selectedCharacter}
        selectedSticker={selectedSticker}
        setSelectedBackground={(item: number | null) => setSelectedBackground(item)}
        setSelectedCharacter={(item: number | null) => setSelectedCharacter(item)}
        setSelectedSticker={(item: number | null) => setSelectedSticker(item)}
        selectedItem={selectedItem}
        setSelectedItem={(item: CustomTypes) => setSelectedItem(item)}
      />
      <button
        disabled={isTextEmpty}
        onClick={handleClickCreation}
        className={`w-[360px] font-pretendard font-bold h-12 ${
          isTextEmpty ? 'bg-blossom-gray text-gray-400' : ' bg-blossom-green'
        } bg-blossom-gray fixe left-0 right-0`}
      >
        초대장 완성하기
      </button>
    </>
  );
};

export default Creation;
