import { AppProps } from "next/app"

import Image from "next/image"
import Link from "next/link"
import { GlobalStyles } from "../../styles/global"
import { Container, Header } from "../../styles/pages/app"
import logoImg from '../assets/logo.svg'



GlobalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      
      <Header>
       <Link href="/"> <Image src={logoImg} alt=''/> </Link>

      </Header>
      <Component {...pageProps} />
    </Container>
   
  ) 
}