import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Updateuser from './Updateuser';

const Users = () => {
    const [userData, setUserData] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState([]);
    const OpenModalmethod = (id) => {
        setOpenModal(!openModal)
        setModalData(userData.find((item) => item._id === id))
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get("/api/user/userinfo")
                setUserData(data.users)
            } catch (err) {
                console.log(err)
            }
        }
        fetch();
    }, [])
    return (
        <div className='mt-5'>
            <div className="overflow-x-auto relative ">
                <table className="w-full text-sm text-white dark:text-gray-400 text-right  ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th scope="col" className="py-3 px-6 ">
                                عکس پروفایل
                            </th>
                            <th scope="col" className="py-3 px-6 ">
                                نام کاربری
                            </th>
                            <th scope="col" className="py-3 px-6">
                                نقش
                            </th>
                            <th scope="col" className="py-3 px-6">
                                پست الکترونیکی
                            </th>
                            <th scope="col" className="py-3 px-6">
                                تغییر یوزر
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((item) => (
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className=" py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img src={`data:${item?.profilePhoto.media.contentType};base64,${new Buffer.from(item?.profilePhoto.media.data.data).toString("base64")}`}
                            alt="profile" 
                            className='w-20 h-20'
                            />
                            </th>
                            <th scope="row" className=" py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </th>
                            <td className="py-4 px-6 text-white ">
                                {item.role}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                {item.email}
                            </td>
                            <td className="py-4 px-6 text-white ">
                                <button id={item._id} onClick={() => OpenModalmethod(item._id)} className='p-2 bg-green-400 rounded-md'> تغییر وضعیت </button>
                                {openModal && <Updateuser setOpenModal={setOpenModal} openModal={openModal} modalData={modalData} />
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

export default Users