import axios, { AxiosResponse } from 'axios';
import { FetchClientActionPayload, StripeClientResponse } from '../../types/interfaces';

export const handleFetchClient = async ({ cartData, total }: FetchClientActionPayload) => {
  const { data }: AxiosResponse<StripeClientResponse> = await axios.post(import.meta.env.DEV
      ? 'http://localhost/fundle-games/checkout'
      : 'https://fundle-games.infinityfreeapp.com/fundle-games/checkout', {

    items: cartData,
    amount: total,
  });
  return data;
}
