const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());


const User = require('./Database/database');
const {signup, login} = require('./Access/Access');
const verify = require('./Verify/verify');
const pdfCreate = require('./PDF/pdfCreate');
const purchaseTry = require('./Purchase/purchaseTry');
const purchaseWebhook = require('./Purchase/purchaseWebhook');
const getBooks = require('./Books/getBooks');
const createBook = require('./Books/createBook');
const deleteBook = require('./Books/deleteBook');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.put('/signup', signup);
app.post('/login', login);
app.put('/verify', verify);
app.post('/getBooks', getBooks)
app.post('/pdfCreate', pdfCreate);
app.post('/api/purchaseTry', purchaseTry);
app.post('/api/purchaseWebhook', purchaseWebhook);
app.put('/createBook', createBook);
app.put('/deleteBook', deleteBook);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });