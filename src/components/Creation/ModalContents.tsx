import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CONTENTS = [
  {
    image: '/instruction/background_instruction.png',
  },
  {
    image: '/instruction/character_instruction.png',
  },

  {
    image: '/instruction/sticker_instruction.png',
  },
  {
    image: '/instruction/completion_instruction.png',
  },
];

export default function ModalContents() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };
  return (
    <Slider dotsClass="my-slick-dots" {...settings}>
      {CONTENTS.map(content => {
        return (
          <div className="flex items-center whitespace-pre font-pretendard">
            <Image alt="instruction_1" src={content.image} height={'191'} width={'276'} />
          </div>
        );
      })}
    </Slider>
  );
}
