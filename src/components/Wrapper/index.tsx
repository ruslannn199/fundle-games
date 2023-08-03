import type { WrapperProps } from '../../types/types';

const Wrapper: React.FC<React.PropsWithChildren<WrapperProps>> = ({
  className,
  isUnusualWrapper,
  children }) => (
    <div className={
      `${!isUnusualWrapper && 'wrapper'}${className ? ' ' + className : ''}`}>
      {children}
    </div>
);

export default Wrapper;
