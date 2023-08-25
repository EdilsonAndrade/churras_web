import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />

      <Component {...pageProps} />

      <Footer />
    </Provider>
  )
}
