import type { CategoryData, ProductData } from '../types/interfaces';
import { makeFetchURL } from '.';
import { ApiResponse } from '../types/types';

export const handleAddProduct = async (product: ProductData) => {
  try {
    await fetch(makeFetchURL('products'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(product),
    });
  } catch (err) {
    console.error(err);
  }
}

export const handleFetchProducts = async (): Promise<ProductData[] | undefined> => {
  try {
    const { records }: ApiResponse<ProductData[]> = (await (await fetch(makeFetchURL('products?order=createdDate,desc'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })).json());
    return records;
  } catch (err) {
    console.error(err);
  }
}

export const handleDeleteProducts = async (documentId: string): Promise<void> => {
  try {
    await fetch(makeFetchURL(`products/${documentId}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export const getCategories = async () => {
  try {
    const { records }: ApiResponse<CategoryData[]> = (await (await fetch(makeFetchURL('category'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })).json());
    return records;
  } catch (err) {
    console.error(err);
  }
}
