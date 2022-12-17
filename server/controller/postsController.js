const Products = require("../model/Product");
const Category = require("../model/Category");
const Media = require("../model/Medai");


exports.creatPost = async (thumbnailId , data , userId) => {
    const {title, details, price, qty, status , category } = data
    try {
        const post = await Products.create({title, details, price, qty, status , category ,thumbnail:thumbnailId , user:userId});
        return { data: post, status: "SUCSSES" };
    } catch (err) {
        console.log(err)
    }
};

exports.creatCats = async ( data) => {
    try {
        const cat = await Category.create(data);
        return { data: cat, status: "SUCSSES" };
    } catch (err) {
        console.log(err)
    }
};

exports.getCats = async () => {
    try {
        const cat = await Category.find({})
        return { data: cat, status: "SUCSSES" };
    } catch (err) {
        console.log(err)
    }
};

exports.getpost = async ({type , text , productId}) => {
    if(text === ""){
        try {
            const post = await Products.find({category:"کلاه"})
            return { data: post, status: "SUCSSES" };
        } catch (err) {
            console.log(err)
        }
    }
    if(type === "cats"){
        try {
            const post = await Products.find({category:text})
            return { data: post, status: "SUCSSES" };
        } catch (err) {
            console.log(err)
        }
    }else if(type === "last"){
        try {
            const post = await Products.find({}).sort("-createdAt").limit(3)
            return { data: post, status: "SUCSSES" };
        } catch (err) {
            console.log(err)
        }
    }else if(type === "product"){
        try {
            const post = await Products.find({_id:productId})
            return { data: post, status: "SUCSSES" };
        } catch (err) {
            console.log(err)
        }
    }else if(type === "similarproduct"){
        try {
            const post = await Products.find({_id:productId})
            const similar = await Products.find({category:post[0].category})
            return { data: similar, status: "SUCSSES" };
        } catch (err) {
            console.log(err)
        }
    }else{
        try {
            const post = await Products.find({})
            return { data: post, status: "SUCSSES" };
        } catch (err) {
            console.log(err)
        }
    }
};

exports.updatePost = async (userId , data ,thumbnailId) => {
    const {_id } = data
    if(thumbnailId){
        const DeleteMedia = await Media.findOneAndRemove({thumbnailId})
        const Upproduct = await Products.findOneAndUpdate({ _id } ,{data, thumbnail:thumbnailId} , {new:true});
        return { Upproduct, status: "SUCCESS" };
    }else{
        const Upproduct = await Products.findOneAndUpdate({ _id } ,data , {new:true});
        return { Upproduct, status: "SUCCESS" };
    }
};

exports.createComment = async ({ userId, values , query }) => {
    if(userId){
        const AddComment = await Products.findByIdAndUpdate(
           {_id:query.productId},
          { $push: { comments: { user: userId, content: values.comment } } },
          { new: true }
        );
        return {AddComment, status: "SUCCESS" };
    }else{
        return { error:"برای ثبت نظر وارد شوید", status: "ERROR" };
    }
  };
