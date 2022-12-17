import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';


function Uploadthumbnail({setThumbnailId}) {
    const [profilePhoto , settumbnail] = useState({})
    const [uploadPrecentage, setUploadPrecentage] = useState(0);

    const submitForm = async () => {
        const formdata = new FormData()
        formdata.append("media", profilePhoto);
        try {
            axios({
                url: "/upload",
                method: "post",
                data: formdata,
                onUploadProgress:progressEvent => {
                    setUploadPrecentage(
                         parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                    )
                    setTimeout(()=> setUploadPrecentage(0), 10000)
               }
              })
                .then((res) => {
                    setThumbnailId(res.data[0]._id)
                  toast.success("فایل مورد نظر با موفقیت بارگذاری شد!");
                })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='bg-white text-black'>
            <Formik
                onSubmit={() => submitForm()}
                initialValues={{profilePhoto:""}}
                >
                <Form>
                    <label className="block mb-2  w-1/6 font-medium p-2 "> عکس بند انگشتی </label>
                    <div className="flex item-center">
                    <Field
                        name="profilePhoto"
                        onChange={(e)=>settumbnail(e.target.files[0])}
                        type={"file"}
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-1  m-2"
                    />
                    <ErrorMessage
                        name="profilePhoto"
                        render={(msg) => (
                            <div className="text-danger">{msg}</div>
                        )}
                    />
                <button className='p-1 border-2 hover:bg-green-400 rounded-md' type={'submit'}> ارسال عکس </button>
                    </div>
                    <div className="w-6/12 bg-gray-200 rounded-full  mt-3">
               <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" role="progressbar" style={{ width: `${uploadPrecentage}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{uploadPrecentage}%</div>
           </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Uploadthumbnail