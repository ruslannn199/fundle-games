import axios, { AxiosResponse } from 'axios';
import { Order } from '../../types/interfaces';
import { makeFetchURL } from '../../utils';
import { ApiResponse } from '../../types/types';

export const handleSaveOrder = async (order: Required<Order>) => {
  await axios.post(
    makeFetchURL('orders'),
    order,
  );
}

export const handleGetUserOrderHistory = async (uuid: string): Promise<Order[]> => {
  const url: string = `${makeFetchURL('orders')}?filter=orderUserId,eq,${uuid}&order=createdDate,desc`;
  const { data: { records } }: AxiosResponse<ApiResponse<Order[]>> = await axios.get(url);
  return records;
}
