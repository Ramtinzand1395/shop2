import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'

function Updateuser({ setOpenModal, openModal, modalData }) {

    const submitForm = async (values) => {
        try {
            const { status , data } = await axios.put("/api/admin/updateuser", { values, userId: modalData._id })
            if (status === 201) {
                toast.success("تغییرات با موفقیت انجام شد.")
            }
        } catch (err) {
            console.log(err)
        }
    }
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
                            <h3 className="mb-4 mr-5 text-xl font-medium text-gray-900 dark:text-white"> تغییرات کاربر  </h3>
                            <Formik
                                initialValues={modalData}
                                onSubmit={(values) => {
                                    submitForm(values);
                                }}
                            >
                                <Form>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> ایمیل کاربر </label>
                                        <Field
                                            name="email"
                                            type={"text"}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 "
                                        />
                                        <ErrorMessage
                                            name="email"
                                            render={(msg) => (
                                                <div className="text-danger">{msg}</div>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> نام کاربری  </label>
                                        <Field
                                            type={"text"}
                                            name="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 "
                                        />
                                        <ErrorMessage
                                            name="name"
                                            render={(msg) => (
                                                <div className="text-danger">{msg}</div>
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> نام  خانوادگی </label>
                                        <Field
                                            type={"text"}
                                            name="lastname"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 "
                                        />
                                        <ErrorMessage
                                            name="lastname"
                                            render={(msg) => (
                                                <div className="text-danger">{msg}</div>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> نقش </label>
                                        <Field
                                            name="role"
                                            as="select"
                                            className='bg-gray-600 p-3 border border-gray-300 text-gray-900 text-sm rounded-lg'
                                        >
                                            <option className='bg-gray-600 p-3 border border-gray-300 text-gray-900 text-sm rounded-lg' value={"admin"}> admin </option>
                                            <option className='bg-gray-600 p-3 border border-gray-300 text-gray-900 text-sm rounded-lg' value={"user"}> user </option>
                                        </Field>

                                        <ErrorMessage
                                            name="group"
                                            render={(msg) => (
                                                <div className="text-danger">{msg}</div>
                                            )}
                                        />
                                    </div>
                                    <button type={'submit'} className="p-2 bg-green-400 rounded-md"> ثبت تغییرات </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Updateuser
