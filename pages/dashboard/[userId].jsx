import React, { useContext } from 'react'
import Head from 'next/head'

import Userdash from '../../components/dashboard/userdash'
import Navbar from '../../components/landingpage/Navbar'
//context
import { AuthContext } from '../../store/authcontext'


function Userpage({userId }) {
    const {authState}= useContext(AuthContext)
    if(authState.user&& authState.user?.userId === userId){
        return (
          <div >
          <Head>
            <title>فروشگاه || پنل کاربری  </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
        <header>
      <Navbar />
        </header>
        <main>
      <Userdash />
        </main>
        </div>
     )
    }else{
        return(
            <p>شما اجازه دسترسی ندارید . </p>
        )
    }
  }

export const getServerSideProps = (context)=>{
    const {userId} = context.params
    return{
        props:{
            userId,
        }
    }
}

export default Userpage