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

export const deleteItem = (id: number): ShoppingListItem | undefined => {
    const item = shoppingList.find(item => item.id === id);
    if (!item) {
        return undefined;
    }
    shoppingList = shoppingList.filter(item => item.id !== id);
    return item;
};

export const updateItem = ( id: number,name: string, quantity: number,purchased: boolean): ShoppingListItem | undefined => {
    const item = shoppingList.find(item => item.id === id);
    if (!item) {
        return undefined;
    }
    item.name = name;
    item.quantity = quantity;
    item.purchased = purchased;
    return item;
};

    
