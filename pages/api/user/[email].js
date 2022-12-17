import { dinamicStorage } from "../../../server/controller/userController"

export default async(req,res)=>{
    const email = req.query.email
    const userData = await dinamicStorage({email})
    res.status(200).json(userData)
    
}