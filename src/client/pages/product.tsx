import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { FC } from 'react';
import { useParams } from 'react-router';

import type { Product as IProduct, Product as ProductInfo } from '@common/types';
import axios from 'axios';
import { ProductDetails } from '@components/product-details';
import { PageTitle } from '@/components/page-title';
import { DocumentTitle } from '@/components/document-title';

export const useProductDetailHook = (id: string): UseQueryResult<NoInfer<IProduct>> => {
    return useQuery({
        queryKey: ['details', id],
        queryFn: async () => {
            return (await axios.get<ProductInfo>(`/api/products/${id}`)).data;
        },
    });
};

/** страница отдельного товара */
export const Product: FC = () => {
    let { id = '' } = useParams();

    const { data } = useProductDetailHook(id);

    console.log('data', data, id);

    if (!data) {
        return <div data-testid="loading">"Loading..."</div>;
    }

    return (
        <>
            <DocumentTitle text={data.name} />
            <PageTitle>{data.name}</PageTitle>
            <ProductDetails product={data} />
        </>
    );
};
