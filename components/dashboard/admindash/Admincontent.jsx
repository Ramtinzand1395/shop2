import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../store/authcontext';

const Admincontent = () => {
    const { authState } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
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
        <div className=' m-10'>
            <div className="grid grid-cols-4 gap-4">
                {/** کاربران */}
                <div className="bg-red-400 rounded-lg">
                    <h3 className='font-bold text-lg text-white border-b-white border-b-2 text-center'> کاربران </h3>
                    <Link href={"/admindashboard/users/[userId]"} as={`/admindashboard/users/${authState.user?.userId}`}>
                    <p className='m-4'>{userData.length} تعداد کاربران </p>
                    </Link>

                    <Link href={"/admindashboard/adminusers/[userId]"} as={`/admindashboard/adminusers/${authState.user?.userId}`}>
                    <p className='m-4'> تعداد کاربران ادمین </p>
                    </Link>
                </div>

                {/** محصولات  */}
                <div className="bg-green-400 rounded-lg">
                    <h3 className='font-bold text-lg text-white border-b-white border-b-2 text-center'> محصولات </h3>
                    <Link href={"/admindashboard/posts/[userId]"} as={`/admindashboard/posts/${authState.user?.userId}`}>
                    <p className='m-4'> تعداد محصولات </p>
                    </Link>
                    <Link href={"/admindashboard/cats/[userId]"} as={`/admindashboard/cats/${authState.user?.userId}`}>
                    <p className='m-4'> دسته بندی ها </p>
                    </Link>
                </div>

                {/** خرید ها */}
                <div className="bg-blue-400 rounded-lg">
                    <h3 className='font-bold text-lg text-white border-b-white border-b-2 text-center'> خرید ها </h3>

                    <p className='m-4'> مجموع کل خرید ها </p>
                    <p className='m-4'> در این ماه مجموع کل خرید ها </p>

                </div>

                {/** پست ها */}
                <div className="bg-orange-400 rounded-lg">
                    <h3 className='font-bold text-lg text-white border-b-white border-b-2 text-center'> پست ها </h3>

                    <p className='m-4'> پست ها تعداد کل </p>
                    <p className='m-4'> در این ماه پست ها تعداد کل </p>

                </div>
            </div>
        </div>
    )
}

export default Admincontent