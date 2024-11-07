import { useParams } from "react-router-dom";
// import products from '../../products';
// import axios from 'axios';
// import { useEffect, useState } from "react";
import ProductDetailsLayout from "../shared/Layout/product-details-layout";
import { useGetProductDetailsQuery } from "../../store/slices/productApiSlice";
import Spinner from '../shared/UI/spinner';
import AlertMessage from "../shared/UI/alertMessage";

const ProductsDetailsFetcher = () => {
  const { pid: productId } = useParams();
  // const product = products.find((p)=> p._id === productId);

  // const {pid} = useParams();
  // const product = products.find((p)=> p._id === pid);
  // Both are doing the same thing

  // const {pid: productId} = useParams();
  // const [isLoading, setIsLoading] = useState(false);
  // const [product, setProduct] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(()=>{
  //     const fetchproducts = async () => {
  //       setIsLoading(true);
  //       try{
  //         const response = await axios.get(`/api/products/${productId}`);
  //         console.log(response.data.product);
  //         setProduct(response.data.product);
  //       } catch (err) {
  //         setError(err.response?.data?.message || 'Something went wrong, check Product Details Fetcher!');
  //       }
  //       setIsLoading(false);
  //     };
  //     fetchproducts();
  // }, [productId]);

  const {data: productsDetail, isLoading, isError} = useGetProductDetailsQuery(productId);
  const product = productsDetail?.product;
  console.log(product);

  return (
    // <p>{product.name}</p>
    // {error && <p>{error}</p>}
    // {isLoading && <p>Loading!!</p>}
    // {!isLoading && product && <ProductDetailsLayout product={product}/>}
    <>
      {isLoading ? (
        <Spinner/>
      ) : isError ? (
        <AlertMessage severity='error' marBot={45}>{isError?.data?.message || isError.error || 'Data not found !!'}</AlertMessage>
      ) : (
        <ProductDetailsLayout product={product} />
      )}
    </>
  );
};

export default ProductsDetailsFetcher;
