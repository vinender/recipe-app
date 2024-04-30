import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginForm from './login-form';
import { usRegisterMutation, useLoginMutation } from '../../data/auth/use-register.mutation';
import { useRouter } from 'next/router';
 
function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const router = useRouter();
 const {mutate:adduser} = usRegisterMutation();
  const onSubmit = data => {
    console.log(data);
    adduser(data)
  };

  const toggleRegisterForm = () => {
    setShowLoginForm(false);
  };

  return (
    <section className="bg-black dark:bg-gray-900 min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
        </div>
        <form className={`mt-8 space-y-6 ${showLoginForm ? 'hidden' : ''}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-2">
            <div className="rounded-md shadow-sm space-y-2" >
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">Name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                required 
                className="block w-full rounded-md border-0 py-2 text-black px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                placeholder="name" 
                {...register("name", { required: true })} 
              />
            </div>
            <div className="rounded-md shadow-sm space-y-2">
              <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-white">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="block w-full rounded-md border-0 py-2 text-black px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                placeholder="Email address" 
                {...register("email", { required: true })} 
              />
            </div>
            <div className="rounded-md shadow-sm space-y-2">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white  ">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                placeholder="Password" 
                {...register("password", { required: true })} 
              />
            </div>
          
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 transition-all duration-250 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already Registered ?
          <button onClick={()=>router.push('/login')} className="font-semibold leading-6 text-red-600 hover:underline hover:text-red-500 focus:outline-none">
            Login here
          </button>
        </p>
        </div>
    </section>
  );
}

export default RegisterForm;
