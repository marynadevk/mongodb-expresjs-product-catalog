import React, { useEffect, useState } from "react";
import axios from "axios";

import { IProduct } from "../../types/IProduct";
import { ProductsList } from '../../components/Products/ProductsList';

type Props = {
  onError: (message: string) => void;
};

export const ProductsPage: React.FC<Props> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = () => {
    axios
      .get("http://localhost:3100/products")
      .then((productsResponse) => {
        setProducts(productsResponse.data);
      })
      .catch((err) => {
        setProducts([]);
        onError("Loading products failed. Please try again later");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => getProducts, []);

  const productDeleteHandler = (productId: string) => {
    axios
      .delete("http://localhost:3100/products/" + productId)
      .then(getProducts)
      .catch((err) => {
        onError("Deleting the product failed. Please try again later");
        console.error(err);
      });
  };

  return (
    <main>
      {isLoading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <ProductsList
          products={products}
          onDeleteProduct={productDeleteHandler}
        />
      ) : (
        <p>Found no products. Try again later.</p>
      )}
    </main>
  );
};
