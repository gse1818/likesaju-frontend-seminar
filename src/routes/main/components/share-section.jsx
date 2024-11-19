import { Button } from 'components/button';
import { SectionLayout } from './section-layout';

export const ShareSection = () => {
  const shareCardInfo = [
    {
      title: 'STEP 1',
      description: '오늘의 운세를 확인하세요',
      img: '/images/capture1.png',
    },
    {
      title: 'STEP 2',
      description: '공유할 친구를 선택하세요',
      img: '/images/capture2.png',
    },
  ];

  return (
    <SectionLayout>
      <div className="w-full h-full flex flex-col gap-10 md:gap-[80px]">
        {/* Header Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <h3 className="text-2xl md:text-4xl nanum-extra-bold text-neutral-800">
              사주 공유하기
            </h3>
            <p className="text-base md:text-xl font-bold text-neutral-800">
              채팅으로 사주를 공유해보세요
            </p>
          </div>
          <a href="/chat">
            <Button
              className="w-full md:w-[250px] h-[50px] text-base md:text-lg"
              isRounded={true}
            >
              1:1 채팅 하러가기
            </Button>
          </a>
        </div>
        {/* Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center">
          {shareCardInfo.map((card) => (
            <ShareCard
              key={card.title}
              title={card.title}
              description={card.description}
              img={card.img}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

const ShareCard = ({ title, description, img }) => {
  return (
    <div className="flex flex-col rounded-xl shadow-md max-w-[90%] md:max-w-[450px] overflow-hidden mx-auto md:mx-0">
      <img src={img} alt={title} className="w-full h-auto object-cover" />
      <div className="p-4 md:p-5 flex flex-col items-start gap-2">
        <h4 className="text-sm md:text-base font-normal text-neutral-800">
          {title}
        </h4>
        <p className="text-base md:text-xl font-extrabold text-neutral-800">
          {description}
        </p>
      </div>
    </div>
  );
};
