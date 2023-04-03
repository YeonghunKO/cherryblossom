import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import CreationComponent from './CreationComponent';

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
