import type { ShoppingListItem } from "../types/shoppingList.js";

let shoppingList: ShoppingListItem[] = [];

let currentId = 1;

export const getShoppingList = (): ShoppingListItem[] => {
  return shoppingList;
};

export const getItemById = (id: number): ShoppingListItem | undefined => {
    const item = shoppingList.find(item => item.id === id);
    return item;
}

export const addItems = (name: string, quantity: number, purchased: boolean): ShoppingListItem => {
    const newItem: ShoppingListItem = {id: currentId++, name, quantity, purchased};
    shoppingList.push(newItem);
    return newItem;
}