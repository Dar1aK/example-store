import type { FC } from "react";
import { Link } from "react-router";

import { Image } from "@components/image";
import type { ProductShortInfo } from "@common/types";

interface ProductItemProps {
  product: ProductShortInfo;
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <div data-testid={product.id} className="card w-100 mb-4">
      <Image className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/catalog/${product.id}`}>{product.name}</Link>
        </h5>
        <p className="card-text">${product.price}</p>
      </div>
    </div>
  );
};
