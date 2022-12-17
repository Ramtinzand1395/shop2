import React, { useContext } from 'react'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from "formik";

//style
import styles from './login.module.css'

//icons
import { FaInstagram, FaTwitter, FaGooglePlus } from 'react-icons/fa'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

//context
import { AuthContext } from '../../../store/authcontext';

const Login = () => {
    const router = useRouter()
    const {authState,isAuthenticated , setAuthNewState} = useContext(AuthContext)

    return (
        <div className={`${styles.center}  `}>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 bg-white container h-auto w-full rounded-3xl">

                {/** سمت راست */}
                <div className="col-span-1 bg-green-400 flex flex-col items-center justify-center sm:rounded-t-lg md:rounded-r-3xl">
                    <h3 className='mt-6 font-bold text-lg text-white border-b-2 border-b-white'> به فروشگاه خوش آمدید </h3>
                    <p className=' mt-6 '> اگر ثبت نام نکردید به لینک زیر مراجعه کنید </p>
                    <Link href={"/auth/register"}>
                        <button className=' mt-6 rounded-full text-white border-white border-2 p-2 hover:bg-rose-300'> ثبت نام </button>
                    </Link>
                </div>

                {/** سمت چپ */}
                <div className="sm:col-span-1 md:col-span-2 h-auto">
                    <div className="flex items-center justify-center">
                        <h3 className='text-center mt-6 font-bold text-lg text-green-400 border-b-2 border-b-green-500'> ورود کاربران </h3>
                    </div>
                    {/** ایکون ها */}
                    <div className="flex items-center justify-around mt-4">
                        <div className="rounded-full border-2 text-red-500 hover:text-red-800 p-1">
                            <FaInstagram size={"30px"} />
                        </div>
                        <div className="rounded-full text-blue-400 border-2 hover:text-blue-800 p-1">
                            <FaTwitter size={"30px"} />
                        </div>
                        <div className="rounded-full border-2 text-red-500 hover:text-red-800 p-1">
                            < FaGooglePlus size={"30px"} />
                        </div>
                    </div>

                    {/** فرم ثبت نام */}
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={async(values) => {
                            try {
                                const {status } = await axios.post("/api/auth/login" , values);
                                const {data} = await axios.get("/api/auth/authenticate")
                                if(status === 200){
                                    setAuthNewState({token:data.token})
                                    window.localStorage.setItem("decode" , JSON.stringify(data.decodedToken))
                                    router.push('/')
                                    toast.success(" ورود موفقیت آمیز بود. ");
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
                        <Form className=' flex flex-col items-center justify-center'>
                            <div className="m-4">
                                <label className='text-black text-lg' > ایمیل  : </label>
                                <Field
                                    name="email"
                                    type="text"
                                    className={`rounded-md border-2 border-green-400 p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                                    placeholder="نام خود را وارد کنید "
                                />
                                <ErrorMessage
                                    name="email"
                                    render={(msg) => (
                                        <div className="text-danger">{msg}</div>
                                    )}
                                />
                            </div>

                            <div className="m-4">
                                <label className='text-black text-lg' > پسورد  : </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={`rounded-md p-2 border-2 border-green-400 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600`}
                                    placeholder="نام خود را وارد کنید "
                                />
                                <ErrorMessage
                                    name="password"
                                    render={(msg) => (
                                        <div className="text-danger">{msg}</div>
                                    )}
                                />
                            </div>
                            <div className="flex items-center justify-around">
                                <div className="m-4">
                                    <label className='text-black text-lg' > مرا به خاطر بسپار  </label>
                                    <input
                                        name="remember"
                                        type={"checkbox"}
                                    />
                                </div>
                                <Link href={"/"} className="text-blue-400"> پسورد خود را فراموش کردید؟ </Link>
                            </div>
                            <div className="m-2">
                                <button type={'submit'} className=' w-20 bg-blue-500 p-2 rounded-lg text-white'> ورود  </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login