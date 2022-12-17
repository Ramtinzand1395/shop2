import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from '../../../store/authcontext';

const Product = ({ getproduct, getsimilarproduct }) => {
    const { authState } = useContext(AuthContext);
    const { query } = useRouter()

    const [data, setData] = useState(getproduct.data)
    const [similar, setSimilar] = useState(getsimilarproduct.data)

    const getsimilar = () => {
        setData(getproduct.data)
        setSimilar(getsimilarproduct.data)

    };
    const submitForm = async (values) => {
        try {
            const { status } = await axios.post("/api/admin/posts/createcomment", { values, userId: authState.user.userId, query })
            if (status === 200) {
                toast.success(" ثبت نظر با موفقیت انجام شد.")
            }
        } catch (err) {
            console.log(err)
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error("برای ثبت نظر وارد شوید")
            }
        }
    }
    return (
        <div className='container'>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 m-2" >
                {/** عکس محصول */}
                <div className="">
                    <img
                        className='w-full h-96 rounded-md '
                        src={`data:${data[0]?.thumbnail.media.contentType};base64,${new Buffer.from(data[0]?.thumbnail.media.data.data).toString("base64")}`}
                        alt="product pic" />
                </div>
                {/** توضیحات محصول */}
                <div className="bg-white text-center">
                    <h2 className='text-lg font-bold'> {data[0].title} </h2>
                    <p className='m-3'>در انبار موجود است {data[0].qty} </p>
                    <p className='m-3'>قیمت : {data[0].price} </p>
                    <p className='m-3'>دسته بندی: {data[0].category} </p>
                    <div className="flex justify-center">
                        <p className='m-3'> تعداد: </p>
                        <input className='block border-2 border-black m-3 p-1' type="number" name="number" id="number" />
                    </div>
                    <button className='bg-green-400 rounded-lg p-1 m-3' > افزودن به سبد خرید </button>
                </div>
            </div>
            {/** محصولات مشابه */}
            <h3 className='font-bold text-white bg-red-400 text-center m-4 p-6'> محصولات مشابه </h3>
            <div >
                <Swiper
                    freeMode={true}
                    slidesPerView={3}
                    spaceBetween={20}
                    navigation
                    pagination={{ clickable: true }}
                    dir="rtl"
                    // pagination={{clickable:true}}
                    className="p-3"
                    breakpoints={{
                        "@0.00": {
                            "slidesPerView": 1,
                            "spaceBetween": 20
                        },
                        "@0.75": {
                            "slidesPerView": 2,
                            "spaceBetween": 20
                        },
                        "@1.00": {
                            "slidesPerView": 2,
                            "spaceBetween": 20
                        },
                        "@1.50": {
                            "slidesPerView": 3,
                            "spaceBetween": 30
                        }
                    }}
                >
                    {similar.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div onClick={getsimilar} className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <Link href={"/product/[productId]"} as={`/product/${item._id}`} >
                                    <img
                                        className='w-full h-96 rounded-md '
                                        src={`data:${item?.thumbnail.media.contentType};base64,${new Buffer.from(item?.thumbnail.media.data.data).toString("base64")}`}
                                        alt="product pic" />
                                </Link>
                                <div className="px-5 pb-5">
                                    <Link href={"/product/[productId]"} as={`/product/${item._id}`} >
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                    </Link>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.price}</span>
                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
                <h3 className='font-bold text-white bg-red-400 text-center m-4 p-6'>  نظرات مشتری </h3>
            {/** کامنت */}
            <div className="bg-white mt-2  ">
            {
                data[0].comments.map((item) => (
                    <div className="bg-green-300 m-5">
                        {item.content}
                    </div>
                        ))
                    }
                    </div>
            {/**فرم کامنت */}
            <Formik
                initialValues={{
                    comment: "",
                }}
                onSubmit={(values) => {
                    submitForm(values);
                }}
            >
                <Form>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <Field
                                name="comment"
                                as={"textarea"}
                                placeholder={"ثبت نظر ..."}
                                className="w-full bg-gray-800 border-2 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                            <ErrorMessage
                                name="comment"
                                render={(msg) => (
                                    <div className="text-red-500">{msg}</div>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                ثبت نظر
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}


export default Product