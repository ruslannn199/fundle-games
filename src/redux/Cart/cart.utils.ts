import type { ProductData, ProductDataToCompare } from '../../types/interfaces';

export const countTotal = (pageData: ProductData[]): number => (
  pageData.reduce((counter, { price, quantity }) => (
    counter + (price * quantity)
  ), 0)
);

export const checkCartItemExistence = ({
  prevCartItems, nextCartItem
}: ProductDataToCompare): ProductData | undefined => (
  prevCartItems.find((cartItem) => (
    cartItem.id === nextCartItem.id
  ))
);

export const countAmountOfCartItems = (cartItems: ProductData[]): number => (
  cartItems.reduce((quantity, items) => (
    quantity + items.quantity
  ), 0)
);

export const handleAddToCart = ({
  prevCartItems, nextCartItem
}: ProductDataToCompare): ProductData[] => {
  const quantityIncrement = 1;
  const cartItemExists = checkCartItemExistence({
    nextCartItem,
    prevCartItems,
  });

  if (cartItemExists) {
    return prevCartItems.map((cartItem) => (
      cartItem?.id === nextCartItem?.id
        ? {
          ...cartItem,
          quantity: cartItem.quantity + quantityIncrement,
        }
        : cartItem
    ));
  }

  return [
    ...prevCartItems,
    { ...nextCartItem, quantity: quantityIncrement }
  ];
};

export const handleRemoveCartItem = (prevCartItems: ProductData[], id: string) => (
  prevCartItems.filter((cartItem: ProductData) => (cartItem.id !== id))
);

export const handleReduceCartItem = (prevCartItems: ProductData[], id: string) => (
  prevCartItems.map((cartItem: ProductData) => (
    cartItem.id === id
      ? {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      }
      : cartItem
  ))
);
