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
          url: `https://cherryblossom-ten.vercel.app/recived/${imageName}`,
          title: '초대장이 왔어요!! 놀아주세요😋',
          description: '나랑 놀아라',
          images: [
            {
              url: `https://cherryblossom-ten.vercel.app/recived/${imageName}`,
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
