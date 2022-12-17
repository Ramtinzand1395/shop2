import React from 'react'
import Sidebar from '../../Sidebar'
import Users from './Users'

const Userstable = () => {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-10 gap-2'>
        {/** ساید بار */}
        <div className="sm:col-span-1 md:col-span-2">
            <Sidebar />
        </div>
        {/** محتوا */}
        <div className="sm:col-span-1 md:col-span-8">
            <Users />
        </div>
    </div>
  )
}

export default Userstable