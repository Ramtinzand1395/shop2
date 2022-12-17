import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


//schema
import { postschema } from '../../../../server/model/secure/Postvalidation'
//
import Uploadthumbnail from '../addpost/Uploadthumbnail'
function Updatepost({ setOpenModal, openModal, modalData }) {
    const {query} = useRouter();
    const [cats, setCats] = useState([]);
    const [thumbnailId, setThumbnailId] = useState("");

    const submitForm = async (values) => {
        try {
            const { status } = await axios.put("/api/admin/posts/createpost", { values, query , thumbnailId })
            if (status === 201) {
                toast.success("تغییرات با موفقیت انجام شد.")
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get("/api/admin/posts/createcats");
                if (data) {
                    setCats(data.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetch();
    }, []);
    return (
        <div>
            <div id="authentication-modal" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full">
                <div className="relative w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setOpenModal(!openModal)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 mr-5 text-xl font-medium text-gray-900 dark:text-white"> تغییرات پست  </h3>
                            <Uploadthumbnail setThumbnailId={setThumbnailId} />
                            <Formik
                                initialValues={modalData}
                                validationSchema={postschema}
                                onSubmit={(values) => {
                                    submitForm(values);
                                }}
                            >
                                <Form>
                                    <div className='bg-white m-10 mt-0'>
                                        <div className="m-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 "> عنوان محصول </label>
                                            <Field
                                                name="title"
                                                type={"text"}
                                                className="w-auto border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            />
                                            <ErrorMessage
                                                name="title"
                                                render={(msg) => (
                                                    <div className="text-red-500">{msg}</div>
                                                )}
                                            />
                                        </div>

                                        <div className="m-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 "> قیمت </label>
                                            <Field
                                                name="price"
                                                className="w-auto border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            />
                                            <ErrorMessage
                                                name="price"
                                                render={(msg) => (
                                                    <div className="text-red-500">{msg}</div>
                                                )}
                                            />
                                        </div>

                                        <div className="m-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 "> تعداد </label>
                                            <Field
                                                name="qty"
                                                type={"number"}
                                                className="w-auto border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            />
                                            <ErrorMessage
                                                name="qty"
                                                render={(msg) => (
                                                    <div className="text-red-500">{msg}</div>
                                                )}
                                            />
                                        </div>

                                        <div className="m-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 "> دسته بندی </label>
                                            <Field
                                                name="category"
                                                as="select"
                                                className="w-auto border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            >
                                                <option > انتخاب دسته بندی </option>,
                                                {
                                                    cats.map((item) => (
                                                        <option key={item._id} className='bg-gray-600 p-3 border border-gray-300 text-gray-900 text-sm rounded-lg' value={item.title}> {item.title} </option>
                                                    ))
                                                }
                                            </Field>
                                            <ErrorMessage
                                                name="category"
                                                render={(msg) => (
                                                    <div className="text-red-500">{msg}</div>
                                                )}
                                            />
                                        </div>

                                        <div className="m-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 "> وضعیت </label>
                                            <Field
                                                name="status"
                                                as="select"
                                                className="w-auto border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            >
                                                <option > انتخاب  وضعیت </option>,
                                                <option className='bg-gray-600 p-3 border border-gray-300 text-gray-900 text-sm rounded-lg' value={"عمومی"}> عمومی  </option>
                                                <option className='bg-gray-600 p-3 border border-gray-300 text-gray-900 text-sm rounded-lg' value={"خصوصی"}> خصوصی  </option>

                                            </Field>
                                            <ErrorMessage
                                                name="status"
                                                render={(msg) => (
                                                    <div className="text-red-500">{msg}</div>
                                                )}
                                            />
                                        </div>

                                        <div className="m-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 "> توضیحات </label>
                                            <Field
                                                name="details"
                                                as="textarea"
                                                className="w-40 h-20 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            />
                                            <ErrorMessage
                                                name="details"
                                                render={(msg) => (
                                                    <div className="text-red-500">{msg}</div>
                                                )}
                                            />
                                        </div>
                                        <div className="flex item-center justify-between m-2 ">
                                        <button type={'submit'} className="p-2 bg-green-400 rounded-md">  اعمال تغییرات </button>
                                        <button type={'submit'} className="p-2 bg-red-400 rounded-md">   حذف پست </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Updatepost
