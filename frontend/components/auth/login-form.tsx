import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../data/auth/use-login.mutation';
import { Router, useRouter } from 'next/router';

function LoginForm({ toggleRegisterForm }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
 

  const {mutate:login} = useLoginMutation();
  const onSubmit = data => {
    console.log(data);
    login(data)
  };
  

  return (
    <div className="flex h-screen w-full flex-col bg-black text-black justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
      </div>
      
      <div className="mt-10 sm:mx-auto text-white sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className=''>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
            <div className="mt-2">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => 
                <input {...field} type="email" autoComplete="email" 
                className="block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />}
              />
            </div>
          </div>

          <div className=''>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-red-500 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => <input {...field} type="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member ?
          <button onClick={()=>router.push('/register')} className="font-semibold leading-6 text-red-600 hover:underline hover:text-red-500 focus:outline-none">
            Register here
          </button>
        </p>

      </div>
    </div>
  );
}

export default LoginForm;
