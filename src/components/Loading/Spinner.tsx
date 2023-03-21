import React from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../public/loading.json';

export default function Spinner() {
  return (
    <div className="w-[200px]">
      <Lottie loop animationData={lottieJson} play />
    </div>
  );
}
