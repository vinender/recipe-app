import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/auth/login-form'
import RegisterForm from '../components/auth/register-form'
import Navbar from '../components/navbar/navbar'

export default function Home() {

  return (

    <div className='w-full h-full'>
      <Navbar/>
       {/* <LoginForm/> */}
       <RegisterForm/>
    </div>
  )
}
