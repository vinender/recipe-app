import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/auth/login-form'
import RegisterForm from '../components/auth/register-form'
import Navbar from '../components/navbar/navbar'
import SearchBar from '../components/search-bar'

export default function Home() {

  return (

    <div className='bg-black w-full h-screen pt-[80%]  sm:pt-[60%] md:pt-[30%]  flex-grow justify-center items-center'>
 
       <SearchBar/>
    </div>
  )
}
