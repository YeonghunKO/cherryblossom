// @ts-nocheck

import Image from 'next/image';
import { CategoryTypes, ItemObjectType } from '../Display';
import { BACKGROUND_IMAGE, CHARACTER_IMAGE, STICKER_IMAGE } from './staticResources';

type CustomTypes = 'background' | 'character' | 'sticker';

type CustomProps = {
  selectedBackground: number;
  setSelectedBackground: (item: number) => void;
  selectedItem: CustomTypes;
  setSelectedItem: (item: CustomTypes) => void;
  setEditableItem: (item: ItemObjectType) => void;
  handleMouseMove: (e: MouseEvent | TouchEvent) => void;
  setCharacters: (item: ItemObjectType) => void;
  setStickers: (item: ItemObjectType) => void;
};

type CustomItem = {
  name: string;
  value: CustomTypes;
};

const CUSTOM_ITEMS: CustomItem[] = [
  { name: '배경', value: 'background' },
  { name: '캐릭터', value: 'character' },
  { name: '스티커', value: 'sticker' },
];

export default function Custom(props: CustomProps) {
  const {
    selectedBackground,
    setSelectedBackground,
    selectedItem,
    setSelectedItem,
    setEditableItem,
  } = props;

  const handleBackgroundClick = (id: number) => {
    setSelectedBackground(id);
    sessionStorage.setItem('background', id);
  };

  const handlerCustomTypeClick = (customType: CustomTypes) => {
    setSelectedItem(customType);
  };

  const handleItemClick = (src: string, category: CategoryTypes) => {
    const canvasRect = document.querySelector('#display')?.getBoundingClientRect();

    const offsetX = canvasRect?.width / 2;
    const offsetY = canvasRect?.height / 2;

    let id = sessionStorage.getItem('itemId') ? parseInt(sessionStorage.getItem('itemId')) + 1 : 0;
    sessionStorage.setItem('itemId', id);

    const newItem: ItemObjectType = {
      offsetX,
      offsetY,
      path: selectedItem + 's/' + src,
      id,
      category,
    };

    setEditableItem(newItem);
  };

  return (
    <div className="mt-[8px] mb-24 flex h-[calc(100vh-348px)] w-full flex-col items-center space-y-[8px]  bg-blossom-lightBlue px-[20px]">
      <div className="grid w-[320px] grid-cols-3 gap-4">
        {CUSTOM_ITEMS.map(custom => {
          return (
            <button
              key={custom.value}
              className={`h-[36px] w-[96px] rounded-[10px] border-2 border-blossom-white text-lg 
              ${selectedItem === custom.value ? 'bg-blossom-green' : 'bg-blossom-yellow'}`}
              onClick={() => handlerCustomTypeClick(custom.value)}
            >
              {custom.name}
            </button>
          );
        })}
      </div>
      <div className="border-1 mx- my-[8px] w-[320px] border-t border-solid border-blossom-darkGray"></div>

      <div className="scrollbar-hide  grid max-h-[48vh] w-[320px] grid-cols-3 gap-4 overflow-auto">
        {selectedItem === 'background' &&
          BACKGROUND_IMAGE.map(img => {
            return (
              <div
                key={img.id}
                className={`h-[112px] w-[96px] cursor-pointer ${
                  selectedBackground === img.id ? ' bg-blossom-green' : 'bg-blossom-white'
                }   border-[2px] border-solid  ${
                  selectedBackground === img.id ? ' border-blossom-green' : 'border-blossom-white'
                }  overflow-hidden rounded-[14px]`}
                onClick={() => handleBackgroundClick(img.id)}
              >
                <Image
                  className={`rounded-[14px]`}
                  src={`/backgrounds/${img.preview}`}
                  alt={img.preview}
                  width={96}
                  height={112}
                />
              </div>
            );
          })}
        {selectedItem === 'character' &&
          CHARACTER_IMAGE.map(img => {
            return (
              <div
                key={img.id}
                className={`h-[56px] w-[96px] cursor-pointer overflow-hidden rounded-[14px] border-2 border-solid border-blossom-white bg-blossom-white`}
                onClick={() => handleItemClick(img.value, 'character')}
              >
                <Image src={`/characters/${img.preview}`} alt={img.value} width={96} height={56} />
              </div>
            );
          })}
        {selectedItem === 'sticker' &&
          STICKER_IMAGE.map(img => {
            return (
              <div
                key={img.id}
                className={`h-[56px] w-[96px] cursor-pointer overflow-hidden rounded-[14px] border-2 border-solid border-blossom-white bg-blossom-white`}
                onClick={() => handleItemClick(img.value, 'sticker')}
              >
                <Image src={`/stickers/${img.preview}`} alt={img.value} width={96} height={56} />
              </div>
            );
          })}
      </div>
      <div className="h-14"></div>
    </div>
  );
}
