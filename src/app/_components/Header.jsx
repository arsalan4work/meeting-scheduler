import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const tags = [
  {
    name: "Product",
    path: "/product",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
  {
    name: "About us",
    path: "/about-us",
  },
]

export default function Header() {
  return (
    <div className="flex items-center justify-between border p-2">
      {/* Logo */}
      <div>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={50}
          height={50}
          className="w-[30px] md:w-[50px]"
        />
      </div>

      {/* Tags */}
      <div className='hidden gap-14 md:flex'>
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={tag.path}
            className="mx-2 text-gray-700 text-lg font-semibold hover:text-blue-500 transition-all duration-200 cursor-pointer"
          >
            {tag.name}
          </Link>
        ))}
      </div>
      {/* Button */}
      <div className='gap-5 flex'>
        <Button variant="ghost" className="transition-all duration-200">Login</Button>
        <Button className="bg-blue-500 hover:text-white hover:bg-black transition-all duration-200 cursor-pointer">Get Started</Button>
      </div>
    </div>
  )
}
