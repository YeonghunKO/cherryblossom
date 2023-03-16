import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

const CompleteComponent = dynamic(() => import('./CompleteComponent'));

export default function Complete() {
  return (
    <>
      <Head>
        <title>초대장이 완성되었어요!</title>
      </Head>
      <CompleteComponent />
    </>
  );
}
