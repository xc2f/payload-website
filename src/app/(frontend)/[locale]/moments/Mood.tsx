'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

type MoodKey = keyof typeof MOOD_MAP
interface MoodProps {
  mood: MoodKey
}

const MOOD_MAP: Record<string, string> = {
  happy: '😊',
  calm: '😌',
  thoughtful: '🤔',
  tired: '😴',
  sad: '😢',
  energized: '🔥',
  content: '😎',
  neutral: '😐',
}
const MOOD_MAP_KEY_LIST = Object.keys(MOOD_MAP)

const Mood: React.FC<MoodProps> = ({ mood }) => {
  const t = useTranslations('Moments')

  const [currentMood, setCurrentMood] = useState(mood)

  const handleClickMood = () => {
    // const toChange = Math.random() > 0.7
    // if (toChange) {
    const randomIndex = Math.floor(Math.random() * MOOD_MAP_KEY_LIST.length)
    setCurrentMood(MOOD_MAP_KEY_LIST[randomIndex])
    // }
  }

  return (
    <span
      className="flex items-center gap-1 transition-transform duration-300 hover:scale-150 cursor-pointer select-none"
      onClick={handleClickMood}
      title={t(`mood.${currentMood}`)}
    >
      {MOOD_MAP[currentMood]}
    </span>
  )
}

export default Mood
