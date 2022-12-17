import Link from 'next/link'
import React, { useContext, useState } from 'react'
//logo
import logo from '../../../public/assets/logo.png'
//icons
import { FiUser, FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
//style
import styles from "./navbar.module.css"
//context
import { AuthContext } from '../../../store/authcontext'
import { cardcontext } from '../../../store/cardcontext'

const Navbar = () => {
  const [hahandelSearch, setHandelsearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const [openusers, setOpenusers] = useState(false)

  {/** کانتکتس */ }
  const { authState, isAuthenticated, logout } = useContext(AuthContext);
  const value = useContext(cardcontext);
    const [cart] = value.cart
  return (
    <>
      <div className="flex justify-around items-center p-2 bg-white ">

        {/**  منو موبایل */}
        <div className=" items-center justify-around sm:flex md:hidden " onClick={() => setOpenMenu(!openMenu)}>
          {
            openMenu
              ?
              <FiMenu color='black' size={"25px"} cursor={"pointer"} />
              :
              <FiX color='black' size={"25px"} cursor={"pointer"} />
          }
        </div>

        {/** لگو */}
        <div className="">
          <img src={logo.src} alt="logo" />
        </div>

        {/** منو */}
        <div
          className={`${styles.menu}
           ${openMenu ? `${styles.menu} ` : `${styles.active_menu} ${styles.menu} `}}`}
        >
          <ul className='flex items-center'>
            <Link href={"/"}>
              <li className='
             p-2 mx-4
              cursor-pointer
             hover:text-red-400 hover:border-b-2 hover:border-b-red-400 transition-all '
              > خانه </li>
            </Link>
            <li onClick={(() => setOpenSubMenu(!openSubMenu))}
              className={`
             p-2 mx-4
              cursor-pointer
             hover:border-b-2 hover:border-b-red-400 transition-all
             ${styles.subli}`}
            > محصولات
              <div
                className={`bg-white ${styles.submenu} ${openSubMenu ? `${styles.submenu} ` : `${styles.active_submenu} ${styles.submenu} `}`}  >
                <ul>
                  <li className="leading-10 border-b-2">
                    <a to={"/"} className="inline-block p-1 transition-colors ease-in hover:text-red-400"> ساب منو </a>
                  </li>
                  <li className="leading-10 border-b-2">
                    <a to={"/"} className="inline-block p-1 transition-colors ease-in hover:text-red-400"> ساب منو </a>
                  </li>
                  <li className="leading-10 border-b-2">
                    <a to={"/"} className="inline-block p-1  hover:text-red-400"> ساب منو </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className='
             p-2 mx-4
              cursor-pointer
             hover:text-red-400 hover:border-b-2 hover:border-b-red-400 transition-all '
            > درباره ما </li>

            <li className='
             p-2 mx-4
              cursor-pointer
             hover:text-red-400 hover:border-b-2 hover:border-b-red-400 transition-all '
            > تماس با ما </li>

          </ul>
        </div>

        {/** ایکون */}
        <div className={`
        ${styles.icons} 
        flex items-center justify-around 
         ${openMenu ? `${styles.icons} ` : `${styles.active_icons} ${styles.icons} `}`}>
          {
            isAuthenticated() ?
              <div className="">
                <div className="flex items-center">
                  <p> {authState.user?.name}</p>
                  {
                    authState.user?.profilePhoto ?
                    <img
                      src={`data:${authState.user?.profilePhoto.media.contentType};base64,${new Buffer.from(authState.user?.profilePhoto.media.data.data).toString("base64")}`}
                      onClick={() => setOpenusers(!openusers)}
                      className="relative w-10 h-10 rounded-full border border-gray-500 p-1 mx-2"
                      alt="profile" />
                      :
                      <img
                      src={`https://secure.gravatar.com/avatar/${authState.user?._id}?s=90&d=identicon`}
                      onClick={() => setOpenusers(!openusers)}
                      className="relative w-10 h-10 rounded-full border border-gray-500 p-1 mx-2"
                      alt="profile" />
                  }
                </div>
                <div className={`bg-white border-2 rounded-md w-52 top-14 absolute z-10 ${openusers ? "block" : " hidden"}`}>
                  <Link href={"/dashboard/[userId]"} as={`/dashboard/${authState.user?.userId}`} className="text-black border-b-2 p-2 cursor-pointer">پروفایل</Link>
                  <p className="text-red-500 hover:bg-red-400 p-2 hover:text-white cursor-pointer" onClick={logout}> خروج </p>
                </div>
              </div>
              :

              <div className="mx-2 p-2 cursor-pointer">
                <Link href={"/auth/login"}>
                  <FiUser color='black' size={"25px"} />
                </Link>
              </div>
          }
          <div className="mx-2 p-2 relative cursor-pointer">
            <FiSearch color='black' size={"25px"} onClick={() => setHandelsearch(!hahandelSearch)} />
            {hahandelSearch ? <input type="text" className="absolute top-10 z-10 p-2" placeholder='جستجو ...' /> : ""}
          </div>
          <div className="mx-2 p-2 cursor-pointer">
            {
              cart.length ?
               <p className='text-white text-center w-7 h-7 p-1 bg-red-400 rounded-full relative -top-0 -right-5'>{cart.length}</p>
               :
               ""
            }
            <Link href={"/card"}>
              <FiShoppingBag color='black' size={"25px"} />
            </Link>
          </div>

        </div>

        {/** دارک مود */}
        <div className="flex items-center justify-around">
          <button className='p-2 bg-red-500' > دارک مود </button>
        </div>


      </div>
    </>
  )
}

export default Navbar