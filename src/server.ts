import http , {IncomingMessage, ServerResponse} from 'http';
import { shoppingListRoute } from './routes/shoppingList.js';

const PORT =3000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
     
    if(req.url?.startsWith('/shopping-list')) {
        shoppingListRoute(req, res);
    }else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'MASANDE'})); 
    }
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});