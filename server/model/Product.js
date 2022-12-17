const mongoose = require('mongoose');

const voteSchema = require("./vote");
const commentSchema = require("./comment");

const productschema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
        trim: true,
    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Media",
    },
    details:{
        required:true,
        type:String,
        trim: true,
    },
    price:{
        required:true,
        type:Number,
        trim: true,
    },
    qty:{
        required:true,
        type:Number,
        default:0,
    },
    status:{
        type: String,
        default:"خصوصی",
        enum: ["خصوصی" , "عمومی" ],
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    votes: [voteSchema],
    comments: [commentSchema],
    category:{
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

productschema.pre(/^find/, function () {
    this.populate('thumbnail')
     
  });
module.exports = mongoose.models.product || mongoose.model("product" , productschema)