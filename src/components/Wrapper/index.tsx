import type { WrapperProps } from '../../types/types';

const Wrapper: React.FC<React.PropsWithChildren<WrapperProps>> = ({ classes, isUnusualWrapper, children }) => (
  <div className={
    `${!isUnusualWrapper && 'wrapper'}${classes && classes.length
      ? ' ' + classes.join(' ') : ''}`}>
    {children}
  </div>
);

export default Wrapper;
