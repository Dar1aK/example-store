import type { CartState } from "@/types";

/**
 * Форматирует дату в локализованную строку
 * @param date Дата для форматирования
 * @returns Отформатированная строка даты
 */
export function formatDate(date: Date): string {
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const LOCAL_STORAGE_CART_KEY = "example-store-cart";

export const EMPTY_CART: CartState = {};

/**
 * Сохранение состояния корзины в LocalStorage
 * @param cart
 */
export const saveCartToLocalStorage = (cart: CartState): void => {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
};

export const getCartFromLocalStorage = (): CartState => {
  try {
    const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    return json ? (JSON.parse(json) as CartState) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
};
