import { createComment } from "../../../../server/controller/postsController"

export default async(req,res)=>{
  try {
    const data = await createComment( req.body,req.body.values , req.body.query)
    if(data.status === "SUCCESS"){
        res.status(200).json(data)
    }else{
        res.status(422).json(data)
    }
  } catch (err) {
    console.log(err)
  }

}