const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userschema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim: true,
    },
    lastname:{
        required:true,
        type:String,
        trim: true,
    },
    mobile:{
        required:true,
        type:Number,
        trim: true,
    },
    email:{
        required:true,
        type:String,
        unique: true,
    },
    password:{
        type:String,
        require:true,
        minlength: 4,
        maxlength: 255,
    },
    profilePhoto: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Media",
        default:"63877cec85f81359b31e2ed0",
    },
    role:{
        type: String,
        required: true , 
        default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userschema.pre("save", function (next) {
    let user = this;

    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

userschema.pre(/^find/, function () {
    this.populate('profilePhoto')
     
  });

module.exports = mongoose.models.User || mongoose.model("User" , userschema)