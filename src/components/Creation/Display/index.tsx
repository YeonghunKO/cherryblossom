// @ts-nocheck
import Image from 'next/image';
import { ChangeEvent, MouseEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

type CustomTypes = 'background' | 'character' | 'sticker';
type ItemObjectType = {
  offsetX: number;
  offsetY: number;
  path: string;
  id: number;
};
type DisplayProps = {
  selectedItem: CustomTypes;
  selectedBackground: number | null;
  selectedCharacter: number | null;
  selectedSticker: number | null;
  textValue: string;
  setTextValue: (input: string) => void;
};

const customTypeArr = ['character', 'sticker'];

export const removeCancelBtnFromDisplay = () => {
  const display = document.querySelector('#display');
  display?.childNodes.forEach(child => {
    if (child.childNodes.length === 1) return;

    child.childNodes[0]?.remove();
  });
};

/**
 * 초대장 생성 페이지의 Display 부분이다.
 * 컴포넌트 안의 영역을 클릭하면 캐릭터/스티커를 배열 state에 저장해 해당 아이템을 렌더링한다.
 */
export default function Display(props: DisplayProps) {
  const {
    selectedItem,
    selectedBackground,
    selectedCharacter,
    selectedSticker,
    textValue,
    setTextValue,
  } = props;

  const [characters, setCharacters] = useState<ItemObjectType[]>([]);
  const [stickers, setStickers] = useState<ItemObjectType[]>([]);
  const displayRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const textareaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);

  const handlerDeleteItem = (e: MouseEvent, targetId: number, selected: CustomTypes) => {
    e.stopPropagation(); // click event가 버블링 되어 handlerClickDisplay가 호출되는 것을 방지

    const filteredArr = selected === 'character' ?
      characters.filter(item => item.id !== targetId) :
      stickers.filter(item => item.id !== targetId);

    selected === 'character' ?
      setCharacters(filteredArr) : setStickers(filteredArr);

    sessionStorage.setItem(selected, JSON.stringify(filteredArr))
  };

  const handlerClickDisplay = (e: MouseEvent) => {
    if (selectedCharacter === null && selectedSticker === null) {
      // 캐릭터나 스티커 둘 중 어느 것도 선택하지 않았으면 함수 종료
      return;
    }
    const displayRect = displayRef.current?.getBoundingClientRect();

    const displayLeft = displayRect?.left; // display의 시작 left, top 좌표 값은 기기마다 달라짐
    const displayTop = displayRect?.top;
    const offsetX = e.clientX - displayLeft; // offset은 display 내에서의 클릭 좌표 값이기 때문에 항상 같음
    const offsetY = e.clientY - displayTop;

    const selectedItemPath = `/${selectedItem}s/${
      selectedCharacter === null ? selectedSticker : selectedCharacter
    }.png`;

    let id = sessionStorage.getItem('itemId') ? parseInt(sessionStorage.getItem('itemId')) + 1 : 0;
    sessionStorage.setItem('itemId', id);

    const itemObject: ItemObjectType = {
      // session에 저장할 객체
      offsetX,
      offsetY,
      path: selectedItemPath,
      id,
    };
    
    selectedItem === 'character' ?
      setCharacters(prev => [...prev, itemObject]) :
      setStickers(prev => [...prev, itemObject]);

    sessionStorage.setItem(selectedItem, JSON.stringify(
      selectedItem === 'character' ?
      [...characters, itemObject] : [...stickers, itemObject]
    ))
  };

  const handlerChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const paintBackground = useCallback(() => {
    const sessionBackground = sessionStorage.getItem('background');
    let backgroundNumber: number;
    if (selectedBackground === null) {
      // 아직 선택된 배경이 없으면
      backgroundNumber = parseInt(sessionBackground) || 0; // backgroundNumber에 session 배경 값 or 0 설정
    } else {
      // 선택한 배경이 있으면
      backgroundNumber = selectedBackground; // backgroundNumber에 선택한 배경을 설정
      sessionStorage.setItem('background', backgroundNumber); // session에 선택한 배경 설정
    }
    displayRef.current.style = `background-image:url(/backgrounds/${backgroundNumber}.svg); background-size:cover`; // background 이미지 그리기
  }, [selectedBackground]);

  useEffect(() => {
    // textarea readOnly 설정
    if (selectedCharacter === null && selectedSticker === null) {
      // 캐릭터, 스티커 둘 중 어느것도 선택하지 않았을 때
      if (textareaRef.current) textareaRef.current.readOnly = false; // textarea 편집 가능
    } else {
      // 캐릭터, 스티커 둘 중 하나를 선택했을 때
      if (textareaRef.current) textareaRef.current.readOnly = true; // textarea 편집 불가
    }
  }, [selectedBackground, selectedCharacter, selectedSticker]);

  useEffect(() => {
    // background 렌더링
    paintBackground();
  }, [paintBackground]);

  useEffect(() => {
    if (!characters.length && !stickers.length) { // 초기 렌더링 시
      customTypeArr.forEach(customType => { // session에 저장된 캐릭터/스티커 가져와서 state 변경
        if (sessionStorage.getItem(customType)) {
          const items: ItemObjectType[] = JSON.parse(sessionStorage.getItem(customType));
          customType === 'character' ?
            setCharacters(items) :
            setStickers(items);
        }
      });
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        id="display"
        ref={displayRef}
        className="relative flex h-[300px] w-[320px] items-center justify-center overflow-hidden rounded-lg border border-solid border-fuchsia-300"
        onClick={e => handlerClickDisplay(e)}
      >
        <textarea
          ref={textareaRef}
          className="h-[140px] w-[220px] resize-none overflow-hidden whitespace-pre-wrap break-words rounded-[10px] p-1 focus:outline-none"
          onChange={e => handlerChangeTextarea(e)}
          placeholder="초대장 문구를 작성해주세요"
          value={textValue}
        ></textarea>
        {/* <Image
          src={'/creation/eraser.png'}
          alt={'eraserButton'}
          width={24}
          height={24}
        /> */}
        {
          characters.map(({offsetX, offsetY, path, id}) => (
            <div
              data-item-id={id}
              className={`absolute flex flex-col items-end left-[${offsetX}px] top-[${offsetY}px]`}
              style={{left:`${offsetX}px`, top:`${offsetY}px`, transform:'translate(-50%,-50%)'}}
              key={id}
            >
              <span onClick={(e) => handlerDeleteItem(e, id, 'character')}>X</span>
              <Image
                src={path}
                alt={'character'}
                width={30}
                height={30}
              />
            </div>
          ))
        }
        {
          stickers.map(({offsetX, offsetY, path, id}) => (
            <div
              data-item-id={id}
              className={`absolute flex flex-col items-end left-[${offsetX}px] top-[${offsetY}px]`}
              style={{left:`${offsetX}px`, top:`${offsetY}px`, transform:'translate(-50%,-50%)'}}
              key={id}
            >
              <span onClick={(e) => handlerDeleteItem(e, id, 'sticker')}>X</span>
              <Image
                src={path}
                alt={'sticker'}
                width={30}
                height={30}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
