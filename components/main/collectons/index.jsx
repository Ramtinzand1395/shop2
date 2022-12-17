import axios from 'axios'
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { cardcontext } from '../../../store/cardcontext';
import Lastcollections from './Lastcollections'

const Collections = ({cats , lastposts }) => {
    const value = useContext(cardcontext);
    const addto = value.Addtocart;

    const [data , setData] = useState([]);
    const handleClickRadioBtn = async (text) => {
        axios
          .get("/api/admin/posts/post", {
            params: { type: "cats", text },
          })
          .then((res) => {
            setData(res.data.data);
          })
          .catch((err) => console.log(err));
      };
    return (
        <div className='container mt-10'>
            {/** بالا */}
            <div className="flex flex-col items-center justify-center">
                <h4 className='font-bold text-2xl border-b-2 border-b-red-400' > دسته بندی محصولات </h4>
                <h2 className='mt-5 font-bold'> دسته بندی محصول را انتخاب کنید </h2>
            </div>

            {/** دسته بندی */}
            <div className="mt-2">
                <ul className='flex items-center justify-around'>
                    {
                        cats.map((item)=>(
                    <li className='' key={item._id}>
                        <button
                            type="button"
                            onClick={() => handleClickRadioBtn(item.title)}
                            value={item.title}
                            className="
                             inline-block px-7 py-3 bg-red-600 text-white font-medium leading-tight uppercase rounded-full shadow-md
                             hover:bg-red-700 hover:shadow-lg
                             focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                             active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"> {item.title} </button>
                    </li>
                        ))
                    }
                </ul>
            </div>

            {/**  محصولات */}
            <div className="mt-4 grid grid-cols-3 gap-4">
{
    data.map((item)=>(
                <div key={item._id} className="w-full max-w-sm rounded-lg shadow-md" style={{ backgroundColor: "#FFC2C7" }}>
                    <Link href={"/product/[productId]"} as={`/product/${item._id}`}>
                        <img 
                        className="p-8 rounded-t-lg" 
                         src={`data:${item?.thumbnail.media.contentType};base64,${new Buffer.from(item?.thumbnail.media.data.data).toString("base64")}`}
                          alt="product image" />
                    </Link>
                    <div className="px-5 pb-5">
                        <Link href={"/product/[productId]"} as={`/product/${item._id}`} >
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900"> {item.title} </h5>
                        </Link>
                        <div className="flex items-center mt-2.5 mb-5">
                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">{item.votes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold">{item.price}</span>
                            <button onClick={()=>addto(item)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "> اضافه کردن به سبد خرید </button>
                        </div>
                    </div>
                </div>
    ))
}
            </div>
                {/** آخرین محصولات */}
                <Lastcollections lastposts={lastposts} />
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const getcats = (
      await axios.get("/api/admin/posts/createcats", {
        params: { type: "cats", text: "scifi" },
      })
    ).data;
  
    return {
      props: {
        cats: getcats,
      },
    };
  };
  

export default Collections