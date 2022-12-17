import React from 'react'

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaFax,
    FaEnvelope,
    FaGlobe,
  } from "react-icons/fa";
const Footer = () => {
  return (
<div className="grid sm:grid-cols-1 md:grid-cols-4 mt-6"  style={{backgroundColor:"#B6E5D8"}}>
          <div className="flex flex-col items-center justify-center list text-white">
          <h4>لینک های مفید</h4>

          <ul>
              <li>
              <a href="/"> پشتیبانی</a>

              </li>
              <li>
              <a href="/"> درباره ما</a>

              </li>
              <li>
              <a href="/"> آموزش</a>

              </li>
              <li>
              <a href="/"> هاستینگ</a>

              </li>
              <li>
              <a href="/"> پیام رسان</a>

              </li>

            </ul>
          </div>
          <div className="flex flex-col items-center justify-center list text-white">
          <h4>پشتیبانی</h4>

            <ul>
              <li>
                <a href="/"> پشتیبانی</a>
              </li>
              <li>
              <a href="/"> درباره ما</a>

              </li>
              <li>
              <a href="/"> آموزش</a>

              </li>
              <li>
              <a href="/"> هاستینگ</a>

              </li>
              <li>
              <a href="/"> پیام رسان</a>

              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center list text-white">
          <h4>راه های ارتباطی</h4>

          <ul>
              <li>
              <p className='flex items-center'><FaMapMarkerAlt /> &nbsp; آدرس : شیراز سمت راست</p>

              </li>
              <li>
              <p className='flex items-center'><FaPhoneAlt /> &nbsp; تلفن : 0989111111111 </p>

              </li>
              <li>
              <p className='flex items-center'> <FaFax /> &nbsp; فکس : 0989111111111</p>

              </li>
              <li>
              <p className='flex items-center'> <FaEnvelope /> &nbsp; ایمیل : Example@gmail.com</p>

              </li>
              <li>
              <p className='flex items-center'><FaGlobe /> &nbsp; وبسایت : www.example.com </p>

              </li>

            </ul>
           
          </div>

          <div className="flex flex-col items-center justify-center list text-white">
          <p>&copy; Copyright 2021. TopLearn.com</p>
          </div>
        </div>
  )
}

export default Footer