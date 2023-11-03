import { classNames } from './classNames';

const duration = 'duration-150';
const timingFunction = 'ease-out';

type Options = {
  isIcon?: boolean;
};

export const getHoverAnimationClasses = ({ isIcon }: Options = {}) => {
  const parent = classNames(
    `group inline-block rounded-lg transition ${duration} ${timingFunction}`,
    isIcon ? 'p-1' : 'px-2 py-1',
    'hover:scale-105 hover:bg-gray-700'
  );
  const child = classNames(
    `inline-block transition ${duration} ${timingFunction}`,
    `group-hover:scale-110`,
    isIcon ? 'group-hover:rotate-12' : 'group-hover:rotate-3'
  );

  return {
    parent,
    child,
  };
};
