import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({product}: ProductProps) {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })
      
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (error) {
      
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p> ...loading</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image  src={product.imageUrl} width={480} height={520} alt=""/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}
          </span>
          
          <p>{product.description}</p>
              
          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
    
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NIQoXtxapppR5e' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  if(!params) {
    return {
      notFound: true 
    }
  }

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id, 
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount ? price.unit_amount / 100 : price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
        },
      },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
