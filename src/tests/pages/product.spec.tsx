import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, act, renderHook, waitFor } from '@testing-library/react';
import * as ReactQuery from '@tanstack/react-query';
// import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';
import { Product, useProductDetailHook } from '@/pages/product';
import type { Product as IProduct } from '@common/types';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { addToCart, initStore } from '@/store';
import nock from 'nock';

const item: IProduct = {
    id: 15,
    name: 'Gorgeous Chair',
    description:
        'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    fullDescription:
        'Quidem voluptas quo. Autem consectetur sit voluptas inventore. Saepe consequuntur esse. Est voluptatibus asperiores quia quibusdam similique quos beatae quia similique. Similique voluptates labore quis laborum aliquam omnis rem nihil.',
    price: 280,
    color: 'teal',
    material: 'Granite',
};

const renderWithClient = (
    queryClient: ReactQuery.QueryClient,
    ui: React.ReactElement,
    store: any
): ReturnType<typeof render> => {
    return render(
        <BrowserRouter>
            <Provider store={store}>
                <ReactQuery.QueryClientProvider client={queryClient}>{ui}</ReactQuery.QueryClientProvider>
            </Provider>
        </BrowserRouter>
    );
};

vi.mock('react-router', async () => {
    const mod = await vi.importActual('react-router');
    return {
        ...mod,
        useParams: () => ({
            id: 15,
        }),
    };
});

vi.mock('@tanstack/react-query', { spy: true });

const createTestQueryClient = () =>
    new ReactQuery.QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

function createWrapper() {
    const testQueryClient = createTestQueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <ReactQuery.QueryClientProvider client={testQueryClient}>{children}</ReactQuery.QueryClientProvider>
    );
}

describe('page product', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.resetAllMocks();
    });

    test('check Loading state', async () => {
        const queryClient = new ReactQuery.QueryClient();
        const store = initStore();
        const rendered = renderWithClient(queryClient, <Product />, store);

        // await act(() => vi.advanceTimersByTimeAsync(10));

        expect(rendered.getByTestId('loading').textContent).toBe('"Loading..."');
    });

    test.only('check loaded info', async () => {
        const queryClient = createTestQueryClient();
        const store = initStore();

        const expectation = nock('http://localhost:5173').get('/api/products/15').reply(200, { data: item });

        const { result } = renderHook(() => useProductDetailHook('15'), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <Provider store={store}>
                        <ReactQuery.QueryClientProvider client={queryClient}>
                            {children}
                        </ReactQuery.QueryClientProvider>
                    </Provider>
                </BrowserRouter>
            ),
        });

        console.log('result', await result, expectation);
        await waitFor(() => result.current.isSuccess);

        // const rendered = renderWithClient(queryClient, <Product />, store);

        // await act(() => vi.advanceTimersByTimeAsync(10));
        // expect(rendered.getByTestId('page-title').textContent).toBe('Gorgeous Chair');
    });

    test('check add to cart', async () => {
        const queryClient = createTestQueryClient();
        const store = initStore();
        const chair = {
            id: 15,
            name: 'Gorgeous Chair',
            description:
                'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
            price: 280,
        };

        store.dispatch(addToCart(chair));

        const rendered = renderWithClient(queryClient, <Product />, store);

        await act(() => vi.advanceTimersByTimeAsync(10));
        // console.log('store.getState', rendered.container, store.getState());
        expect(store.getState().cart).toStrictEqual({
            '15': {
                count: 1,
                name: 'Gorgeous Chair',
                price: 280,
            },
        });
    });
});
