const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/book-writer')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    verify:{
        type: Number,
        default: 0
    },
    books:{
        type: Array,
        default: []
    }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;