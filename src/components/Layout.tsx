import localFont from '@next/font/local';

const gamjaFlower = localFont({
  src: '../../public/fonts/GamjaFlower-Regular.ttf',
  variable: '--font-jamjaFlower',
});
const jejudoldam = localFont({
  src: '../../public/fonts/EF_jejudoldam(mac).otf',
  variable: '--font-jejudoldam',
});

const pretendard = localFont({
  src: '../../public/fonts/Pretendard-Regular.woff',
  variable: '--font-pretendard',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-totalBg bg-cover bg-no-repeat ${gamjaFlower.variable} ${jejudoldam.variable} ${pretendard.variable} font-sans`}
    >
      <div className="relative h-full w-full max-w-[30%] min-w-[360px] bg-skyBlue">
        {children}
      </div>
    </div>
  );
}
