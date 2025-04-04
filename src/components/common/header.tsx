'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { dropdownItems } from '@/data/header/drop-down'
import { menuItems } from '@/data/header/menu-items'

import FreeShip from '../svgs/free-ship'
import NavArrow from '../svgs/nav-arrow'

export default function Header() {
  const [isOpenAbout, setIsOpenAbout] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(menuItems.map(() => false))

  const handleOpenSubMenu = (index: number) => {
    setIsSubMenuOpen((prev) =>
      prev.map((item, i) => (i === index ? !item : false)),
    )
  }

  useEffect(() => {
    console.log('Is sub menu open:', isSubMenuOpen)
  }, [isSubMenuOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenAbout(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleMouseLeave(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsSubMenuOpen(menuItems.map(() => false))
      }
    }
    document.addEventListener('mousemove', handleMouseLeave)
    return () => document.removeEventListener('mousemove', handleMouseLeave)
  }, [])

  return (
    <header className="sticky top-0 z-9 w-full" ref={headerRef}>
      <div className="relative z-3 max-h-8 md:max-h-16">
        <div className="relative z-3 flex h-8 w-full items-center justify-between bg-[#f4efe9] pr-0 pl-8 transition-all duration-250 md:h-10 md:text-xs">
          <div className="flex items-center">
            <FreeShip className="mr-2.5 h-5 w-6" />
            <p className="text-[.725rem]">
              Furniture designed for modern life at home
            </p>
          </div>
          <div className="flex h-[inherit] items-center justify-end">
            <Link
              href="/order-lookup"
              className="link mx-4 my-auto flex h-[inherit] items-center"
            >
              Order Lookup
            </Link>
            <Link
              href="/free-swatches"
              className="link mx-4 my-auto flex h-[inherit] items-center"
            >
              Free Swatches
            </Link>
            <Link
              href="/showrooms"
              className="link mx-4 my-auto flex h-[inherit] items-center"
            >
              Showrooms
            </Link>
            <Link
              href="/refer-a-friend"
              className="link mx-4 my-auto flex h-[inherit] items-center"
            >
              Refer a Friend
            </Link>
            <div
              className="relative mx-4 my-auto flex h-[inherit] items-center"
              ref={dropdownRef}
            >
              <button
                className="relative flex items-center pr-4"
                onClick={() => setIsOpenAbout(!isOpenAbout)}
              >
                About
                <NavArrow
                  className={`absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 transition-transform duration-200 ${isOpenAbout ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`absolute top-full -right-1/3 z-2 w-48 overflow-hidden bg-white transition-all duration-400 ${
                  isOpenAbout
                    ? 'max-h-150 opacity-100'
                    : 'pointer-events-none max-h-0 opacity-0'
                }`}
              >
                {dropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="link relative mx-4 my-auto flex items-center p-5 px-0 whitespace-nowrap"
                  >
                    <div className="w-20">
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={60}
                        height={60}
                      />
                    </div>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative block w-full">
        <div className="font-primary z-11 flex h-15 justify-between bg-white px-8 py-1 text-[#383633] md:z-5 md:h-16">
          <Link href="/" className="flex items-center">
            <i className="icon icon-logo text-[1.15rem]"></i>
          </Link>
          <div className="flex">
            {menuItems.map((item, index) =>
              item.subMenu ? (
                <div key={index} className="flex items-center">
                  <button
                    className={`link relative mx-4 my-auto flex h-[inherit] items-center pr-4 text-sm`}
                    onClick={() => handleOpenSubMenu(index)}
                  >
                    <span
                      className={` ${isSubMenuOpen[index] ? 'text-[#8b2735]' : ''}`}
                    >
                      {item.label}
                    </span>
                    <NavArrow
                      className={`absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 transition-transform duration-200 ${isSubMenuOpen[index] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`absolute top-full right-0 left-0 w-full overflow-hidden bg-white transition-all duration-400 ${
                      isSubMenuOpen[index]
                        ? 'max-h-150 opacity-100'
                        : 'pointer-events-none max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-7 flex justify-between pt-8 pb-5.5">
                      <div className="flex gap-5">
                        {[0, item.subMenu.length < 8 ? 4 : 5].map(
                          (start, index) => (
                            <div className="flex min-w-60 flex-col" key={index}>
                              {item.subMenu
                                .slice(
                                  start,
                                  start + (item.subMenu.length < 8 ? 4 : 5),
                                )
                                .map((subItem, subIndex) => (
                                  <Link
                                    href={subItem.href}
                                    key={subIndex}
                                    className="link flex items-center text-sm leading-8 whitespace-nowrap"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                            </div>
                          ),
                        )}
                      </div>
                      <div className="flex items-center gap-3.5 px-6">
                        {item.images.map((image, imgIndex) => (
                          <Link
                            href={image.href}
                            key={imgIndex}
                            className="flex flex-col items-center justify-center text-sm leading-8 whitespace-nowrap"
                          >
                            <Image
                              src={image.image}
                              alt={image.label}
                              width={200}
                              height={140}
                              className="mb-2"
                            />
                            <span className="link w-full text-left hover:underline">
                              {image.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="link mx-4 my-auto flex h-[inherit] items-center text-sm"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-5">
            <button className="link flex cursor-pointer items-center gap-2 hover:text-[#8b2735]">
              <i className="icon icon-search"></i>
              <span className="font-secondary text-base">Search</span>
            </button>
            <Link
              href="/login"
              className="flex items-center hover:text-[#8b2735]"
            >
              <i className="icon icon-user"></i>
            </Link>
            <button className="flex cursor-pointer items-center hover:text-[#8b2735]">
              <i className="icon icon-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
