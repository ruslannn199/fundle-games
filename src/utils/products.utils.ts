// Axios
import axios from 'axios';
// Types
import type { CategoryData, FetchProductParams, ProductData, Products } from '../types/interfaces';
import type { ApiResponse } from '../types/types';
import type { AxiosResponse } from 'axios';
// Utils
import { makeComplexProductFetchURL, makeFetchURL } from '.';

const filterFetchProductByParams = (params: FetchProductParams): string => {
  const { filters, persistProducts, pageSize } = params;
  if (persistProducts?.length) {
    if (filters) {
      return makeComplexProductFetchURL({
        pageSize: pageSize || 12,
        filters,
      });
    }
    return makeComplexProductFetchURL({ filters: { currentPage: 1 }, pageSize: pageSize || 12 });
  }
  if (filters) {
    return makeComplexProductFetchURL({
      pageSize: pageSize || 12,
      filters,
    });
  }
  return makeComplexProductFetchURL({ filters: { currentPage: 1 }, pageSize: params.pageSize || 12 });
}

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

export const handleFetchProducts = async (params: FetchProductParams): Promise<Products | undefined> => {
  try {
    const url: string = filterFetchProductByParams(params);
    const { data: { records, results } }: AxiosResponse<ApiResponse<ProductData[]>> = await axios.get(url);
    const isLastPage: boolean = (results / ((params.filters.currentPage || 1) * (params?.pageSize || 12))) < 1;
    return {
      data: params?.persistProducts?.length ? params?.persistProducts.concat(records) : records,
      isLastPage,
    }
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
