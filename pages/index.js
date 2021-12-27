import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Nav from '../component/nav'

import { parseCookies } from 'nookies'
import { useState, useEffect } from 'react'


export default function Home() {
  const [ userData, setUserData ] = useState()

  function parseUserData() {
    const cookies = parseCookies()
    setUserData(cookies)
  }


  useEffect(() => {
    parseUserData()
  }, [])
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard | Halosis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav />

        {userData &&
          <div>
            <img 
              src={userData._picture ? userData._picture : 'http://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png'} 
              alt="profile" 
              className="rounded-full w-[200px] h-[200px] shadow-lg shadow-red-200/50"
            />
            <h2 
              className="text-xl text-center mt-5"
            >Hello, {userData._username}</h2>
          </div>
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
