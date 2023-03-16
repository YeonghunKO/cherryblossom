import localFont from '@next/font/local';

const gamjaFlower = localFont({
  src: '../../public/fonts/GamjaFlower-Regular.ttf',
  variable: '--font-jamjaFlower',
});

const pretendard = localFont({
  src: '../../public/fonts/Pretendard-Regular.woff',
  variable: '--font-pretendard',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-totalBg bg-cover bg-no-repeat ${gamjaFlower.variable} ${pretendard.variable} font-sans`}
    >
      <div className="relative h-full w-full min-w-[360px] bg-skyBlue md:w-[360px]">{children}</div>
    </div>
  );
}
