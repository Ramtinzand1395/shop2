import React, { useState } from 'react'
import items from '../../../public/assets/films/film1.jpg'

const Blog = ({lastposts}) => {
    const [data, setData] = useState(lastposts.data);

    return (
        <div className='container mt-10'>
            {/** بالا */}
            <div className="flex flex-col items-center justify-center">
                <h4 className='font-bold text-2xl border-b-2 border-b-red-400' > آخرین مقاله ها </h4>
                <h2 className='mt-5 font-bold'> آخرین مقاله ها اضافه شده </h2>
            </div>

            {/** آخرین مقاله ها */}
            <div className="grid grid-cols-3 gap-2">
{
    data.map((item)=>(
        <div key={item._id} className="max-w-sm rounded-lg  shadow-xl">
                   <a href="#" className='flex items-center justify-center'>
                        <img
                         className="rounded-t-3xl"
                         src={`data:${item?.thumbnail.media.contentType};base64,${new Buffer.from(item?.thumbnail.media.data.data).toString("base64")}`}
                         alt="product pic"  />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-red-600">{item.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-center ">{item.details}</p>
                        <p className='text-center'> {item.createdAt} </p>
                    </div>
                </div>
    ))
}
            </div>
        </div>
    )
}

export default Blog