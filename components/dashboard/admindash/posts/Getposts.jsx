import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Updatepost from './Updatepost';

const Getposts = () => {
    const [tabeleData, setTabeleData] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState([]);
    const OpenModalmethod = (id) => {
        setOpenModal(!openModal)
        setModalData(tabeleData.find((item) => item._id === id))
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get("/api/admin/posts/post")
                setTabeleData(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetch();
    }, []);
    return (
        <div className='m-10'>
            <div className="overflow-x-auto relative ">
                <table className="w-full text-sm text-white dark:text-gray-400 text-right  ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th scope="col" className="py-3 px-6 ">
                                عکس بند انگشتی
                            </th>
                            <th scope="col" className="py-3 px-6 ">
                                نام پست 
                            </th>
                            <th scope="col" className="py-3 px-6 ">
                                ادمین 
                            </th>
                            <th scope="col" className="py-3 px-6">
                                تعداد
                            </th>
                            <th scope="col" className="py-3 px-6">
                                توضیحات 
                            </th>
                            <th scope="col" className="py-3 px-6">
                                 کامنت ها
                            </th>
                            <th scope="col" className="py-3 px-6">
                                  وضعیت
                            </th>
                            <th scope="col" className="py-3 px-6">
                                    قیمت
                            </th>
                            <th scope="col" className="py-3 px-6">
                                    تاریخ ایجاد
                            </th>
                            <th scope="col" className="py-3 px-6">
                                    ویرایش
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabeleData.map((item) => (
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className=" py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img src={`data:${item?.thumbnail.media.contentType};base64,${new Buffer.from(item?.thumbnail.media.data.data).toString("base64")}`}
                            alt="profile" 
                            className='w-20 h-20'
                            />
                         </th>
                            <th scope="row" className=" py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.title}
                            </th>
                            <td className="py-4 px-6 text-white ">
                                {item.user.name}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                {item.qty}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                {item.details}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                {item.comment}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                {item.status}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                {item.price}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                {item.createdAt}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                <button id={item._id} onClick={() => OpenModalmethod(item._id)} className='p-2 bg-green-400 rounded-md'> تغییر وضعیت </button>
                                {openModal && <Updatepost setOpenModal={setOpenModal} openModal={openModal} modalData={modalData} />
                                }
                            </td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Getposts