const { response } = require("express");
const { lemonSqueeztApiInstance } = require("../utils/axios");
const dotenv = require('dotenv').config();



const purchaseTry = async(req,res) =>{
    try {
        const reqData = await req.body;

        



        if(!reqData.productID) return res.status(400).json({message: 'productId is required'});


        const response = await lemonSqueeztApiInstance.post('/checkouts', {
            data: {
                type: "checkouts",
                attributes: {
                  checkout_data: {
                    custom: {
                      user_id: reqData.email,
                      number: reqData.number.toString(),
                      bookName: reqData.bookName,
                      pageLength: reqData.pageLength.toString(),
                      description: reqData.description,
                      author: reqData.author
                    }
                  }
                },
                relationships: {
                  store: {
                    data: {
                      type: "stores",
                      id: process.env.LEMON_SQUEZZY_STORE_ID.toString(),
                    }
                  },
                  variant: {
                    data: {
                      type: "variants",
                      id: reqData.productID.toString(),
                    }
                  }
                }
              }
        });

        const checkoutUrl = response.data.data.attributes.url;
        console.log(checkoutUrl);

        return res.json({checkoutUrl});



    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');



    }
}

module.exports = purchaseTry;