import { Router } from "express";
import { getDb } from "../db/db";
import { Decimal128, ObjectId } from "mongodb";
import Product from "../types/Product";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res, next) => {
  const queryPage = req.query.page;
  const pageSize = 1;
  const products: Product[] = [];
  getDb()
    .db()
    .collection("products")
    .find()
    .sort({ price: -1 })
    .forEach((productDoc) => {
      products.push(new Product(productDoc));
    })
    .then(() => {
      res.status(StatusCodes.OK).json(products);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred." });
    });
});

router.get("/:id", (req, res, next) => {
  getDb()
    .db()
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((productDoc) => {
      if (productDoc) {
        res.status(StatusCodes.OK).json(new Product(productDoc));
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Product not found." });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred." });
    });
});

router.post("", (req, res, next) => {
  const { title, description, price, imageUrl } = req.body;
  const newProduct = {
    title,
    description,
    price: Decimal128.fromString(price),
    imageUrl,
  };
  getDb()
    .db()
    .collection("products")
    .insertOne(newProduct)
    .then((result) => {
      console.log(result);
      res.status(StatusCodes.CREATED).json({
        ...newProduct,
        _id: result.insertedId,
        price: newProduct.price.toString(),
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred." });
    });
});

router.patch("/:id", (req, res, next) => {
  const { title, description, price, imageUrl } = req.body;
  const updatedProduct = {
    title,
    description,
    price: Decimal128.fromString(price.toString()),
    imageUrl,
  };
  getDb()
    .db()
    .collection("products")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: updatedProduct,
      }
    )
    .then(() => {
      res
        .status(StatusCodes.OK)
        .json({ message: "Product updated", productId: req.params.id });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred." });
    });
});

router.delete("/:id", (req, res, next) => {
  getDb()
    .db()
    .collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then(() => {
      res.status(StatusCodes.OK).json({ message: "Product deleted" });
    })
    .catch((err: Error) => {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred." });
    });
});

export default router;
