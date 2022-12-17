import { updateUser } from "../../../server/controller/userController";


export default async function handler(req , res){
    const data =await updateUser(req.body.query.params, req.body.values , req.body.thumbnailId)
    if(data.status === "SUCCESS"){
        res.status(201).json(data)
    }else{
        res.status(400).json(data)
    }
}