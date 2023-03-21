import ModalContents from './ModalContents';

type ModalProps = {
  handleModal: (data: boolean) => void;
};

export default function Modal({ handleModal }: ModalProps) {
  return (
    <div>
      <div className="fixed inset-0 z-20 overflow-y-auto">
        <div
          className="fixed inset-0 h-full w-full bg-black opacity-40"
          onClick={() => handleModal(false)}
        ></div>
        <div className="flex min-h-screen items-center ">
          <div className="flex w-full flex-col items-center justify-center">
            <div
              className={`z-10 flex h-10 w-60 translate-y-1/2 items-center justify-center rounded-[10px] border-[3px] border-solid border-blossom-pink bg-blossom-lightPink py-3 text-center font-normal text-blossom-black	 shadow-blossom-pink drop-shadow-pageTitle`}
            >
              나만의 벚꽃 초대장 만들기
            </div>
            <div className="relative w-[320px] max-w-lg rounded-md border-[1px] border-solid border-blossom-pink bg-white p-[20px] shadow-lg">
              <div className="sm:flex mt-3">
                <div className="sm:ml-4 sm:text-left mt-2 text-center"></div>
                <ModalContents />
                <div className="sm:flexitems-center mt-[18px] gap-2 ">
                  <button
                    className="mt-[18px] h-[36px] w-full rounded-[10px] border-[2px]  border-solid border-white bg-btn-yellow p-2.5 text-blossom-black  drop-shadow-modal hover:bg-blossom-green"
                    onClick={() => handleModal(false)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
