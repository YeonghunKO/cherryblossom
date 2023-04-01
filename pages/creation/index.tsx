// @ts-nocheck
import { useState } from 'react';
import Custom from '@/src/components/Creation/Custom';
import Display from '@/src/components/Creation/Display';
import PageTitle from '@/src/components/Creation/PageTitle';
import { saveImg } from '@/src/utils';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { flushSync } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import { ItemObjectType } from '../../src/components/Creation/Display';
import Modal from '@/src/components/Creation/Modal';
import { MESSAGE } from '@/src/constants/message';

/**
 * 초대장 생성 페이지
 */

type CustomTypes = 'background' | 'character' | 'sticker';

const Creation = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<CustomTypes>('background');
  const [selectedBackground, setSelectedBackground] = useState<number>(0);

  const [textValue, setTextValue] = useState('');
  const [visibleCancelBtn, setVisibleCancelBtn] = useState('visible');

  const [editableItem, setEditableItem] = useState<ItemObjectType | null>();
  const [characters, setCharacters] = useState<ItemObjectType[]>([]);
  const [stickers, setStickers] = useState<ItemObjectType[]>([]);
  const [draggable, setDraggable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonActiveCondition = textValue === MESSAGE.placeholder || !textValue.length;

  const handleClickCreation = async () => {
    flushSync(() => {
      setVisibleCancelBtn('hidden'); // X 버튼 hidden
    });

    const filename = uuidv4();

    await saveImg('outerDisplay', filename);
    router.push({
      pathname: '/complete/[img]',
      query: { img: filename },
    });
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!draggable) return;

    const displayRect = document.querySelector('#display')?.getBoundingClientRect();
    const displayLeft = displayRect?.left; // 전체 브라우저 화면에서 현재 page 컴포넌트 기준으로 좌표 계산
    const displayTop = displayRect?.top;

    if (e.type === 'touchmove') {
      // 모바일 터치 환경
      setEditableItem(prev => {
        if (prev === null) return prev;
        return {
          ...prev,
          offsetX: e.nativeEvent.touches?.[0].clientX - displayLeft,
          offsetY: e.nativeEvent.touches?.[0].clientY - displayTop,
        };
      });
    } else {
      // 브라우저 클릭 환경
      setEditableItem(prev => {
        if (prev === null) return prev;
        return {
          ...prev,
          offsetX: e.clientX - displayLeft,
          offsetY: e.clientY - displayTop,
        };
      });
    }
  };

  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    if (!editableItem) return;
    e.preventDefault(); // mouseUp 뒤에 따라오는 click event 막기

    document.querySelector('body').classList.remove('overflow-hidden');
    document.querySelector('body').classList.remove('h-full');
    const category = editableItem.category;

    sessionStorage.setItem(
      category,
      JSON.stringify(
        category === 'character' ? [...characters, editableItem] : [...stickers, editableItem]
      )
    );

    category === 'character'
      ? setCharacters(prev => [...prev, editableItem])
      : setStickers(prev => [...prev, editableItem]);
    setDraggable(false);
    setEditableItem(null);
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
        {isModalOpen && <Modal handleModal={data => setIsModalOpen(data)} />}

        <PageTitle />
        <Display
          selectedBackground={selectedBackground}
          setSelectedBackground={(item: number) => setSelectedBackground(item)}
          textValue={textValue}
          setTextValue={(input: string) => setTextValue(input)}
          visibleCancelBtn={visibleCancelBtn}
          characters={characters}
          stickers={stickers}
          setCharacters={(characters: ItemObjectType[]) => setCharacters(characters)}
          setStickers={(stickers: ItemObjectType[]) => setStickers(stickers)}
          editableItem={editableItem}
          setEditableItem={(item: ItemObjectType) => setEditableItem(item)}
          handleMouseMove={handleMouseMove}
          setDraggable={setDraggable}
          setIsModalOpen={setIsModalOpen}
        />
        <Custom
          selectedBackground={selectedBackground}
          setSelectedBackground={(item: number) => setSelectedBackground(item)}
          selectedItem={selectedItem}
          setSelectedItem={(item: CustomTypes) => setSelectedItem(item)}
          setEditableItem={(item: ItemObjectType) => setEditableItem(item)}
          handleMouseMove={(e: MouseEvent | TouchEvent) => handleMouseMove(e)}
          setCharacters={(item: ItemObjectType) => setCharacters(item)}
          setStickers={(item: ItemObjectType) => setStickers(item)}
        />
        <button
          disabled={buttonActiveCondition}
          onClick={handleClickCreation}
          className={`fixed bottom-0 z-10 h-12 w-full bg-blossom-gray font-pretendard font-bold web:w-[360px] basic:w-full  ${
            buttonActiveCondition ? 'bg-blossom-gray text-gray-400' : ' bg-blossom-green'
          }`}
        >
          초대장 완성하기
        </button>
      </div>
    </>
  );
};

export default Creation;

export const getStaticProps = (context: GetStaticPropsContext) => {
  return {
    props: {},
  };
};
