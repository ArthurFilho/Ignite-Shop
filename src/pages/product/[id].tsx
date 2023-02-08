import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../../styles/pages/product"


export default function Product() {

    const { query } = useRouter()

    return(
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>

            <ProductDetails>
                <h1>Camiseta X</h1>
                <span>R$ 79,90</span>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eum culpa blanditiis tempore quidem. Reiciendis enim cupiditate eveniet hic atque, accusamus vel voluptate. Rem nulla similique dicta nobis officiis odio.</p>

                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}