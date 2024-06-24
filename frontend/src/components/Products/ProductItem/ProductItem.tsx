import React from 'react';
import { Link } from 'react-router-dom';

import './ProductItem.css';

type Props = {
  id: string;
  title: string;
  text: string;
  price: number;
  imageUrl: string;
  onDelete: (id: string) => void;
};

export const ProductItem: React.FC<Props> = ({ imageUrl, title, text, price, id, onDelete }) => (
  <article className="product-item">
    <div
      className="product-item__image"
      style={{ backgroundImage: "url('" + imageUrl + "')" }}
    />
    <div className="product-item__content">
      <h1>{title}</h1>
      <h2>${price}</h2>
      <p>{text}</p>
      <div className="product-item__controls">
        <Link to={'/products/' + id}>Details</Link>
        <Link to={'/products/' + id + '/edit'}>Edit</Link>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  </article>
);
