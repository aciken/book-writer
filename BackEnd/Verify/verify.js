const User = require('../Database/database');

const verify = async (req, res) => {
    const { email,code } = req.body;
    try {
        const user = await User.findOne({email:email})
        if(user.verify == code){
            user.verify = 1;
            await user.save();
            res.json({message: "verified"});
        } else{
            res.json({message: "failed"});
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = verify;
