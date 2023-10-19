import axios, { AxiosResponse } from 'axios';
import { StripeClientResponse } from '../../types/interfaces';

export const handleFetchClient = async () => {
  const { data }: AxiosResponse<StripeClientResponse> = await axios.post('http://localhost/fundle-games/checkout', {
    items: [{ id: 'cool_id' }]
  });
  return data;
}
