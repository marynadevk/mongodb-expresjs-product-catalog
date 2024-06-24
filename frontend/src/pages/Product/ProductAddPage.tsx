import { useState } from "react";
import axios from "axios";
import "./ProductEditPage.css";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/Input/Textarea";
import { Button } from "../../components/Button/Button";
import { IProduct } from "../../types/IProduct";
type Props = {
  onError: (message: string) => void;
};

export const ProductAddPage: React.FC<Props> = ({ onError }) => {
  const [product, setProduct] = useState<IProduct>({
    title: "",
    price: 0,
    imageUrl: "",
    description: "",
  });
  const navigate = useNavigate();

  const validateProductField = (product: IProduct) => {
    return Object.values(product).some((value) => value.trim() === "");
  };

  const addProductHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateProductField(product)) {
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_URL}/products/`, product)
      .then((productResponse) => {
        const product = productResponse.data;
        console.log(product);

        setProduct({
          title: product.name,
          price: product.price,
          imageUrl: product.image,
          description: product.description,
        });
      })
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error(err);
        onError("Adding the product failed. Please try again later");
      })
      .catch((err) => {
        console.error(err);
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
      <form className="edit-product__form" onSubmit={addProductHandler}>
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
        <Button type="submit">Create Product</Button>
      </form>
    </main>
  );
};
