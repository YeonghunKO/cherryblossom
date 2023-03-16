import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import Logo from '@/public/intro/introLogo.svg';
import Bg from '@/public/intro/introBg.svg';
import SmallFlower from '@/public/intro/intro_flower_sm.svg';
import MiddleFlower from '@/public/intro/intro_flower_md.svg';
import BigFlower from '@/public/intro/intro_flower_lg.svg';

export default function IntroComponent() {
  const router = useRouter();
  const movePage = () => {
    router.push('/creation');
  };
  return (
    <div className="flex w-[89%] flex-col items-center justify-center">
      <div className="relative flex w-[100%] items-center justify-center">
        <Image src={Bg} alt="Bg" className="w-[100%] rounded-xl" />
        <Image
          src={Logo}
          alt="Logo"
          className="absolute left-1/2 top-1/2 z-20 w-[71%] translate-y-[-50%] translate-x-[-50%] animate-fade-in"
        />
      </div>
      <button
        style={{ borderBottomWidth: '6px', borderRightWidth: '2px', borderLeftWidth: '2px' }}
        className="z-20 mt-4 h-12 w-[98%] rounded-xl border-[3px] border-solid border-blossom-white bg-blossom-green text-2xl text-blossom-black"
        onClick={movePage}
      >
        초대장 만들러 가기
      </button>
      <div className="absolute h-full w-full overflow-hidden">
        {/* first */}
        <Image
          src={BigFlower}
          alt="flower"
          className="absolute right-0 top-0 z-10 animate-fall-flower"
        />
        <Image
          src={MiddleFlower}
          alt="flower"
          className="absolute right-0 top-1/3 z-10 animate-fall-flower"
        />
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-1/2 top-0 z-10 animate-fall-flower"
        />
        <Image
          src={MiddleFlower}
          alt="flower"
          className="absolute right-1/3 top-0 z-10 animate-fall-flower"
        />
        <Image
          src={MiddleFlower}
          alt="flower"
          className="absolute right-0 top-2/3 z-10 animate-fall-flower"
        />
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-2/3 top-0 z-10 animate-fall-flower"
        />
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-0 top-1/3 z-10 animate-fall-flower"
        />
        {/* second */}
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-[-300px] top-[-700px] z-10 animate-fall-flower"
        />
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-0 top-[-600px] z-10  animate-fall-flower "
        />
        <Image
          src={BigFlower}
          alt="flower"
          className="absolute right-0 top-0 z-10 animate-fall-flower "
        />
        <Image
          src={MiddleFlower}
          alt="flower"
          className="absolute right-[-200px] top-[-500px]  z-10 animate-fall-flower "
        />
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-[-400px] top-[-800px]  z-10  animate-fall-flower "
        />
        <Image
          src={BigFlower}
          alt="flower"
          className="absolute right-[-300px] top-[-750px]  z-10 animate-fall-flower"
        />
        <Image
          src={MiddleFlower}
          alt="flower"
          className="absolute right-[-150px] top-[-650px]  z-10 animate-fall-flower "
        />
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-[-50px] top-[-600px]  z-10 animate-fall-flower "
        />
        <Image
          src={SmallFlower}
          alt="flower"
          className="absolute right-0 top-[-50px] z-10  animate-fall-flower"
        />
      </div>
    </div>
  );
}
