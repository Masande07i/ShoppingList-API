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

export const updateItem = (id: number, changes: Partial<Omit<ShoppingListItem, "id">>): ShoppingListItem | undefined =>{ 
  const item = getItemById(id); 
    if(!item) return undefined; 
     if(changes.name !== undefined) item.name = changes.name; 
     if(changes.purchased !== undefined) item.purchased = changes.purchased; 
     if(changes.quantity !== undefined) item.quantity = changes.quantity; 
  return item; 
}


    
