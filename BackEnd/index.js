const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());


const User = require('./Database/database');
const {signup, login} = require('./Access/Access');
const verify = require('./Verify/verify');
const purchaseBook = require('./Purchase/PurchaseBook');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.put('/signup', signup);
app.post('/login', login);
app.put('/verify', verify);
app.post('/purchaseBook', purchaseBook);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });