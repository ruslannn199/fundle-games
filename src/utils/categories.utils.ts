import axios from 'axios';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/types';
import { CategoryData } from '../types/interfaces';
import { makeFetchURL } from '.';

export const handleFetchCategories = async () => {
  try {
    const { data: { records } }: AxiosResponse<ApiResponse<CategoryData[]>> = await axios.get(makeFetchURL('category'));
    return records;
  } catch (err) {
    console.error(err);
  }
}
