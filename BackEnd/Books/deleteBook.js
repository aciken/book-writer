const User = require('../Database/database');

const deleteBook = async(req, res) => {
    try {
        const reqData = await req.body;

        const user = await User.findOne({ email: reqData.email });
        if(user){
            user.books.splice(reqData.number, 1);
            for(let i = reqData.number; i < user.books.length; i++) {
                user.books[i].number -= 1;
            }
            await user.save();
            res.status(200).json({message: 'Book deleted successfully'});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteBook;