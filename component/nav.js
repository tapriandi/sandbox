import Router from 'next/router'
import Link from 'next/link'

import { destroyCookie } from 'nookies'


export default function nav() {

  function handleLogout() {
    destroyCookie(null, "_username");
    destroyCookie(null, "_picture");
    destroyCookie(null, "_userID");
    Router.replace("/login");
  }

  return (
    <nav className="fixed top-0 left-0 w-full px-[5%] bg-white flex justify-between h-[60px] items-center border border-b border-gray-100">
      <div className="flex items-center">
        <Link href="/" >
          <img src="https://www.halosis.co.id/assets/images/logo2.png" alt="" 
            className="w-[100px] cursor-pointer md:w-[90px]"
          />
        </Link>
        <Link href="/post">
          <a className="text-sm pt-1 px-2 pl-10 md:text-xs md:pl-5 hover:underline hover:text-gray-400">Post</a>
        </Link>
      </div>
      <button
        onClick={() => handleLogout()}
        className="font-bold text-sm md:text-xs hover:underline"
      >
        Logout
      </button>
  </nav>
  )
}