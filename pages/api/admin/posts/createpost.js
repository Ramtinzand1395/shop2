import { creatPost , updatePost } from "../../../../server/controller/postsController"

export default async(req,res)=>{
  if (req.method === "POST") {
  try {
    const data = await creatPost(req.body.thumbnailId,req.body.values , req.body.query.userId)
    if(data.status === "SUCSSES"){
      res.status(200).json(data)
    }
  } catch (err) {
    console.log(err)
  }
  }else if (req.method === "PUT"){
    try {
      const {values , query , thumbnailId} = req.body
      const data = await updatePost(query.userId , values , thumbnailId)
      if(data.status === "SUCCESS"){
        res.status(201).json(data)
      }
    } catch (err) {
      console.log(err)
    }
  }
}