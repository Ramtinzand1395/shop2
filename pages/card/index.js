import Head from 'next/head'
import { useEffect } from 'react'

//components
import Cart from '../../components/landingpage/cart'
import Navbar from '../../components/landingpage/Navbar'


export default function Card() {
  return (
    <div >
    <Head>
      <title>فروشگاه || سبد خرید </title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  <header>
<Navbar />
  </header>
  <main>
<Cart />
  </main>
  </div>
  )
}

