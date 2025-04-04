import Loading from '@/components/common/loading'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Luxury Couch for Real Life | Burrow',
  description:
    'The most clever, comfortable sofa designed for your ever-changing life and living room. Enjoy a cozy 30-day risk-free trial',
}

export default function Home() {
  return (
    <>
      <Loading />
    </>
  )
}
