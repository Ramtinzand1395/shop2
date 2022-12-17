import React, { useState } from 'react'

const Lastcollections = ({ lastposts }) => {
    const [data, setData] = useState(lastposts.data);
    return (
        <div className='mt-10'>
            {/** بالا */}
            <div className="flex flex-col items-center justify-center">
                <h4 className='font-bold text-2xl border-b-2 border-b-red-400' >    جدیدترین ها </h4>
                <h2 className='mt-5 font-bold'> آخرین محصولات اضافه شده </h2>
            </div>

            {/**  محصولات */}
            {
                data &&
            <div className="mt-4 grid grid-cols-6 gap-4">
                <div className="col-span-3">
                    {
                        data ? data.map((item) => (
                            <div
                                className="flex justify-around items-end p-2 h-full  border rounded-lg shadow-md md:flex-row md:max-w-xl bg-rose-400"
                                key={item[0]._id}>
                                {
                                    console.log(data)
                                }
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item[0]?.title}</h5>
                                    <p className="mb-3 font-normal text-gray-700 ">{item[0]?.details}</p>
                                    <p className="mb-3 font-normal text-gray-700 ">{item[0]?.price}</p>
                                </div>
                                {
                                    data.item ?
                                        <div className="">
                                            <img
                                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                                src={`data:${item[0]?.thumbnail.media.contentType};base64,${new Buffer.from(item[0]?.thumbnail.media.data.data).toString("base64")}`}
                                                alt="product pic" />
                                        </div>
                                        :
                                        ""
                                }
                            </div>
                        ))
                        :
                        ""
                    }
                </div>
                <div className="col-span-3">
                    {
                        data && data.map((item) => (
                            <div
                                className="flex justify-around items-end p-2   border rounded-lg shadow-md md:flex-row md:max-w-xl bg-blue-400"
                                key={item[1]._id}>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item[1].title}</h5>
                                    <p className="mb-3 font-normal text-gray-700 ">{item[1].details}</p>
                                    <p className="mb-3 font-normal text-gray-700 ">{item[1].price}</p>
                                </div>
                                <div className="">
                                    <img
                                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                        src={`data:${item[1]?.thumbnail.media.contentType};base64,${new Buffer.from(item[1]?.thumbnail.media.data.data).toString("base64")}`}
                                        alt="product pic" />
                                </div>
                            </div>
                        ))
                    }
                    {
                        data && data.map((item) => (
                            <div
                                className="flex justify-around items-end p-2  border rounded-lg shadow-md md:flex-row md:max-w-xl bg-green-400"
                                key={item[2]._id}>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item[2].title}</h5>
                                    <p className="mb-3 font-normal text-gray-700 ">{item[2].details}</p>
                                    <p className="mb-3 font-normal text-gray-700 ">{item[2].price}</p>
                                </div>
                                <div className="">
                                    <img
                                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                        src={`data:${item[2]?.thumbnail.media.contentType};base64,${new Buffer.from(item[2]?.thumbnail.media.data.data).toString("base64")}`}
                                        alt="product pic" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            }

        </div>
    )
}

export default Lastcollections