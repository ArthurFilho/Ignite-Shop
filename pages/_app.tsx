import type { AppProps } from 'next/app'
import { GlobalStyles } from '../styles/global'

import Logo from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app';


export default function App({ Component, pageProps }: AppProps) {
  GlobalStyles();

  console.log(Logo)

  return (
    <Container>
      <Header>
        <img src={Logo.src} />
      </Header>

    <Component {...pageProps} />
    </Container>
  )
}
