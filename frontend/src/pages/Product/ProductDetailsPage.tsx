import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetailsPage.css";
import { IProduct } from "../../types/IProduct";
import { useParams } from "react-router-dom";

type Props = {
  onError: (message: string) => void;
};

export const ProductDetailsPage: React.FC<Props> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/` + id)
      .then((productResponse) => {
        setProduct(productResponse.data);
      })
      .catch((err) => {
        onError("Loading the product failed. Please try again later");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <main className="product-page">
      {!isLoading && product && (
        <>
          <h1>{product.title}</h1>
          <h2>{product.price}</h2>
          <div
            className="product-page__image"
            style={{
              backgroundImage: "url('" + product.imageUrl + "')",
            }}
          />
          <p>{product.description}</p>
        </>
      )}
      {!isLoading && !product && <p>Found no product. Try again later.</p>}
    </main>
  );
};
