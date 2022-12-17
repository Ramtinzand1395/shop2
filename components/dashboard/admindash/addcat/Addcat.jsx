import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toast } from 'react-toastify'
const Addcat = () => {
    const [cats, setCats] = useState([]);
    const submitForm = async (values) => {
        try {
            const { status } = await axios.post("/api/admin/posts/createcats",values)
            if (status === 200) {
                toast.success(" دسته بندی با موفقیت اضافه شد. ")
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        const fetch = async()=>{
            try {
                const { data } = await axios.get("/api/admin/posts/createcats");
                if(data){
                    setCats(data.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetch();
    },[])

    return (
        <div>
            <table className="m-6 text-sm text-white dark:text-gray-400 text-right  ">
                <thead className="text-xs w-full text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="py-3 px-6 ">
                            دسته ها
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cats.map((item , index) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className=" py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="py-4 px-6 text-white ">
                                    {item.title}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Formik
                initialValues={{
                    title:"",
                }}
                onSubmit={(values) => {
                    submitForm(values);
                }}
            >
                <Form>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  افزودن دسته جدید </label>
                        <Field
                            name="title"
                            type={"text"}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-600 "
                        />
                        <ErrorMessage
                            name="title"
                            render={(msg) => (
                                <div className="text-danger">{msg}</div>
                            )}
                        />
                    </div>
                    <button type={'submit'} className="p-2 bg-green-400 rounded-md"> ثبت دسته بندی جدید </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Addcat