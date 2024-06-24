import React from 'react';

import { ProductItem } from './ProductItem/ProductItem';

import './ProductsList.css';
import { IProduct } from '../../types/IProduct';

type Props = {
  products: IProduct[];
  onDeleteProduct: (id: string) => void;
};

export const ProductsList: React.FC<Props> = ({ products, onDeleteProduct }) => (
  <section className="products">
    {Array.isArray(products) ? (
      products.map(p => (
        <ProductItem
          key={p._id}
          id={p._id || ''}
          title={p.title}
          text={p.description}
          price={p.price}
          imageUrl={p.imageUrl}
          onDelete={onDeleteProduct}
        />
      ))
    ) : (
      <p>No products found.</p>
    )}
  </section>
);