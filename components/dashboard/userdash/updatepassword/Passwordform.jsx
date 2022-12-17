import React, { useContext } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
//formik
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Updatepasswordschema } from '../../../../server/model/secure/Updatepasswordschema';

const Passwordform = () => {
  const {query} = useRouter()

  return (
    <div>
      <div className='m-10'>
        <h3 className='bg-white font-bold text-lg border-b-2 border-black p-6' > تغییر اطلاعات </h3>
        <Formik
          initialValues={{
            oldpassword: "",
            newpassword: "",
            re_newpassword: "",
          }}
          validationSchema={Updatepasswordschema}
          onSubmit={async (values) => {
            try {
              const { status, data } = await axios.put("/api/user/updatepassword", {values:values , query:query})
              if (status === 201) {
                toast.success(" ثبت نام با موفقیت انجام شد ")
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
          <Form className=' bg-white flex flex-col p-10'>
            <label className=' text-lg'> پسورد قدیمی  : </label>
            <Field
              name="oldpassword"
              type={"password"}
              className={`rounded-md border-2 border-black w-4/12  p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
              placeholder="پسورد  "
            />
            <ErrorMessage
              name="oldpassword"
              render={(msg) => (
                <div className="text-red-500">{msg}</div>
              )}
            />

            <label className=' text-lg'> پسورد جدید : </label>
            <Field
              name="newpassword"
              type={"password"}
              className={`rounded-md p-2  border-2 border-black w-4/12 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
              placeholder="پسورد  "
            />
            <ErrorMessage
              name="newpassword"
              render={(msg) => (
                <div className="text-red-500">{msg}</div>
              )}
            />

            <label className=' text-lg'>   تایید پسورد : </label>
            <Field
              name="re_newpassword"
              type={"password"}
              className={`rounded-md p-2  border-2 border-black w-4/12 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
              placeholder="تایید پسورد  "
            />
            <ErrorMessage
              name="re_newpassword"
              render={(msg) => (
                <div className="text-red-500">{msg}</div>
              )}
            />

            <div className="mt-4 ">
              <button type={'submit'} className='w-4/12 bg-blue-500 p-2 rounded-lg text-white'> ثبت نام </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Passwordform