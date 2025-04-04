'use client'

import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f3f1]">
      <div className="flex gap-4">
        <motion.span
          className="h-8 w-8 rounded-full bg-black"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            yoyo: true,
            ease: 'easeInOut',
          }}
        />
        <motion.span
          className="h-8 w-8 rounded-full bg-black"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: 0.2,
            yoyo: true,
            ease: 'easeInOut',
          }}
        />
        <motion.span
          className="h-8 w-8 rounded-full bg-black"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: 0.4,
            yoyo: true,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}

export default Loading
