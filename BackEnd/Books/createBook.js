const User = require('../Database/database');

const createBook = async(req, res) =>{
    try {
        const reqData = await req.body;

        const user = await User.findOne({ email: reqData.email });
        if(user){
            user.books.push({number: reqData.number, bookName: reqData.bookName, bookStatus: 'unpaid'});
            await user.save();
            res.status(200).json({message: 'Book created successfully'});
        }


}
    catch (error) {
        console.log(error);
    }
}

module.exports = createBook;