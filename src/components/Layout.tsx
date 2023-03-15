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

const inter = localFont({
  src: '../../public/fonts/Inter-SemiBold.ttf',
  variable: '--font-inter',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-totalBg bg-cover bg-no-repeat ${gamjaFlower.variable} ${jejudoldam.variable} ${pretendard.variable} ${inter.variable} font-sans`}
    >
      <div className="relative h-full w-full min-w-[360px] bg-skyBlue md:w-[360px]">
        {children}
      </div>
    </div>
  );
}
