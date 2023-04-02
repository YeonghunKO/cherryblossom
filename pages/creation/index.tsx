import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const CreationComponent = dynamic(() => import('./CreationComponent'));

const Creation = () => {
  return (
    <>
      <Head>
        <title>초대장을 만들어보아요</title>
      </Head>
      <CreationComponent />
    </>
  );
};

export default Creation;

export const getStaticProps = (context: GetStaticPropsContext) => {
  return {
    props: {},
  };
};
