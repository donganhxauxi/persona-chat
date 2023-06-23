import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Classes from "./"
import { Chatbox } from '@/components/Chatbox/Chatbox'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Chatbox />
  )
}
