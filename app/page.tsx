'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  })

  const featureCards = [
    {
      id: 1,
      image: "/hero-1.png",
      alt: "Intelligent expense sorting",
      title: "Intelligent expense sorting"
    },
    {
      id: 2,
      image: "/hero-2.png",
      alt: "Live balance monitoring", 
      title: "Live balance monitoring"
    },
    {
      id: 3,
      image: "/hero-3.png",
      alt: "All accounts in one view",
      title: "All accounts in one view"
    },
    {
      id: 4,
      image: "/hero-4.png",
      alt: "Secure data & privacy protection",
      title: "Secure data & privacy protection"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100/60">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="CashFlow"
                  width={176}
                  height={44}
                  className="w-32 mr-5"
                />
              </Link>
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="#" className="text-gray-500 hover:text-gray-900 transition font-medium">
                  Features
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900 transition font-medium">
                  Dashboard
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900 transition font-medium">
                  Resources
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900 transition font-medium">
                  Help
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900 transition font-medium">
                  Pricing
                </Link>
              </nav>
            </div>

            {/* CTA Button */}
            <div className="hover:bg-gray-50 transition border-2 border-gray-200 w-min p-1 rounded-full">
              <Link href="/register">
                <Button className="border-2 border-white shadow hover:shadow-lg bg-gradient-to-bl from-white to-gray-50 hover:scale-[99%] transition text-gray-900 px-5 py-4 rounded-full text-base cursor-pointer">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-7xl">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold text-gray-700 leading-tighter tracking-tighter mb-5 md:mb-8">
            Personal finance tracking <span className="block">without the complexity</span>
          </h1>

          <p className="text-base md:text-xl text-gray-500 leading-relaxed mb-6 md:mb-12 max-w-3xl">
            Modern money management for individuals who want clarity, control, and financial growth without the
            traditional budgeting hassle.
          </p>

          <div className="hover:bg-gray-100 transition border-2 border-gray-200 w-min p-1.5 rounded-full">
            <Link href="/register">
              <Button className="hover:shadow-lg bg-gradient-to-bl from-gray-800 to-gray-700 hover:scale-[99%] transition text-white px-8 py-6 md:px-10 md:py-8 rounded-full text-base md:text-lg cursor-pointer">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Desktop Grid Layout */}
        <div className="hidden xl:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, index) => (
            <div key={card.id} className="bg-gray-50/50 shadow-sm hover:shadow-md hover:scale-[101%] transition p-2 border-1 border-gray-200 rounded-2xl">
              <Card className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={268}
                  height={278}
                  className="mx-auto rounded-2xl"
                />
                <div className="p-3 pt-0">
                  <div className="text-sm text-gray-400 font-medium pb-2.5">/ {String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg font-semibold text-gray-600 leading-tight max-w-40">{card.title}</h3>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="xl:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {featureCards.map((card, index) => (
                <Card key={card.id} className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex-none w-[280px]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={262}
                    height={274}
                    className="mx-auto rounded-2xl"
                  />
                  <div className="p-2 pt-0">
                    <div className="text-sm text-gray-400 font-medium pb-2.5">/ {String(index + 1).padStart(2, '0')}</div>
                    <h3 className="text-lg font-semibold text-gray-600 leading-tight max-w-40">{card.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
