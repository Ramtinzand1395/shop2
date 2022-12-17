import { updateUser } from "../../../server/controller/userController"


export default function handler (req,res){
    const {values , userId} = req.body
    const data = updateUser(userId , values )
    res.status(201).json(data.user)
}