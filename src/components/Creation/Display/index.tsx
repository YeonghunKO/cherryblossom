// @ts-nocheck
import { ChangeEvent, MouseEvent, MutableRefObject, useCallback, useEffect, useRef } from 'react';

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
  isTextEmpty: boolean;
  setIsTextEmpty: (flag: boolean) => void;
};

const customTypeArr = ['character', 'sticker'];

export const removeCancelBtnFromDisplay = () => {
  const display = document.querySelector('#display');
  display?.childNodes.forEach((child) => {
    if (child.childNodes.length === 1) return;

    child.childNodes[0]?.remove();
  });
}

/**
 * 초대장 생성 페이지의 Display 부분이다.
 * 캐릭터나 스티커를 클릭한 상태로 컴포넌트 안의 영역을 클릭하면 동적으로 해당 아이템이 생성된다.
 */
export default function Display(props: DisplayProps) {
  const {
    selectedItem,
    selectedBackground,
    selectedCharacter,
    selectedSticker,
    isTextEmpty,
    setIsTextEmpty,
  } = props;

  const displayRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const textareaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);

  const handlerDeleteItem = (e: MouseEvent) => {
    e.stopPropagation(); // click event가 버블링 되어 handlerClickDisplay가 호출되는 것을 방지

    customTypeArr.forEach((customType) => {  // 캐릭터/스티커 session 순회하며 id에 해당하는 요소 삭제
      const items: ItemObjectType[] = JSON.parse(sessionStorage.getItem(customType));
      if (!items) return;
      
      const modifiedItems = items.filter(({ id }) => `item${id}` !== e.target.parentNode.id);
      sessionStorage.setItem(customType, JSON.stringify(modifiedItems));
    });

    e.target.parentNode.remove(); // DOM 트리에서 노드 삭제
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
      selectedCharacter === null? selectedSticker : selectedCharacter
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

    const selectedItems = sessionStorage.getItem(selectedItem);
    if (selectedItems) {
      const items = JSON.parse(selectedItems);
      sessionStorage.setItem(selectedItem, JSON.stringify([...items, itemObject]));
    } else {
      sessionStorage.setItem(selectedItem, JSON.stringify([itemObject]));
    }

    paintItemInDisplay(offsetX, offsetY, selectedItemPath, id);
  };

  const handlerChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value.trim().length) {
      // textarea에 입력이 사라졌을때
      setIsTextEmpty(true);
    } else if (isTextEmpty) {
      // textarea에 입력이 됐는데 isTextEmpty가 아직 true면
      setIsTextEmpty(false);
    }
  };

  const paintItemInDisplay = useCallback((x: number, y: number, path: string, id: number) => {
    const item = document.createElement('div');
    const cancelBtn = document.createElement('span');
    const img = document.createElement('img');

    cancelBtn.innerText = 'X';
    cancelBtn.addEventListener('click', e => handlerDeleteItem(e));

    item.id = `item${id}`;
    item.setAttribute('style', 'position:absolute;');
    item.classList.add('flex');
    item.classList.add('flex-col');
    item.classList.add('items-end');
    item.style.left = x + 'px';
    item.style.top = y + 'px';
    item.style.transform = 'translate(-50%,-50%)';

    img.setAttribute('width', '30px');
    img.setAttribute('src', path);

    item.appendChild(cancelBtn);
    item.appendChild(img);
    displayRef.current?.appendChild(item);
  }, []);

  const paintBackground = useCallback(() => {
    const sessionBackground = sessionStorage.getItem('background');
    let backgroundNumber: number;
    if (selectedBackground === null) {  // 아직 선택된 배경이 없으면
      backgroundNumber = parseInt(sessionBackground) || 0;  // backgroundNumber에 session 배경 값 or 0 설정
    } else {  // 선택한 배경이 있으면
      backgroundNumber = selectedBackground;  // backgroundNumber에 선택한 배경을 설정
      sessionStorage.setItem('background', backgroundNumber);  // session에 선택한 배경 설정
    }
    displayRef.current.style = `background-image:url(/backgrounds/${backgroundNumber}.svg); background-size:cover`;  // background 이미지 그리기
  }, [selectedBackground]);

  useEffect(() => {    
    if (selectedCharacter === null && selectedSticker === null) {  // 캐릭터, 스티커 둘 중 어느것도 선택하지 않았을 때
      if (textareaRef.current) textareaRef.current.readOnly = false; // textarea 편집 가능
    } else {  // 캐릭터, 스티커 둘 중 하나를 선택했을 때
      if (textareaRef.current) textareaRef.current.readOnly = true; // textarea 편집 불가
    }

    paintBackground();

    if (displayRef.current?.children.length === 1) {  // children이 1이면 textarea만 존재하기 때문에 session에 저장된 items 렌더링
      customTypeArr.forEach(customType => {
        // session에 저장되어 있는 customType 배열들을 순회
        if (sessionStorage.getItem(customType)) {
          const items: ItemObjectType[] = JSON.parse(sessionStorage.getItem(customType));
  
          items.forEach(({ offsetX, offsetY, path, id }) => {
            // 배열을 순회하며 저장된 좌표, path에 맞게 paint 호출
            paintItemInDisplay(offsetX, offsetY, path, id);
          });
        }
      });
    }
  }, [paintItemInDisplay, paintBackground, selectedBackground, selectedCharacter, selectedSticker]);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        id="display"
        ref={displayRef}
        className="w-[320px] h-[300px] border border-solid overflow-hidden relative rounded-lg border-fuchsia-300 flex justify-center items-center"
        onClick={e => handlerClickDisplay(e)}
      >
        <textarea
          ref={textareaRef}
          className="w-[220px] h-[140px] p-1 resize-none focus:outline-none overflow-hidden rounded-[10px]"
          onChange={e => handlerChangeTextarea(e)}
          placeholder="초대장 문구를 작성해주세요"
        ></textarea>
      </div>
    </div>
  );
}
