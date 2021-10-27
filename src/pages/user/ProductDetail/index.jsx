import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetailAction } from '../../../redux/actions'

const ProductDetailPage = ({ match, ...props }) => {
  const id = match.params?.id;

  const { productDetail } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getProductDetailAction({ id }))
  }, [id])

  return (
    <div>
      Product Detail Page
      <div>{productDetail.data.name}</div>
      <div>{productDetail.data.price?.toLocaleString()}</div>
    </div>
  );
};

export default ProductDetailPage;
