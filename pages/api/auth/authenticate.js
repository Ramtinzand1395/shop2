import { withIronSession } from "next-iron-session";
import jwt from 'jsonwebtoken'
function handler(req, res, session) {
  const token = req.session.get("token");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return { error: " شما مجوز کافی ندارید .  ", status: "422" };
  }
  res.send({ decodedToken , token });
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "token",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    path: "/",
  },
});