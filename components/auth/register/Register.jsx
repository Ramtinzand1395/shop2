import Link from 'next/link'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';

//styles
import styles from './register.module.css'

//pic
import man from '../../../public/assets/man-taking-note.png'

//validation
import { Userschema } from '../../../server/model/secure/Userschema';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter()

  return (
    <div className={`${styles.center}  `}>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 w-full h-96 rounded-3xl container">

        {/** سمت راست */}
        <div className="sm:col-span-1 md:col-span-2 bg-green-400 ">
          <div className="flex items-center justify-center">
            <h3 className='text-center mt-6 font-bold text-lg text-white border-b-2 border-b-white'> ثبت نام کاربران </h3>
          </div>

          {/** فرم ثبت نام */}
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              mobile: "",
              email: "",
              password: "",
              re_password: "",
            }}
            validationSchema={Userschema}
            onSubmit={async (values) => {
              try {
                const { status, data } = await axios.post("/api/auth/register", values)
                if (status === 201) {
                  toast.success(" ثبت نام با موفقیت انجام شد ")
                  router.push('/auth/login')
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
            <Form className='mt-10'>
              <div className="mb-6 flex items-center justify-around">
                <div className="">
                  <label className='text-white text-lg' > نام  : </label>

                  <Field
                    name="name"
                    type="text"
                    className={`rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
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
                  <label className='text-white text-lg'>  نام خانوادگی : </label>
                  <Field
                    name="lastname"
                    type="text"
                    className={`rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
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

                  <label className='text-white text-lg'> ایمیل : </label>
                  <Field
                    name="email"
                    type={"email"}
                    className={`rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
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
                  <label className='text-white text-lg'> موبایل : </label>
                  <Field
                    name="mobile"
                    type={"mobile"}
                    className={`rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
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
              <div className="mb-6 flex items-center justify-around">
                <div className="">
                  <label className='text-white text-lg'> پسورد  : </label>
                  <Field
                    name="password"
                    type={"password"}
                    className={`rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                    placeholder="پسورد  "
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <div className="text-red-500">{msg}</div>
                    )}
                  />
                </div>

                <div className="">
                  <label className='text-white text-lg'>   تایید پسورد : </label>
                  <Field
                    name="re_password"
                    type={"password"}
                    className={`rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                    placeholder="تایید پسورد  "
                  />
                  <ErrorMessage
                    name="re_password"
                    render={(msg) => (
                      <div className="text-red-500">{msg}</div>
                    )}
                  />
                </div>

              </div>
              <div className="mx-4 ">
                <button type={'submit'} className='w-full bg-blue-500 p-2 rounded-lg text-white'> ثبت نام </button>
              </div>
            </Form>
          </Formik>
        </div>

        {/** سمت چپ */}
        <div className="col-span-1 bg-white flex flex-col items-center justify-center rounded-l-3xl">
          <img src={man.src} alt="register" />
          <Link href={"/auth/login"}>
            <button className=' mt-6 rounded-md   border-2 border-rose-300 px-6 p-2 hover:bg-rose-300'>  ورود </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register