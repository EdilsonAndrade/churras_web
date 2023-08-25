import { Inter } from 'next/font/google'
import Login from '../components/Login'

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center pt-10"
    >
      <Login />
    </main>

  )
}
