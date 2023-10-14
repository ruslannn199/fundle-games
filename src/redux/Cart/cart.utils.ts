import type { ProductData, ProductDataToCompare } from '../../types/interfaces';

export const checkCartItemExistence = ({
  prevCartItems, nextCartItem
}: ProductDataToCompare): ProductData | undefined => (
  prevCartItems.find((cartItem) => (
    cartItem.id === nextCartItem.id
  ))
);

export const handleAddToCart = ({
  prevCartItems, nextCartItem
}: ProductDataToCompare): ProductData[] => {
  const quantityIncrement = 1;
  const cartItemExists = checkCartItemExistence({
    nextCartItem,
    prevCartItems,
  })

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

export const handleAmountOfCartItems = (cartItems: ProductData[]): number => (
  cartItems.reduce((quantity, items) => (
    quantity + items.quantity
  ), 0)
);
