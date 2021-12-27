import CryptoJS from "crypto-js"
import Router from 'next/router'
import Link from "next/link"
import axios from 'axios'

import { useState } from "react"
import { setCookie } from 'nookies'
import { useForm } from "react-hook-form"

export default function Register() {
  const [ passValue, setPassValue ] = useState({ showPass: false })
  const [ registerMessage, setRegisterMessage ] = useState()
  const { register, handleSubmit, formState: {errors} } = useForm()

  const showHidePassword = () => {
    setPassValue({ ...passValue, showPass: !passValue.showPass})
  }
  async function onLogin (registerForm) {
    console.log(registerForm)

    try {
      const {data} = await 
        axios.post('https://dummyapi.io/data/v1/user/create', 
        registerForm,
        {headers: {'app-id': '61c01b4eaec39b388ea1b47b'}}
      )

      console.log(data.firstName)

      setCookie(null, '_username', `${data.firstName}`, {
        maxAge: 3 * 24 * 60 * 60,
        path: '/',
      })
      setCookie(null, '_userID', CryptoJS.AES.encrypt(data.id, 'halosis').toString(), {
        maxAge: 3 * 24 * 60 * 60,
        path: '/',
      })
      
      Router.push('/')
    }
    catch(err) {
      const _errEmail = err.response?.data.data.email
      setRegisterMessage(_errEmail ? _errEmail : 'Register Fail')
    }
  }

  return (
    <div className="w-full h-screen flex ">
      <div className="w-[30%] bg-red-200 h-screen overflow-hidden lg:hidden">
        <img 
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.katadata.co.id%2Fmedia%2Fimages%2Fthumb%2F2019%2F07%2F30%2F2019_07_30-13_17_45_89836d9c6e6b69ccab1c05ef7610f97b_620x413_thumb.jpeg&f=1&nofb=1" 
          alt="Halosis family"
          className="w-full h-full object-cover object-center" 
        />
      </div>

      <div className="w-[70%] flex justify-center items-center bg-purple-50 lg:w-full lg:px-5">
        <form 
          onSubmit={handleSubmit(onLogin)}
          className="flex flex-col w-[340px] p-10 rounded-md bg-white border border-red-50 shadow-lg shadow-red-100/50"
          className="flex flex-col w-[320px] p-10 rounded-md bg-white border border-red-50 shadow-lg shadow-red-100/50"
        >
          <img src="https://www.halosis.co.id/assets/images/logo2.png" alt="" 
            className="w-[80%] mb-8 mx-auto"
          />

          <label>
            <span className="text-xs">Fisrt Name</span>
            <input 
              type="text" 
              className="w-full p-2 text-sm border border-gray-200 rounded focus:border-[#DA6894]"
              {...register('firstName', { required: true })}
            />
            <div className="mb-3 text-red-500 text-[10px]">{errors.firstName && 'Fisrt Name is required'}</div>
          </label>

          <label>
            <span className="text-xs">Last Name</span>
            <input 
              type="text" 
              className="w-full p-2 text-sm border border-gray-200 rounded focus:border-[#DA6894]"
              {...register('lastName', { required: true })}
            />
            <div className="mb-3 text-red-500 text-[10px]">{errors.lastName && 'Last Name is required'}</div>
          </label>

          <label>
            <span className="text-xs">Email</span>
            <input 
              type="email" 
              className="w-full p-2 text-sm border border-gray-200 rounded focus:border-[#DA6894]"
              {...register('email', { required: true })}
            />
            <div className="mb-3 text-red-500 text-[10px]">{errors.email && 'email is required'}</div>
          </label>

          <label className='relative'>
            <span className="text-xs">Password</span>
            <input 
              type={passValue.showPass? 'text' : 'password'}
              className="w-full p-2 text-sm border border-gray-200 rounded focus:border-[#DA6894]"
              {...register('password', { required: true })}
            />
            <div className="mb-3 text-red-500 text-[10px]">{errors.password && 'password is required'}</div>

            <span
              onClick={showHidePassword}
              className="absolute right-[15px] top-1/2 text-[10px] underline font-bold text-gray-400 cursor-pointer hover:text-gray-700 sm:text-[9px]"
              aria-hidden="true"
            >
              {passValue.showPass ? 'show' : 'hide'}
            </span>
          </label>


          {registerMessage &&
            <p className="text-[10px] text-red-500">{registerMessage}</p>
          }
          
          <button type="submit"
            className="w-full mt-5 mb-3 text-white p-2 rounded-sm text-center bg-green-500 hover:bg-green-300"
          >Register</button>

          <div className="text-xs mt-2 flex justify-center">
            I have account! &nbsp;
            <Link href="/login" ><span className="underline cursor-pointer hover:font-bold">login</span></Link>
          </div>
        </form>
      </div>
    </div>
  )
}