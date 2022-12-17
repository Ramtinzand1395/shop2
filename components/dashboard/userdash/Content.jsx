import React, { useContext } from 'react'
import { AuthContext } from '../../../store/authcontext';

const Content = () => {
    const { authState} = useContext(AuthContext);

  return (
    <div>
        <div className="bg-white m-10">
            <h3 className='border-b-2 border-black font-bold text-lg p-4'> اطلاعات حساب </h3>
            <div className="flex items-center justify-around p-4">
                <p> نام :{authState.user.name}  </p>
                <p> خانوادگی نام :{authState.user.lastname}  </p>
            </div>
            <div className="flex items-center justify-around p-4">
                <p> موبایل :{authState.user.mobile}  </p>
                <p> ایمیل :{authState.user.email}  </p>
            </div>
        </div>
    </div>
  )
}

export default Content