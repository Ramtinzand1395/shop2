import Link from 'next/link';
import React, { useContext } from 'react'
import { AuthContext } from '../../store/authcontext';

const Sidebar = () => {
    const { authState, isAuthenticated, logout } = useContext(AuthContext);

    return (
        <div>
            {
             authState.user?.profilePhoto ?
            <div className="flex items.center justify-center bg-blue-100">
                <img
                    src={`data:${authState.user?.profilePhoto.media.contentType};base64,${new Buffer.from(authState.user?.profilePhoto.media.data.data).toString("base64")}`}
                    className="rounded-full w-32 h-32 m-6" alt="profile" />
            </div>
            :
            <div className="flex items.center justify-center bg-blue-100">
                <img
                      src={`https://secure.gravatar.com/avatar/${authState.user?._id}?s=90&d=identicon`}
                      className="rounded-full w-32 h-32 m-6" alt="profile" />
            </div>
            }
            <div className="bg-white">
                <ul >
                    <li className='p-6 hover:border-b-red-400 hover:border-b-2 cursor-pointer'>
                        <Link href={"/dashboard/[userId]"} as={`/dashboard/${authState.user?.userId}`} >
                            پروفایل
                        </Link>
                    </li>
                    <li className='p-6 hover:border-b-red-400 hover:border-b-2 cursor-pointer'>
                        <Link href={"/dashboard/updateprofile/[userId]"} as={`/dashboard/updateprofile/${authState.user?.userId}`}>
                            پروفایل ویرایش
                        </Link>
                    </li>
                    <li className='p-6 hover:border-b-red-400 hover:border-b-2 cursor-pointer'>
                        <Link href={"/dashboard/updatepassword/[userId]"} as={`/dashboard/updatepassword/${authState.user?.userId}`}>
                            تغییر رمز عبور
                        </Link>
                    </li>
                    <li className='p-6 hover:border-b-red-400 hover:border-b-2 cursor-pointer'>
                        <Link href={"/dashboard/[userId]"} as={`/dashboard/${authState.user?.userId}`}>
                            خرید های من
                        </Link>
                    </li>
                    {authState.user?.role === "admin" &&
                    <div className="">
                     <li className='p-6 bg-red-400 border-b-white border-b-2 cursor-pointer'>
                        <Link href={"/admindashboard/[userId]"} as={`/admindashboard/${authState.user?.userId}`}>
                              داشبور ادمین
                        </Link>
                    </li>
                    <li className='p-6 bg-red-400 border-b-white border-b-2 cursor-pointer'>
                    <Link href={"/addpost/[userId]"} as={`/addpost/${authState.user?.userId}`}>
                           اضافه کردن محصول جدید
                    </Link>
                </li>
                </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar