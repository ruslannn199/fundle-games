import { useState } from 'react';
import { CreditCardData } from '../types/interfaces';

const useCreditCard = () => {
  const [creditCardData, setCreditCardData] = useState<CreditCardData>({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  });
  return { creditCardData, setCreditCardData };
}

export default useCreditCard;
