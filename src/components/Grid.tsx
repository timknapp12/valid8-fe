import { GridProps } from '../types';

export const Grid: React.FC<GridProps> = ({
  gapSize = '2rem',
  min = '270px',
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`grid w-full ${className || ''}`}
      style={{
        gap: gapSize,
        gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
        justifyItems: 'center',
      }}
      {...props}
    >
      {children}
    </div>
  );
};
