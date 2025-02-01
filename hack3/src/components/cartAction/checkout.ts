// checkout.ts (or checkout.tsx)
export let cartItem: any[] = []; // your cart items
export const setCartItems = (items: any[]) => {
  cartItem = items;
};

export const getTotal = (): number => {
  return cartItem.reduce((total, item) => total + item.price * item.stock, 0);
};

export let form = { name: '', email: '', address: '' };
export const setForm = (newForm: typeof form) => {
  form = newForm;
};
