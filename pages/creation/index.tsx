// @ts-nocheck
import { useState } from 'react';
import Custom from '@/src/components/Creation/Custom';
import Display from '@/src/components/Creation/Display';
import PageTitle from '@/src/components/Creation/PageTitle';
import { saveImg } from '@/src/utils';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head';
import { flushSync } from 'react-dom';
import { ItemObjectType } from '../../src/components/Creation/Display';

/**
 * 초대장 생성 페이지
 */

/**
 * [아메 TODO]
 * 완성된 디자인 추가하기✅
 * 완성하기 버튼 아래 고정하기 ✅
 * 버튼 간격 조정 ✅
 * 스크롤바 안보이게 ✅
 * 이미지 캡쳐 시 줄 바꿈 안되는 문제 확인하기✅
 * 글씨 크기 수정하기(title, button)✅
 * 스타일링
 * 로딩 스피너
 */
type CustomTypes = 'background' | 'character' | 'sticker';

const Creation = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<CustomTypes>('background');
  const [selectedBackground, setSelectedBackground] = useState<number | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [textValue, setTextValue] = useState('');
  const [visibleCancelBtn, setVisibleCancelBtn] = useState('visible');
  const [item, setItem] = useState<ItemObjectType | null>();
  const [characters, setCharacters] = useState<ItemObjectType[]>([]);
  const [stickers, setStickers] = useState<ItemObjectType[]>([]);

  const handleClickCreation = async () => {
    flushSync(() => {
      setVisibleCancelBtn('hidden'); // X 버튼 hidden
    });

    const filename = uuidv4();
    
    await saveImg('display', filename);    
    router.push({
      pathname: '/complete/[img]',
      query: { img: filename },
    });
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const pageRect = document.querySelector('#creation-page')?.getBoundingClientRect();
    const pageLeft = pageRect?.left; // 전체 브라우저 화면에서 현재 page 컴포넌트 기준으로 좌표 계산
    const pageTop = pageRect?.top;

    if (e.nativeEvent?.touches) {
      // 모바일 터치 환경
      setItem(prev => {
        if (prev === null) return prev;
        return {
          ...prev,
          offsetX: e.nativeEvent.touches?.[0].clientX,
          offsetY: e.nativeEvent.touches?.[0].clientY,
        };
      });
    } else {
      // 브라우저 클릭 환경
      setItem(prev => {
        if (prev === null) return prev;
        return {
          ...prev,
          offsetX: e.clientX - pageLeft,
          offsetY: e.clientY - pageTop,
        };
      });
    }
  };

  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    if (!item) return;

    document.removeEventListener('mousemove', e => handleMouseMove(e));
    document.querySelector('#creation-page')?.classList.remove('overflow-hidden');
    document.querySelector('#creation-page')?.classList.remove('cursor-pointer');

    const displayRect = document.querySelector('#display')?.getBoundingClientRect();
    const displayLeft = displayRect!.left; // display의 시작 left, top 좌표 값은 기기마다 달라짐
    const displayTop = displayRect!.top;
    const offsetX = (e.nativeEvent?.touches ? item.offsetX : e.clientX) - displayLeft;
    const offsetY = (e.nativeEvent?.touches ? item.offsetY : e.clientY) - displayTop;

    let id = sessionStorage.getItem('itemId') ? parseInt(sessionStorage.getItem('itemId')) + 1 : 0;
    sessionStorage.setItem('itemId', id);

    const itemObject: ItemObjectType = {
      // session에 저장할 객체
      offsetX,
      offsetY,
      path: item.path,
      id,
    };

    selectedItem === 'character' ? setSelectedCharacter(null) : setSelectedSticker(null);

    selectedItem === 'character'
      ? setCharacters(prev => [...prev, itemObject])
      : setStickers(prev => [...prev, itemObject]);

    sessionStorage.setItem(
      selectedItem,
      JSON.stringify(
        selectedItem === 'character' ? [...characters, itemObject] : [...stickers, itemObject]
      )
    );

    setItem(null);
  };

  return (
    <>
      <Head>
        <title>초대장을 만들어보아요</title>
      </Head>
      <div
        id="creation-page"
        className="relative h-full w-full"
        onMouseUp={e => handleMouseUp(e)}
        onTouchEnd={e => handleMouseUp(e)}
      >
        <PageTitle />
        <Display
          selectedBackground={selectedBackground}
          selectedCharacter={selectedCharacter}
          selectedSticker={selectedSticker}
          textValue={textValue}
          setTextValue={(input: string) => setTextValue(input)}
          visibleCancelBtn={visibleCancelBtn}
          characters={characters}
          stickers={stickers}
          setCharacters={(characters: ItemObjectType[]) => setCharacters(characters)}
          setStickers={(stickers: ItemObjectType[]) => setStickers(stickers)}
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
          setItem={(item: ItemObjectType) => setItem(item)}
          handleMouseMove={(e: MouseEvent | TouchEvent) => handleMouseMove(e)}
        />
        {item && (
          <img
            src={item.path}
            alt={'dragedItem'}
            width={30}
            height={30}
            className="absolute"
            style={{
              left: `${item.offsetX}px`,
              top: `${item.offsetY}px`,
              transform: 'translate(-100%,-100%)',
            }}
          />
        )}
        <button
          disabled={!textValue.length}
          onClick={handleClickCreation}
          className={`fixed bottom-0 z-10 h-12 w-full bg-blossom-gray font-pretendard font-bold md:w-[360px] ${
            !textValue.length ? 'bg-blossom-gray text-gray-400' : ' bg-blossom-green'
          }`}
        >
          초대장 완성하기
        </button>
      </div>
    </>
  );
};

export default Creation;
