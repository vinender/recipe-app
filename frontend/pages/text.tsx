import React from 'react'
import ProtectedRoute from '../utils/protectedRoutes'
import Navbar from '../components/navbar/navbar'

export default function text() {
  return (
<> 
     {/* <ProtectedRoute>  */}
        <Navbar/>
    <div className='bg-black w-full h-screen'>text</div>
     {/* </ProtectedRoute> */}
    </>
  )
}
