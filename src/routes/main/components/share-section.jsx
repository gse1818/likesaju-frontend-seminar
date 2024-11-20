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
      <div className="w-full h-full flex flex-col gap-12 sm:gap-20">
        {/* 제목 및 설명 */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-800">
              사주 공유하기
            </h3>
            <p className="text-base sm:text-xl font-bold text-neutral-800">
              채팅으로 사주를 공유해보세요
            </p>
          </div>
          <a href="/chat">
            <Button
              className="w-full sm:w-[250px] h-[50px] text-base sm:text-lg"
              isRounded={true}
            >
              1:1 채팅 하러가기
            </Button>
          </a>
        </div>

        {/* 카드 섹션 */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
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
    <div className="flex flex-col rounded-xl shadow-md w-full sm:max-w-[450px] overflow-hidden bg-white">
      <img src={img} alt={title} className="w-full h-40 sm:h-60 object-cover" />
      <div className="p-4 sm:p-5 flex flex-col items-start gap-2">
        <h4 className="text-sm sm:text-base font-normal text-neutral-800">
          {title}
        </h4>
        <p className="text-base sm:text-xl font-extrabold text-neutral-800">
          {description}
        </p>
      </div>
    </div>
  );
};
