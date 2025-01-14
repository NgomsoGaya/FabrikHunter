import { useParams } from "react-router-dom";

const ProductIdFromRoute = () => {
  const { productId } = useParams();
  return productId;
};

export default ProductIdFromRoute;