import { SectionLayout } from './section-layout';
import { useState } from 'react';

export const FAQSection = () => {
  const faqAccordionInfo = [
    {
      question: 'Q. 사주 운세를 확인하고 싶은데, 비용은 무료인가요?',
      answer:
        '첫 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.\n첫 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.',
    },
    {
      question: 'Q. 어떤 기술이 활용되었나요?',
      answer:
        '두 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.\n두 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.',
    },
    {
      question:
        'Q. 세 번째 질문입니다. 한 줄까지 들어갈 수 있습니다. 그 이상은 말줄임표 처리합니다. 바로 이렇게... 이렇게... 이렇게... 이렇게... 이렇게...',
      answer:
        '세 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.\n세 번째 질문에 대한 답변입니다. 답변 내용은 어쩌구저쩌구입니다.',
    },
  ];

  return (
    <SectionLayout>
      <div className="w-full h-full flex flex-col gap-10 sm:gap-16">
        <h3 className="text-left text-2xl sm:text-3xl font-extrabold">FAQs</h3>
        <div className="flex flex-col gap-6 sm:gap-10 justify-center">
          {faqAccordionInfo.map((accordion) => (
            <FAQAccordion
              key={accordion.question}
              question={accordion.question}
              answer={accordion.answer}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg px-4 sm:px-6 py-6 shadow-md w-full gap-4 bg-white">
      <div className="flex justify-between items-center">
        <p className="text-base sm:text-lg font-bold truncate">{question}</p>
        <button
          className="rounded-full shadow-lg p-2 transition transform hover:scale-105"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            className={`transition transform ${isOpen ? '' : '-rotate-90'}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="transition"
              cx="12"
              cy="12"
              r="12"
              fill={!isOpen ? '#FFFFFF' : '#6F6C90'}
            />
            <path
              className="transition"
              d="M8 10L12 14L16 10"
              stroke={!isOpen ? '#6F6C90' : '#FFFFFF'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <p className="text-sm sm:text-base text-left leading-6">{answer}</p>
      )}
    </div>
  );
};
