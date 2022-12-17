import React from 'react'

import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { cardcontext } from '../../../store/cardcontext';


const Cart = () => {
    const value = useContext(cardcontext);
    const [cart, setCart] = value.cart;
    const [count , setCount] = value.count;
    const increase = value.increase;
    const decrease = value.decrease;
    const remove = value.removeProduct;

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * count)
            }, 0)
            setTotal(res)
        }
        getTotal()
    }, [cart]);

    return (
        <div className='container'>
            {cart.map((item) => (
                <div key={item._id} className="mt-4">

                    <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                            src={`data:${item?.thumbnail.media.contentType};base64,${new Buffer.from(item?.thumbnail.media.data.data).toString("base64")}`}
                            alt="product image" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {item.price}
                            </p>
                            {/** buttons */}
                            <div className="">
                                <button className='p-2 m-4 w-10 bg-green-400 rounded-full ' onClick={() => increase(item._id)}>+</button>
                                <span className='p-2 bg-white rounded-3xl'> تعداد: {count}</span>
                                <button className='p-2 m-4 w-10 bg-red-400 rounded-full ' onClick={() => decrease(item._id)}>-</button>
                                <button className='p-2 m-4  rounded-md bg-red-400' onClick={() => remove(item._id)}> حذف محصول </button>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
            <p className='p-4 bg-red-400'> مجموع قیمت ها : {total} </p>
        </div>
    )
}

export default Cart