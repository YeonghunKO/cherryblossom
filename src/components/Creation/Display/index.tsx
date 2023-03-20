// @ts-nocheck
import { PLACEHODER_MESSAGE } from '@/src/constants/message';
import Image from 'next/image';
import {
  ChangeEvent,
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export type CategoryTypes = 'character' | 'sticker';
export type ItemObjectType = {
  offsetX: number;
  offsetY: number;
  path: string;
  id: number;
  category: CategoryTypes;
};
type DisplayProps = {
  selectedBackground: number | null;
  selectedCharacter: number | null;
  selectedSticker: number | null;
  textValue: string;
  setTextValue: (input: string) => void;
  visibleCancelBtn: string;
  characters: ItemObjectType[];
  stickers: ItemObjectType[];
  setCharacters: (characters: ItemObjectType[]) => void;
  setStickers: (stickers: ItemObjectType[]) => void;
  editableItem: ItemObjectType;
  setEditableItem: (item: ItemObjectType) => void;
  handleMouseMove: (e: MouseEvent | TouchEvent) => void;
  setDraggable: (flag: boolean) => void;
};

const customTypeArr = ['character', 'sticker'];

/**
 * 초대장 생성 페이지의 Display 부분이다.
 * 컴포넌트 안의 영역을 클릭하면 캐릭터/스티커를 배열 state에 저장해 해당 아이템을 렌더링한다.
 */
export default function Display(props: DisplayProps) {
  const {
    selectedBackground,
    selectedCharacter,
    selectedSticker,
    textValue,
    setTextValue,
    visibleCancelBtn,
    characters,
    stickers,
    setCharacters,
    setStickers,
    editableItem,
    setEditableItem,
    handleMouseMove,
    setDraggable={setDraggable}
  } = props;
  const [isTextEditable, setIsTextEditable] = useState(true);

  const displayRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const makeItemEditable = (currId: number, category: CategoryTypes) => {
    // 이미 editableItem이 존재하면 함수 종료
    if (editableItem)
      return;

    // 클릭한 아이템을 기존 아이템 배열에서 제거
    deleteItemFromArray(currId, category);

    // 클릭한 아이템을 editableItem으로 설정
    category === 'character' ?
      characters.forEach((item) => {
        if (item.id === currId) {
          setEditableItem(item);
        }
      }) :
      stickers.forEach((item) => {
        if (item.id === currId) {
          setEditableItem(item);
        }
      });
  }

  const handleMouseDown = () => {
    if (!editableItem) {
      return;
    }
    document.querySelector('#creation-page')?.classList.add('overflow-hidden');
    setDraggable(true);
  }

  const deleteItemFromArray = (currId: number, category: CategoryTypes) => {
    const filteredArr =
      category === 'character'
        ? characters.filter(({id}) => id !== currId)
        : stickers.filter(({id}) => id !== currId);

    category === 'character' ? setCharacters(filteredArr) : setStickers(filteredArr);

    sessionStorage.setItem(category, JSON.stringify(filteredArr));
  }

  const handlerDeleteItem = () => {
    setEditableItem(null);
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

  const clearAllItems = (e: MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (!window.confirm('모든 캐릭터 / 스티커를 삭제하시겠습니까?')) return;

    setCharacters([]);
    setStickers([]);
    customTypeArr.forEach(customType => sessionStorage.removeItem(customType));
  };

  const handleTextBlur = event => {
    if (event.target.innerText === '') {
      event.target.innerText = PLACEHODER_MESSAGE;
    }
  };
  const handleTextChange = event => {
    setTextValue(event.target.innerText);
  };
  const handleTextFocus = event => {
    if (event.target.innerText === PLACEHODER_MESSAGE) {
      event.target.innerText = '';
    }
  };

  useEffect(() => {
    // textarea readOnly 설정
    if (selectedCharacter === null && selectedSticker === null) {
      // 캐릭터, 스티커 둘 중 어느것도 선택하지 않았을 때
      // textarea 편집 가능
      setIsTextEditable(true);
    } else {
      // 캐릭터, 스티커 둘 중 하나를 선택했을 때
      // textarea 편집 불가
      setIsTextEditable(false);
    }
  }, [selectedBackground, selectedCharacter, selectedSticker]);

  useEffect(() => {
    // background 렌더링
    paintBackground();
  }, [paintBackground]);

  useEffect(() => {
    if (!characters.length && !stickers.length) {
      // 초기 렌더링 시

      customTypeArr.forEach(customType => {
        // session에 저장된 캐릭터/스티커 가져와서 state 변경
        if (sessionStorage.getItem(customType)) {
          const items: ItemObjectType[] = JSON.parse(sessionStorage.getItem(customType));
          customType === 'character' ? setCharacters(items) : setStickers(items);
        }
      });
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        id="display"
        ref={displayRef}
        className="relative flex h-[300px] w-[320px] items-center justify-center overflow-hidden rounded-lg border border-solid border-[#FDC7D4] bg-[#FDC7D4]"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        <pre
          className={`${
            !textValue && 'text-gray-400'
          } h-[140px] w-[220px] resize-none  overflow-hidden whitespace-pre-wrap break-words rounded-[10px] border border-solid border-[#FDC7D4] bg-white p-2.5 focus:outline-none `}
          onInput={handleTextChange}
          onBlur={handleTextBlur}
          onFocus={handleTextFocus}
          contentEditable={isTextEditable}
          dangerouslySetInnerHTML={{ __html: !textValue === '' ? textValue : PLACEHODER_MESSAGE }}
        ></pre>
        {characters.map(({ offsetX, offsetY, path, id, category }: ItemObjectType, idx) => (
          <div
            className={`absolute flex flex-col items-end left-[${offsetX}px] top-[${offsetY}px] cursor-pointer`}
            style={{ left: `${offsetX}px`, top: `${offsetY}px`, transform: 'translate(-50%,-50%)' }}
            key={idx}
            onClick={() => makeItemEditable(id, category)}
          >
              <img src={path} alt={'character'} width={30} height={30} />
          </div>
        ))}
        {stickers.map(({ offsetX, offsetY, path, id, category }: ItemObjectType, idx) => (
          <div
            className={`absolute flex flex-col items-end left-[${offsetX}px] top-[${offsetY}px] cursor-pointer`}
            style={{ left: `${offsetX}px`, top: `${offsetY}px`, transform: 'translate(-50%,-50%)' }}
            key={idx}
            onClick={() => makeItemEditable(id, category)}
          >
              <img src={path} alt={'sticker'} width={30} height={30} />
          </div>
        ))}
        <div onClick={e => clearAllItems(e)}>
          <img
            className="absolute cursor-pointer"
            src={'/creation/eraser.svg'}
            alt={'eraserButton'}
            width={24}
            height={24}
            style={{ right: '10px', bottom: '10px', visibility: `${visibleCancelBtn}` }}
          />
        </div>
        {editableItem && (
          <div
            className={`absolute flex flex-col items-end cursor-pointer`}
            style={{ left: `${editableItem.offsetX}px`, top: `${editableItem.offsetY}px`, transform: 'translate(-50%,-50%)' }}
          >
            <div
              className="cursor-pointer"
              onMouseDown={handlerDeleteItem}
              onTouchStart={handlerDeleteItem}
            >
              <img src="/creation/cancel.svg" alt="cancelButton" width={16} height={16} />
            </div>
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <img
                src={editableItem.path}
                alt={'editableItem'}
                width={40}
                height={40}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
