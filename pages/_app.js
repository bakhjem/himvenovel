import '@/css/tailwind.css'
import '@/css/prism.css'
import 'antd/dist/antd.css';
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar';
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'

const isDevelopment = process.env.NODE_ENV === 'development'
// NProgress.configure({ easing: 'ease', speed: 500 });

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <NextNProgress color="#29D"
        startPosition={0.3}
        stopDelayMs={500}
        height={10}
        showOnShallow={true} />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
