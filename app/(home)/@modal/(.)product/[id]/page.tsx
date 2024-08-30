import ProductModal from '@/shared/views/home/product-modal'
import ContentModal from '@/shared/views/home/product-modal/ContentModal'

type Props = {
    params: {
        id: string
    }
}

const ProductModalPage = ({ params: { id } }: Props) => {
    return <ContentModal id={id} />
}

export default ProductModalPage
