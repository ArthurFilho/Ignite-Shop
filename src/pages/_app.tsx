import { AppProps } from "next/app"

import Image from "next/image"
import { GlobalStyles } from "../../styles/global"
import { Container, Header } from "../../styles/pages/app"
import logoImg from '../assets/logo.svg'



GlobalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      
      <Header>
        <Image src={logoImg} alt=''/>

      </Header>
      <Component {...pageProps} />
    </Container>
   
  ) 
}