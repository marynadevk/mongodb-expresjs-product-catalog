import { Document, WithId } from "mongodb";

export default class Product {
  constructor(source: WithId<Document>) {
    this._id = source._id.toString();
    this.title = source.title;
    this.description = source.description;
    this.price = source.price.toString();
    this.imageUrl = source.imageUrl;
  }

  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}
