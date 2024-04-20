const User = require('../Database/database');
const {lemonSqueeztApiInstance} = require('../utils/axios');
const dotenv = require('dotenv').config();

 const purchaseBook = async(req, res) => {
    try {
      const reqData = req.body;
      const email = req.body.email;
  
      console.log(reqData.storeID, email, process.env.LEMON_SQUEZZY_STORE_ID, process.env.LEMON_SQUEEZY_API_KEY)

      if(!reqData.storeID) 
        return res.status(400).json({message: "productId is required"});
  
        console.log('asd')
      const response = await lemonSqueeztApiInstance.post('/checkouts', {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data:{
              custom:{
                user_id: email,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEZZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: reqData.storeID.toString(),
              },
            },
          },
        },
      });
  
      const checkoutUrl = response.data.data.attributes.url;



  console.log(checkoutUrl)
      console.log(response.data);
      console.log('yea')
  
      return res.json({checkoutUrl})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports = purchaseBook;