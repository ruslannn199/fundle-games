import axios, { AxiosResponse } from 'axios';
import { FetchClientActionPayload, StripeClientResponse } from '../../types/interfaces';

export const handleFetchClient = async ({ cartData, total }: FetchClientActionPayload) => {
  const { data }: AxiosResponse<StripeClientResponse> = await axios.post('http://localhost/fundle-games/checkout', {
    items: cartData,
    amount: total,
  });
  return data;
}
