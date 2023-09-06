import Main  from '@/components/Main'
import { Inter } from 'next/font/google'

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div className={inter.className}>
      <Main />
    </div>
  )
}
