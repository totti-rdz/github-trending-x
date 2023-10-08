type Prefix = 'lg' | 'active' | 'hover' | 'group-hover';

export const prefixClassNames = (prefix: Prefix) => (classNames: string) => {
  return classNames
    .trim()
    .split(' ')
    .map((className) => prefix + ':' + className)
    .join(' ');
};

export const lg = prefixClassNames('lg');
export const active = prefixClassNames('active');
export const hover = prefixClassNames('hover');
export const groupHover = prefixClassNames('group-hover');
