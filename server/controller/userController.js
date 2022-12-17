const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const Media = require("../model/Medai");
exports.creatUser = async (data) => {

    try {
        const {email} = data;
        const user = await User.findOne({ email });
        if (user) {
            return { error: "ایمیل  وارد شده تکراری است!", status: "ERROR" };

        } else {
            const user = await User.create(data);
            return { data: user, status: "201" };
        }
    } catch (err) {
        console.log(err)
    }
};

//handel login
exports.handleLogin = async ({ email, password }) => {
    const maxage = 3 * 24 * 60 * 60;
    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return { error: " نام کاربری یا پسورد اشتباه میباشد .  ", status: "422" };
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (isEqual) {
            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    email: user.email,
                    name: user.name,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: maxage,
                }
            );
            return { token, status: "200" };
        } else {
            return { error: " نام کاربری یا پسورد اشتباه میباشد .  ", status: "422" };
        }
    } catch (err) {
        console.log(err)
    }
};

exports.dinamicStorage = async ({ email }) => {
    const user = await User.findOne({ email }).populate("profilePhoto");
    const { createdAt, role, profilePhoto, name , lastname , mobile , _id } = user;
    return{email, createdAt, role , profilePhoto , name , userId:_id , lastname , mobile }
};

exports.updateUser = async (_id , data , thumbnailId) => {
    const {email , name , lastname , role , mobile , profilePhoto } = data
    if(thumbnailId){
        const DeleteMedia = await Media.findOneAndRemove({profilePhoto})
        const user = await User.findOneAndUpdate({ _id } ,{email , name , lastname , role , mobile , profilePhoto:thumbnailId} , {new:true});
        return { user, status: "SUCCESS" };
    }else{
        const user = await User.findOneAndUpdate({ _id } ,{email , name , lastname , role , mobile} , {new:true});
        return { user, status: "SUCCESS" };
    }
};

exports.updatepassword = async (_id , data) => {
    const {oldpassword , newpassword} = data;
    const findUser = await User.findOne({ _id });
    const isEqual = await bcrypt.compare(oldpassword, findUser.password);
    if (isEqual) {
        const hash = await bcrypt.hash(newpassword, 10);
        const user = await User.findByIdAndUpdate({ _id } , { password:hash },{ new: true });
        return { user, status: "SUCCESS" };
      } else {
        return { error: "رمز عبور وارد شده مطابقت ندارد!", status: "ERROR" };
      }
  };

  exports.getUsers = async () => {
    const users = await User.find({role:"user"})
    return { users, status: "SUCCESS" };

  }
