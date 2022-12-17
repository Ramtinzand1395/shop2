import { withIronSession } from "next-iron-session";
import { handleLogin } from "../../../server/controller/userController";

const handler = async(req,res)=>{
  try {
    const { password , email} = req.body
    const data = await handleLogin({password , email})
    if(data.status === "200"){
      req.session.set("token", data.token);
      await req.session.save();
      res.status(200).json(data)
    }else if(data.status === "422"){
      res.status(422).json(data)
    }
  } catch (err) {
    console.log(err)
  }

}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "token",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 *24 *7 ,
    httpOnly:true,
    path: "/" ,
  },
});