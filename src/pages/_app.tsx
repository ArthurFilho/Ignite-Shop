import { AppProps } from "next/app"

import Image from "next/image"
import Link from "next/link"

import { GlobalStyles } from "../../src/styles/global"
import { Container, Header } from "../../src/styles/pages/app"
import LogoImg from "../assets/Logo.svg"

GlobalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      
      <Header>
       <Link href="/"> <Image src={LogoImg} alt=''/> </Link>

      </Header>
      <Component {...pageProps} />
    </Container>
   
  ) 
}