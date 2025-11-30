"use client"

import { ChevronDown, ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      quote: "CashFlow has revolutionized my personal finances.",
      subquote: "It's efficient and user-friendly, streamlining budgeting to expense tracking.",
      name: "Sarah Johnson",
      role: "Freelance Designer",
      avatar: "/sarah-johnson.jpeg"
    },
    {
      id: 2,
      quote: "Finally, a finance app that actually makes sense.",
      subquote: "The insights and automation have saved me hours every month.",
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "/michael-chen.jpeg"
    }
  ]

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(current => 
        current === testimonials.length - 1 ? 0 : current + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <main className="min-h-dvh bg-gradient-to-b from-white to-blue-100/60 text-gray-700">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* CashFlow logo */}
          <Link href="/" className="inline-flex items-center gap-2" aria-label="CashFlow home">
            <Image
              src="/logo.png"
              alt="CashFlow"
              width={176}
              height={44}
              className="w-32"
            />
          </Link>

          {/* Right-side text */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>
              {isLoginPage ? "Don't have an account?" : "Already have an account?"}
            </span>
            <Link 
              href={isLoginPage ? "/register" : "/login"} 
              className="rounded-full border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50 transition"
            >
              {isLoginPage ? "Register" : "Login"}
            </Link>
          </div>
        </div>
      </header>

      {/* Main split layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Left: Form content (children) */}
          <div className="w-full">
            <div className="mx-auto w-full max-w-[420px]">
              {children}
            </div>

            {/* Footer */}
            <div className="mt-12 flex items-center justify-between text-sm text-gray-500">
              <p>© 2025 CashFlow</p>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 cursor-pointer"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span>ENG</span>
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right: Testimonial */}
          <div className="w-full">
            <Card className="rounded-[24px] border-gray-200 bg-white">
              <CardContent className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
                {/* Subtle grid background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[24px] opacity-[0.5]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage:
                      "radial-gradient(1200px 600px at 40% 40%, rgba(0,0,0,1), rgba(0,0,0,0.15))",
                    WebkitMaskImage:
                      "radial-gradient(1200px 600px at 40% 40%, rgba(0,0,0,1), rgba(0,0,0,0.15))",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <Image
                      src={testimonials[currentTestimonial].avatar}
                      alt="Customer avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full ring-1 ring-gray-200"
                    />
                    <Separator className="hidden flex-1 sm:block bg-transparent" />
                    {/* Navigation buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <blockquote className="max-w-[680px]">
                    <p className="text-2xl font-semibold leading-tight text-gray-700 sm:text-3xl lg:text-4xl">
                      {testimonials[currentTestimonial].quote}
                      <span className="block text-gray-500">
                        {testimonials[currentTestimonial].subquote}
                      </span>
                    </p>
                  </blockquote>

                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700">{testimonials[currentTestimonial].name}</div>
                      <div className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</div>
                    </div>

                    {/* Pagination dots/bars */}
                    <div className="flex items-center gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={cn(
                            "inline-flex h-1.5 rounded-full cursor-pointer transition-all",
                            index === currentTestimonial 
                              ? "w-6 bg-gray-700" 
                              : "w-3 bg-gray-300 hover:bg-gray-400"
                          )}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
