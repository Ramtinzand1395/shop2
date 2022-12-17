import { updatepassword } from "../../../server/controller/userController";


export default async function handler(req , res){
    const data =await updatepassword(req.body.query.params, req.body.values)
    if(data.status === "SUCCESS"){
        res.status(201).json(data)
    }else{
        res.status(400).json(data)
    }
}