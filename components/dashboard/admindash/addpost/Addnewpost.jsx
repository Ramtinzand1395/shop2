import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import Uploadthumbnail from './Uploadthumbnail'
//schema
import { postschema } from '../../../../server/model/secure/Postvalidation'
const Addnewpost = () => {

  const { query } = useRouter()
  const router = useRouter()

  const [thumbnailId, setThumbnailId] = useState("");
  const [cats, setCats] = useState([]);


  const submitForm = async (values) => {
    try {
      const { status } = await axios.post("/api/admin/posts/createpost", { values: values, thumbnailId: thumbnailId, query: query })
      if (status === 200) {
        toast.success(" محصول با موفقیت اضافه شد. ")
        router.push("/")
      }
    } catch (err) {
      console.log(err)
    }
  };

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
      <div className='bg-white m-10 mb-0'>
        <h2 className='text-red-500 text-center font-bold text-lg'> ساخت محصول جدید </h2>
        <Uploadthumbnail setThumbnailId={setThumbnailId} />
      </div>
      <Formik
        initialValues={{
          title: "",
          details: "",
          price: "",
          qty: "",
          status: "",
          category: "",
        }}
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
                className="w-96 h-20 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
              <ErrorMessage
                name="details"
                render={(msg) => (
                  <div className="text-red-500">{msg}</div>
                )}
              />
            </div>
            <button type={'submit'} className="p-2 bg-green-400 rounded-md"> ساخت محصول </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Addnewpost