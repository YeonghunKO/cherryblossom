import Image from 'next/image';

type CustomTypes = 'background' | 'character' | 'sticker';

type CustomProps = {
  selectedBackground: number | null;
  selectedCharacter: number | null;
  selectedSticker: number | null;
  setSelectedBackground: (item: number | null) => void;
  setSelectedCharacter: (item: number | null) => void;
  setSelectedSticker: (item: number | null) => void;
  selectedItem: CustomTypes;
  setSelectedItem: (item: CustomTypes) => void;
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

const BACKGROUND_IMAGE = [
  {
    id: 0,
    preview: 'pre_0.svg',
    value: '0.svg',
  },
  {
    id: 1,
    preview: 'pre_1.svg',
    value: '1.svg',
  },
  {
    id: 2,
    preview: 'pre_2.svg',
    value: '2.svg',
  },
  {
    id: 3,
    preview: 'pre_3.svg',
    value: '3.svg',
  },
  {
    id: 4,
    preview: 'pre_4.svg',
    value: '4.svg',
  },
  {
    id: 5,
    preview: 'pre_5.svg',
    value: '5.svg',
  },
  {
    id: 6,
    preview: 'pre_6.svg',
    value: '6.svg',
  },
  {
    id: 7,
    preview: 'pre_7.svg',
    value: '7.svg',
  },
  {
    id: 8,
    preview: 'pre_8.svg',
    value: '8.svg',
  },
  {
    id: 9,
    preview: 'pre_9.svg',
    value: '9.svg',
  },
];

const STICKER_IMAGE = [
  {
    id: 0,
    preview: 'pre_0.svg',
    value: '0.png',
  },
  {
    id: 1,
    preview: 'pre_1.svg',
    value: '1.png',
  },
  {
    id: 2,
    preview: 'pre_2.svg',
    value: '2.png',
  },
  {
    id: 3,
    preview: 'pre_3.svg',
    value: '3.png',
  },
  {
    id: 4,
    preview: 'pre_4.svg',
    value: '4.png',
  },
  {
    id: 5,
    preview: 'pre_5.svg',
    value: '5.png',
  },
  {
    id: 6,
    preview: 'pre_6.svg',
    value: '6.svg',
  }
];

const CHARACTER_IMAGE = [
  {
    id: 0,
    preview: 'pre_0.svg',
    value: '0.png',
  },
  {
    id: 1,
    preview: 'pre_1.svg',
    value: '1.png',
  },
  {
    id: 2,
    preview: 'pre_2.svg',
    value: '2.png',
  },
  {
    id: 3,
    preview: 'pre_3.svg',
    value: '3.png',
  },
  {
    id: 4,
    preview: 'pre_4.svg',
    value: '4.png',
  },
  {
    id: 5,
    preview: 'pre_5.svg',
    value: '5.png',
  },
];

export default function Custom(props: CustomProps) {
  const {
    selectedBackground,
    selectedCharacter,
    selectedSticker,
    setSelectedBackground,
    setSelectedCharacter,
    setSelectedSticker,
    selectedItem,
    setSelectedItem,
  } = props;

  const handleItemClick = (id: number) => {
    if (selectedItem === 'background') {
      setSelectedBackground(id);
      setSelectedCharacter(null);
      setSelectedSticker(null);
    }
    if (selectedItem === 'character') {
      if (selectedCharacter === id) {  // 이미 클릭된 아이템 클릭 시 selectedCharacter null로 변경
        setSelectedCharacter(null);
        return;
      }
      setSelectedCharacter(id);
      setSelectedSticker(null);
    }
    if (selectedItem === 'sticker') {
      if (selectedSticker === id) {  // 이미 클릭된 아이템 클릭 시 selectedSticker null로 변경
        setSelectedSticker(null);
        return;
      }
      setSelectedSticker(id);
      setSelectedCharacter(null);
    }
  };

  return (
    <div className="w-[360px] h-96 bg-blossom-lightBlue flex-col space-y-[8px] mt-[8px] px-[20px]">
      <div className="grid grid-cols-3 gap-4">
        {CUSTOM_ITEMS.map(custom => {
          return (
            <button
              key={custom.value}
              className={`w-[96px] h-[36px] text-sm rounded-[10px] border-blossom-white border-2 
  ${selectedItem === custom.value ? 'bg-blossom-green' : 'bg-blossom-yellow'}`}
              onClick={() => setSelectedItem(custom.value)}
            >
              {custom.name}
            </button>
          );
        })}
      </div>
      <div className="border-t border-solid border-1 border-blossom-darkGray my-[8px]"></div>

      <div className="h-[230px] grid grid-cols-3 gap-4 overflow-auto">
        {selectedItem === 'background' &&
          BACKGROUND_IMAGE.map(img => {
            return (
              <div
                key={img.id}
                className={`w-[96px] h-[112px] ${
                  selectedBackground === img.id ? ' bg-blossom-green' : 'bg-blossom-white'
                }   border-solid border-[2px]  ${
                  selectedBackground === img.id ? ' border-blossom-green' : 'border-blossom-white'
                }  rounded-[14px] overflow-hidden`}
                onClick={() => handleItemClick(img.id)}
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
                className={`w-[96px] h-[56px] bg-blossom-white border-solid border-2 ${
                  selectedCharacter === img.id ? ' border-blossom-green' : 'border-blossom-white'
                }   rounded-[14px] overflow-hidden`}
                onClick={() => handleItemClick(img.id)}
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
                className={`w-[96px] h-[56px] bg-blossom-white border-solid border-2 ${
                  selectedSticker === img.id ? ' border-blossom-green' : 'border-blossom-white'
                }   rounded-[14px] overflow-hidden`}
                onClick={() => handleItemClick(img.id)}
              >
                <Image src={`/stickers/${img.preview}`} alt={img.value} width={96} height={56} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
