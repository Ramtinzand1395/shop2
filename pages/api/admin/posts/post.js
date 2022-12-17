import { getpost } from "../../../../server/controller/postsController"

export default async(req,res)=>{
  try {
    const data = await getpost(req.query)
    if(data.status === "SUCSSES"){
      res.status(200).json(data)
    }
  } catch (err) {
    console.log(err)
  }

}