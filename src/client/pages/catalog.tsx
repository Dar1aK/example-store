import type { FC } from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import type { Product } from "@common/types";
import { ProductItem } from "@components/product-item";

export const Catalog: FC = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: [],
    queryFn: async () => {
      return (await axios.get<Product[]>("/api/products")).data;
    },
  });

  if (isLoading || !data) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  const content = data.map((p) => (
    <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
      <ProductItem product={p} />
    </div>
  ));

  return (
    <>
      <title>Catalog — Example Store</title>
      <div className="row">
        <div className="col">
          <h1>Catalog</h1>
        </div>
      </div>
      <div className="row">{content}</div>
    </>
  );
};
