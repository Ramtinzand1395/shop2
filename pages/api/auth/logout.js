import { withIronSession } from "next-iron-session";

const handler = async(req,res)=>{
    req.session.destroy();
      res.status(200).json("خروج با موفقیت انجام شد .")
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "token",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly:true,
    path: "/" ,
  },
});