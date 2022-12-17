import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
//formik
import { Formik, Form, Field, ErrorMessage ,setNestedObjectValues } from "formik";

import { AuthContext } from '../../../../store/authcontext';

import { Updateuserschema } from '../../../../server/model/secure/UpdateUserSchema';
import Uploadpicprofile from './Uploadpicprofile';
const Updateform = () => {
    const { authState } = useContext(AuthContext);
    const {query} = useRouter()
    const [thumbnailId, setThumbnailId] = useState("");
    return (
        <div className='m-10'>
            <h3 className='bg-white font-bold text-lg border-b-2 border-black p-6' > تغییر اطلاعات </h3>
            <Uploadpicprofile setThumbnailId={setThumbnailId}/>
           <Formik
            initialValues={authState.user}
            validationSchema={Updateuserschema}
            enableReinitialize={true}
            onSubmit={async (values) => {
              try {
                const { status, data } = await axios.put("/api/user/updateuser", {values:values , query:query , thumbnailId:thumbnailId})
                if (status === 201) {
                  toast.success("  تغییرات با موفقیت انجام شد ")
                  setThumbnailId("");
                }

              } catch (err) {
                console.log(err)
                if(err.response){
                  toast.error(err.response.data.error)
                }else{
                  toast.error("مشکلی رخ داده است!")
                }
              }
            }}
          >
             <Form className=' bg-white '>
              <div className="mb-6 flex items-center justify-around">
                <div className="mt-2">
                  <label className=' text-lg' > نام  : </label>

                  <Field
                    name="name"
                    type="text"
                    className={`rounded-md p-2 border-black border-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                    placeholder="نام خود را وارد کنید "
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => (
                      <div className="text-red-500">{msg}</div>
                    )}
                  />
                </div>

                <div className="">
                  <label className=' text-lg'>  نام خانوادگی : </label>
                  <Field
                    name="lastname"
                    type="text"
                    className={`rounded-md p-2 border-black border-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                    placeholder="نام خانوادگی خود را وارد کنید "
                  />
                  <ErrorMessage
                    name="lastname"
                    render={(msg) => (
                      <div className="text-red-500">{msg}</div>
                    )}
                  />
                </div>

              </div>

              <div className="mb-6 flex items-center justify-around">
                <div className="">

                  <label className=' text-lg'> ایمیل : </label>
                  <Field
                    name="email"
                    type={"email"}
                    className={`rounded-md p-2 border-black border-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                    placeholder=" ایمیل خود را وارد کنید "
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <div className="text-red-500">{msg}</div>
                    )}
                  />
                </div>

                <div className="">
                  <label className=' text-lg'> موبایل : </label>
                  <Field
                    name="mobile"
                    type={"mobile"}
                    className={`rounded-md p-2 border-black border-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                    placeholder=" *******0913 "
                  />
                  <ErrorMessage
                    name="mobile"
                    render={(msg) => (
                      <div className="text-red-500">{msg}</div>
                    )}
                  />
                </div>
                
              </div>
              <div className="m-4 ">
                <button type={'submit'} className='w-full bg-blue-500 p-2 rounded-lg text-white'>  اعمال تغییرات </button>
              </div>
            </Form>
          </Formik>
        </div>
    )
}

export default Updateform