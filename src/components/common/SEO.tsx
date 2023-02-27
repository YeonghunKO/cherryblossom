import { NextSeo } from 'next-seo';

const SEO = ({ imageName }: { imageName: string }) => {
  return (
    <>
      <NextSeo
        title="초대장이 왔어요!! 놀아주세요😋"
        description="나랑 놀아라"
        openGraph={{
          type: 'website',
          locale: 'ko_KR',
          url: `https://cherryblossom-ten.vercel.app/received/${imageName}`,
          title: '초대장이 왔어요!! 놀아주세요😋',
          description: '나랑 놀아라',
          images: [
            {
              url: `https://firebasestorage.googleapis.com/v0/b/cherryblossom-f61a7.appspot.com/o/received.png?alt=media&token=de78852d-290a-4992-8f3b-008d0447de03`,
              width: 800,
              height: 400,
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
    </>
  );
};

export default SEO;
