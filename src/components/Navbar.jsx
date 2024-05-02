'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import dotsquares from "../assets/dotsquares.webp"

const menuItems = [
  {
    name: 'DS COIN',
    href: '#',
  },
  {
    name: 'Audit',
    href: '#',
  },
  {
    name: 'Whitepaper',
    href: '#',
  },
]

export function ExampleNavbarTwo() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
            <img src={dotsquares} alt="DOTSQUARES" className="h-13 w-20" />
          <span className="font-bold">DOTSQUARES</span>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        
      </div>
    </div>
  )
}

export default ExampleNavbarTwo