import { IncomingMessage, ServerResponse } from "http";
import { getItemById ,getShoppingList,addItems,deleteItem,updateItem} from "../controllers/shoppingList.js";

export const shoppingListRoute = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url?.startsWith('/shopping-list')) {
        const parts = req.url.split('/');
        const id = parts[2] ? parseInt(parts[2]) : undefined;

        if (req.method === 'GET' && !id) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(getShoppingList()));
            return;
        }

        if (req.method === 'GET' && id){
         if(isNaN(id)){
            res.writeHead(400, {"content-type": "application/json"});
            res.end(JSON.stringify({message: "Invalid item id"}));
            return;
        }
        const item = getItemById(id);
        if (!item){
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({message: "Item not found"}));
            return;
        }
          res.writeHead( 200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(item));
          return;
        }
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try{
                    const { name, quantity, purchased } = JSON.parse(body);
                    if(!name  || typeof name !== "string"){
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({message: "  Name is required and should be a string"}));
                    }
                    if(typeof quantity !== "number"){
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({message: "  Quantity is required and should be a number"}));
                    }
                    if( typeof purchased !== "boolean"){
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({message: "  Purchased is required and should be a boolean"}));
                    }
                     const newItem = addItems(name, quantity, purchased);
                      res.writeHead(201, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(newItem));

                } catch{
                     res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({message: "Invalid JSON"}));
                }
            });
            return;
        } 
        
        if (req.method === 'PUT' && id !== undefined) {
            if (isNaN(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Invalid item ID" }));
            }

            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                try {

                    const updates = JSON.parse(body);
                    const updatedItem = updateItem(id, updates);

                    if (!updatedItem) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ message: "Item not found" }));
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updatedItem));
                } catch {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Invalid JSON" }));
                }
            });
            return;
        }

        if (req.method === 'DELETE' && id !== undefined) {

         if (isNaN(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: "Invalid item id"}));
          return;
        }
        const deletedItem = deleteItem(id);

        if (!deletedItem) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({message: "Item not found"}));
         return;
        }

         res.writeHead(204, { 'Content-Type': 'application/json' });
         res.end(JSON.stringify({message: "No content",item: deletedItem}));
         return;
       }
    }
    
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: "Method not allowed"}));
    }
    

