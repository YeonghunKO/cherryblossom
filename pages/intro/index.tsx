import dynamic from 'next/dynamic';
import Head from 'next/head';

const IntroComponent = dynamic(() => import('./IntroComponent'));

function Intro() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Head>
        <title>나랑 같이 벚꽃 보러가지 않을래?🎵🎶</title>
      </Head>
      <IntroComponent />
    </div>
  );
}

export default Intro;
