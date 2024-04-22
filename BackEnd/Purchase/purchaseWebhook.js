const crypto = require('crypto');
const User = require('../Database/database');
const pdfCreate = require('../PDF/pdfCreate');

const purchaseWebhook = async (req, res) => {
    try {
        let reqClone = Object.assign({}, req);
    const eventType = req.headers.content_type;
    const body = req.body;
    
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
        if (!secret) {
          console.error('The secret is undefined!');
          return res.status(500).json({message: "Server Error"});
        }
    
    
    
        const hmac      = crypto.createHmac('sha256', secret);
        const digest    = Buffer.from(hmac.update(JSON.stringify(req.body)).digest('hex'), 'utf8');
        const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');
    
        console.log(digest, signature)
        console.log(signature.length, digest.length)
        if (digest.length !== signature.length) {
          console.error('The digest and signature have different lengths!');
          return res.status(400).json({message: "Invalid request"});
        }
    
    
        console.log(body);
    


        if(eventType === "order_created"){
          const userId = body.meta.custom_data.user_id;
          const isSuccesful = body.data.attributes.status === "paid";
      }


        const userID = body.meta.custom_data.user_id;
        const number = parseInt(body.meta.custom_data.number, 10);


        
        const user = await User.findOne({ email: userID });
        console.log(userID, number, user)
        if(user){
            const book = user.books.find(book => book.number === number);
            if(book){
                book.bookStatus = 'paid';
                user.markModified('books');
                await user.save();
            }
        }


        const bookName = body.meta.custom_data.bookName;
        const pageLength = body.meta.custom_data.pageLength;
        const description = body.meta.custom_data.description;
        const author = body.meta.custom_data.author;

    
        // Call pdfCreate
        const pdfCreateReq = {
          body: {
              pageLength: pageLength,
              description: description,
              title: bookName,
              author: author,
          }
      };
      const pdfCreateRes = {
          status: (statusCode) => ({
              send: (message) => console.log(message),
              json: (message) => console.log(message)
          })
      };
      pdfCreate(pdfCreateReq, pdfCreateRes);
    
    
        return res.status(200).json({message: "Webhook received successfully"});
      } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
      }
}   

module.exports = purchaseWebhook;