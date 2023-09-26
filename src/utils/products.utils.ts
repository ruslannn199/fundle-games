import type { ApiResponse, CategoryData, ProductData } from '../types/interfaces';
import { makeFetchURL } from '.';

export const handleAddProduct = async (product: ProductData) => {
  try {
    console.log('PRODUCT ITSELF', product);
    const response = await fetch(makeFetchURL('products'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(product),
    });
    console.log(response);
    response.headers.forEach((header) => (console.log(header)));
    console.log(await response.json());
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
    })
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