import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}
interface GetProductsQueryParams {
  limit: number;
  page: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsQueryParams>({
      query: ({ limit, page }) => `/products?limit=${limit * page}`,
      keepUnusedDataFor: 600,
    }),
  }),
});


export const { useLazyGetProductsQuery } = apiSlice;
