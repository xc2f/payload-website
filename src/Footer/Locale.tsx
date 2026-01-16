'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { useLocale } from 'next-intl'

type Language = 'en' | 'zh'

export const LanguageSelector: React.FC = () => {
  const locale = useLocale()

  const onlanguageChange = (nextLocal: Language) => {
    const { pathname, search } = window.location
    window.location.href = `/${nextLocal}${pathname.replace(/^\/[a-z]+(\/|$)/, '/')}${search}`
  }

  return (
    <Select onValueChange={onlanguageChange} value={locale}>
      <SelectTrigger
        aria-label="Select a language"
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="zh">简体中文</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  )
}
