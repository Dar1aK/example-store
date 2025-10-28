import type { FC } from "react";
import { PageTitle } from "@/components/page-title";

export const Checkout: FC = () => {
  return (
    <>
      <title>Checkout — Example Store</title>
      <PageTitle>Checkout</PageTitle>
      <div className="row">
        <div className="col">form</div>
      </div>
    </>
  );
};
