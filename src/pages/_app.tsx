import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Header />

      <Component {...pageProps} />

      <Footer />
    </Provider>
  )
}
