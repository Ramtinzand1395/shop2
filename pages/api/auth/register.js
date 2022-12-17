import { creatUser } from "../../../server/controller/userController.js"

export default async(req,res)=>{
  try {
    const data = await creatUser(req.body)
    if(data.status === "201"){
      res.status(201).json(data)
      
    }else if(data.status === "ERROR"){
        console.log(data.error)
        console.log(data)
      res.status(422).json(data)
    }
  } catch (err) {
    console.log(err)
  }

}