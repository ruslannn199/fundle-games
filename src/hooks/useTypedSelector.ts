import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { rootState } from '../types/types';

const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector;

export default useTypedSelector;
