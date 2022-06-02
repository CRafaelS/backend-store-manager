const express = require('express');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');
const { 
  validateProductName, 
  validateProductQuantity,
} = require('./middlewares/productMiddleware');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAll);
app.get('/products/:id', productsControllers.findById);
app.post('/products', validateProductName, validateProductQuantity, productsControllers.create);
app.put('/products/:id', productsControllers.update);
app.delete('/products/:id', productsControllers.deleteProduct);

app.get('/sales', salesControllers.getAll);
app.get('/sales/:id', salesControllers.findById);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
