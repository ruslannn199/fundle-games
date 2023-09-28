// Axios
import axios from 'axios';
// Types
import type { CategoryData, ProductData } from '../types/interfaces';
import type { ApiResponse } from '../types/types';
import type { AxiosResponse } from 'axios';
// Utils
import { makeFetchURL } from '.';

export const handleAddProduct = async (product: ProductData) => {
  try {
    await axios.post(
      makeFetchURL('products'),
      product,
    );
  } catch (err) {
    console.error(err);
  }
}

export const handleFetchProducts = async (): Promise<ProductData[] | undefined> => {
  try {
    const url: string = makeFetchURL(`products?order=createdDate,desc`);
    const { data: { records } }: AxiosResponse<ApiResponse<ProductData[]>> = await axios.get(url);
    return records;
  } catch (err) {
    console.error(err);
  }
}

export const handleDeleteProducts = async (documentId: string): Promise<void> => {
  try {
    await axios.delete(makeFetchURL(`products/${documentId}`));
  } catch (err) {
    console.error(err);
  }
}

export const getCategories = async () => {
  try {
    const { data: { records } }: AxiosResponse<ApiResponse<CategoryData[]>> = await axios.get(makeFetchURL('category'));
    return records;
  } catch (err) {
    console.error(err);
  }
}
