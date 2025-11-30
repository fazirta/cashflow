"use client"

import { Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!agreeToTerms) {
      setError('Please agree to the terms and conditions')
      setIsLoading(false)
      return
    }

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name
      })

      if (authError) {
        setError(authError.message || 'Registration failed')
      } else if (data) {
        router.push('/dashboard')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'apple' | 'google' | 'github') => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard'
      })
    } catch {
      setError('Social login failed')
    }
  }

  return (
    <>
      {/* Avatar icon circle */}
      <div className="flex justify-center pb-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 ring-1 ring-gray-200">
          <UserRound className="h-8 w-8 text-gray-500" aria-hidden="true" />
        </div>
      </div>

      {/* Heading & subtext */}
      <div className="text-center">
        <h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-gray-700">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">Enter your details to get started.</p>
      </div>

      {/* Social buttons */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <SocialButton 
          ariaLabel="Continue with Apple"
          onClick={() => handleSocialLogin('apple')}
        >
          <Image src="/apple.png" alt="Apple" width={20} height={20} />
        </SocialButton>
        <SocialButton 
          ariaLabel="Continue with Google"
          onClick={() => handleSocialLogin('google')}
        >
          <Image src="/google.png" alt="Google" width={20} height={20} />
        </SocialButton>
        <SocialButton 
          ariaLabel="Continue with GitHub"
          onClick={() => handleSocialLogin('github')}
        >
          <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
        </SocialButton>
      </div>

      {/* OR divider */}
      <div className="my-5 flex items-center gap-4 text-xs text-gray-400">
        <span className="inline-flex h-px flex-1 bg-gray-200" />
        <span className="tracking-[0.12em]">OR</span>
        <span className="inline-flex h-px flex-1 bg-gray-200" />
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-full bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="text-[13px] text-gray-700 after:ml-0.5 after:text-rose-500 after:content-['*']"
          >
            Full Name
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <UserRound className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-[13px] text-gray-700 after:ml-0.5 after:text-rose-500 after:content-['*']"
          >
            Email Address
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="hello@cashflow.com"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <PasswordField value={password} onChange={setPassword} />

        {/* Terms checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <Checkbox 
            id="terms" 
            className="rounded-[6px]"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          />
          <label htmlFor="terms" className="text-[13px] text-gray-700">
            I agree to the{' '}
            <Link href="/terms" className="text-gray-600 underline underline-offset-2 hover:text-gray-800">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-gray-600 underline underline-offset-2 hover:text-gray-800">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Register button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-1 h-11 w-full rounded-full bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-sm hover:from-gray-700 hover:to-gray-600 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </>
  )
}

function SocialButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode
  ariaLabel: string
  onClick?: () => void
}) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-label={ariaLabel}
      onClick={onClick}
      className="h-11 w-full rounded-full border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
    >
      <span className="sr-only">{ariaLabel}</span>
      {children}
    </Button>
  )
}

const inputClass =
  "h-11 w-full rounded-full border-gray-200 bg-white pl-10 pr-10 text-[14px] placeholder:text-gray-400 focus-visible:ring-gray-300"

function PasswordField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [show, setShow] = useState(false)
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="password"
        className="text-[13px] text-gray-700 after:ml-0.5 after:text-rose-500 after:content-['*']"
      >
        Password
      </Label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Lock className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
        <Input
          id="password"
          type={show ? "text" : "password"}
          className={inputClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
          )}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
        </button>
      </div>
    </div>
  )
}