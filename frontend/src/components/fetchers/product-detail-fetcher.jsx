import { useParams } from "react-router-dom";
import products from '../../products';
import ProductDetailsLayout from "../shared/Layout/product-details-layout";

const ProductsDetailsFetcher = () => {
  const {pid: productId} = useParams();
  const product = products.find((p)=> p._id === productId);
  
  return (
    <ProductDetailsLayout product={product}/>
  );

};

export default ProductsDetailsFetcher;
