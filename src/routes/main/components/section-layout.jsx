import { cn } from 'utils/cn';

export const SectionLayout = ({
  children,
  outerLayerClassName: _outerLayerClassName,
  innerLayerClassName: _innerLayerClassName,
}) => {
  const outerLayerClassName = cn(
    'flex items-center justify-start w-screen h-full border-b my-7',
    _outerLayerClassName,
  );

  const innerLayerClassName = cn(
    'relative px-[20vw] w-full h-full flex justify-between',
    _innerLayerClassName,
  );

  return (
    <div className={outerLayerClassName}>
      <div className={innerLayerClassName}>{children}</div>
    </div>
  );
};
