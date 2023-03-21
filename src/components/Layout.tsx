import localFont from '@next/font/local';
import { Gamja_Flower } from '@next/font/google';

const gamjaFlower = Gamja_Flower({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gamjaFlower',
});

const pretendard = localFont({
  src: '../../public/fonts/Pretendard-Regular.woff',
  variable: '--font-pretendard',
  preload: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex h-fit w-screen items-center justify-center overflow-y-hidden bg-totalBg bg-cover bg-no-repeat ${gamjaFlower.variable} ${pretendard.variable} font-sans`}
    >
      <div className="relative h-[640px] bg-skyBlue web:w-[360px] basic:w-full">{children}</div>
    </div>
  );
}
