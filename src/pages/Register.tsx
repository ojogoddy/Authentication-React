import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const ValidationSchema = yup.object().shape({
    fullName: yup.string().required("fullName is required"),
    email: yup.string().required("email is required"),
    password: yup.string().required().max(15).min(6).trim() ,
    confirmPassword: yup.string().oneOf([yup.ref("password")]),
    profileImage: yup.mixed().required("Image is required")
})


const Register:React.FC = () => {
    type FormData = yup.InferType<typeof ValidationSchema>

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    }=useForm<FormData>({
        resolver : yupResolver(ValidationSchema)  // this will validate the input with schema we created above
    })

    const createUser = handleSubmit(async (data: FormData) =>{
        console.log(data);
        reset()
    })

  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  )
  const OnImagePreview = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files![0];
    const url = URL.createObjectURL(file)
    
    setPreviewImageUrl(url)
  }
  return (
    <div className='bg-gray-500 text-white p-7'>
        <h1 className='mb-5'>Create an Account</h1>
        <form onSubmit={createUser}>
            <img
            src={previewImageUrl}
            className='h-[70px] w-[70px] rounded-[50%] bg-slate-300 mb-5' />
            <div className=' flex-col hidden'>
                <span>profile image</span>
                <input 
                
                {...register("profileImage")}
                id='pix'
                type="file"
                className='h-[40px] p-3 w-[350px] mb-5'  
                onChange={OnImagePreview}/>
            </div>
            <label htmlFor="pix" className='p-[10px] rounded-md bg-blue-600'> Upload image</label>
            <p className='text-red-500'>{errors?.profileImage?.message}</p>
            <div className='flex flex-col'>
                <br />
                <span>FullName</span>
                <input
                {...register("fullName")} 
                className='h-[40px] p-3 w-[380px] mb-5'
                placeholder='enter your fullname'  />
                <p className='text-red-500'>{errors?.fullName?.message}</p>
            </div>
            <div className='flex flex-col'>
                <span>Email</span>
                <input 
                {...register("email")} 
                className='h-[40px] p-3 w-[380px] mb-5'
                placeholder='enter your email'  />
                <p className='text-red-500'>{errors?.email?.message}</p>
            </div>
            <div className='flex flex-col'>
                <span>password</span>
                <input 
                {...register("password")} 
                className='h-[40px] p-3 w-[380px] mb-5'
                placeholder='enter your email'  />
                <p className='text-red-500'>{errors?.password?.message}</p>
            </div>
            <div className='flex flex-col'>
                <span>Confirm password</span>
                <input 
                {...register("confirmPassword")} 
                className='h-[40px] p-3 w-[380px] mb-5'
                placeholder='enter your email'  />
                <p className='text-red-500'>{errors?.confirmPassword?.message}</p>
            </div>
            <p className='mb-5'>
                Already have an account? <span>Login</span>
            </p>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Register