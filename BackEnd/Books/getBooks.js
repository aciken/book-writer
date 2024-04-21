const User = require('../Database/database');

const getBooks = async(req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(user) {
            return res.json({books: user.books})
        }

        
    } catch (error) {
        console.log(error);
    }

}

module.exports = getBooks;


