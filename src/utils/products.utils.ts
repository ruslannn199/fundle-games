import type { CategoryData, ProductData } from '../types/interfaces';
import { makeFetchURL } from '.';
import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/types';

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

export const handleFetchProducts = async (filters: string): Promise<ProductData[] | undefined> => {
  try {
    // TODO implement search by text not JSON
    const url = makeFetchURL(`products?order=createdDate,desc`);
    const { data: { records } }: AxiosResponse<ApiResponse<ProductData[]>> = await axios.get(url);
    return !filters
      ? records
      : records.filter((record) => (record.category.includes(filters)));
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
