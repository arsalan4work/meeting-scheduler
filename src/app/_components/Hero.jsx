import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <div className='flex flex-col items-center justify-center my-20'>
        <div className='hidden lg:block'>
            <Image src={"/profile1.png"} width={100} height={100}
            className='h-[100px] object-cover rounded-full absolute right-36'/>
            <Image src={"/profile2.png"} width={100} height={100}
            className='h-[100px] object-cover rounded-full absolute top-48 left-16'/>
            <Image src={"/profile3.png"} width={100} height={100}
            className='h-[100px] object-cover rounded-full absolute bottom-20 left-36'/>
            <Image src={"/profile4.png"} width={100} height={100}
            className='h-[100px] object-cover rounded-full absolute right-16 bottom-32'/>
        </div>
        <div className='text-center max-w-3xl'>
            <h2 className='font-bold text-[60px] text-slate-700'> Easy Scheduling Ahead</h2>
            <h2 className='text-lg mt-5 text-slate-500'>AutoSec is your scheduling automatoin platform for elimination the back <br />
            and-forth emails to find the perfect time - and so much more
            </h2>
            <div className='flex gap-4 flex-col mt-5'>
                <h3 className='text-xl font-semibold'>Sign Up Free with Google and Facebook</h3>
                <div className='flex justify-center gap-8'>
                    <Button>
                        <Image 
                        src="/google.png"
                        alt='Image not Found!'
                        width={20}
                        height={20}
                        />
                        Sign up with Google</Button>
                    <Button>
                    <Image 
                        src="/facebook.png"
                        alt='Image not Found!'
                        width={20}
                        height={20}
                        />
                        Sign up with Facebook</Button>
                </div>
                <hr />
                <h2><Link href="/" className='text-blue-500'>Sign Up Free with Email.</Link> No Credit Card Required!</h2>
            </div>
        </div>
    </div>
  )
}
