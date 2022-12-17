import { creatCats , getCats } from "../../../../server/controller/postsController"

export default async(req,res)=>{
  if (req.method === "POST") {
  try {
    const data = await creatCats(req.body)
    if(data.status === "SUCSSES"){
      res.status(200).json(data)
    }
  } catch (err) {
    console.log(err)
  }
  }else if (req.method === "GET"){
    try {
      const data = await getCats(req.query)
      if(data.status === "SUCSSES"){
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
    }
  }
}