import React from 'react'
import Link from 'next/link';

//slider
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination , EffectFlip } from "swiper";
import styles from './slider.module.css'

SwiperCore.use([Navigation, Pagination])

const HeaderSlider = () => {
  return (
    <div className='container mt-2 rounded-3xl'>
         <Swiper
        className={styles.slider}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
       effect={{EffectFlip}}
      >
        <SwiperSlide>
          <img className={`${styles.img_slider} rounded-2xl `} src={"/assets/slider/R.jpeg"} />
          <div>
          <span className={styles.text_img_slider}>  مجموعه کفش ها </span>
          <button className={`p-2 bg-green-500 ${styles.text_img_slider_btn}`} > افزودن به سبد خرید  </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className={`${styles.img_slider} rounded-2xl `} src={"/assets/slider/OIP.jpeg"} />
          <div>
          <span className={styles.text_img_slider}>  مجموعه لباس ها </span>
          <button className={`p-2 bg-green-500  ${styles.text_img_slider_btn}`} > افزودن به سبد خرید  </button>
          </div>
        </SwiperSlide>


      </Swiper>
    </div>
  )
}

export default HeaderSlider