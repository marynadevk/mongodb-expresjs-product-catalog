import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductEditPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/Input/Textarea";
import { Button } from "../../components/Button/Button";
import { IProduct } from "../../types/IProduct";
type Props = {
  onError: (message: string) => void;
};

export const ProductEditPage: React.FC<Props> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>({
    title: "",
    price: 0,
    imageUrl: "",
    description: "",
  });
  const { mode, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/products/` + id)
        .then((productResponse) => {
          setProduct({
            ...productResponse.data,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [mode, id]);

  const validateProductField = (product: IProduct) => {
    return Object.values(product).some((value) => value.trim() === "");
  };

  const editProductHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateProductField(product)) {
      return;
    }
    setIsLoading(true);

    const productData = {
      title: product.title,
      price: product.price.toString(),
      image: product.imageUrl,
      description: product.description,
    };

    let request;
    if (mode === "edit") {
      request = axios.patch(
        `${import.meta.env.VITE_API_URL}/products/` + id,
        productData
      );
    } else {
      request = axios.post(
        `${import.meta.env.VITE_API_URL}/products/`,
        productData
      );
    }

    request
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error(err);
        onError("Editing the product failed. Please try again later");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    input: string
  ) => {
    const value = event.target.value;
    setProduct({ ...product, [input]: value });
  };

  return (
    <main>
      {!isLoading ? (
        <form className="edit-product__form" onSubmit={editProductHandler}>
          <Input
            label="Title"
            type="text"
            value={product.title}
            onChange={(event) => inputChangeHandler(event, "title")}
          />
          <Input
            label="Price"
            type="number"
            value={product.price}
            onChange={(event) => inputChangeHandler(event, "price")}
          />
          <Input
            label="Image URL"
            type="text"
            value={product.imageUrl}
            onChange={(event) => inputChangeHandler(event, "imageUrl")}
          />
          <Textarea
            label="Description"
            value={product.description}
            onChange={(event) => inputChangeHandler(event, "description")}
          />
          <Button type="submit">Update Product</Button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};
