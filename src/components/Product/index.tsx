// Components
import { Image } from 'antd';
import AddToCart from '../AddToCart';
// DOMSanitize
import DOMPurify from 'isomorphic-dompurify';
// Hooks
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductsActions, useTypedSelector, useWindowDimensions } from '../../hooks';
// Images
import ImagePlaceholder from '/images/placeholder.png';
// Styles
import { ProductHero, ProductDescription, ProductOfferInfo, ProductContent, ProductWrapper } from './Product.styles';

const Product: React.FC = () => {
  const { product } = useTypedSelector((state) => (state.productsData));
  const { fetchProductStart, setProduct } = useProductsActions();
  const { productId } = useParams();
  const { width } = useWindowDimensions();
  const heroImageSize = width > 992 ? '40rem' : '100%';

  useEffect(() => {
    if (productId) {
      fetchProductStart(productId);
    }
    return () => { setProduct(null) };
  }, [fetchProductStart, productId, setProduct]);

  if (!product) return null;

  const cleanDescription = DOMPurify.sanitize(product.description);

  return (
    <ProductWrapper vertical align="center">
      <ProductContent justify="space-between" gap="1rem" vertical={width < 992}>
        <ProductHero vertical>
          <h1>{product.productName}</h1>
          <Image
            preview={{ src: ImagePlaceholder }}
            width={heroImageSize}
            height={heroImageSize}
            src={product.thumbnail}
            alt={product.productName}
          />
        </ProductHero>
        <ProductOfferInfo vertical gap="2rem">
          <h3>{product.price}₽</h3>
          <AddToCart product={product} />
          <h4>Самовывоз или доставка</h4>
        </ProductOfferInfo>
      </ProductContent>
      <ProductDescription
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      />
    </ProductWrapper>
  );
}

export default Product;
