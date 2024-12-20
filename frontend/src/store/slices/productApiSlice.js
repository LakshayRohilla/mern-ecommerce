import { PRODUCTS_URL, UPLOADS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ['Product'], // If we dnt do this we have to refresh the page as mentioned by tutor. For more check notes.
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'], // this is explained in the notes.
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation } = productsApiSlice;


//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Products'],
//     }),
//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: `/api/upload`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//       }),
//       providesTags: ['Product'],
//     }),
//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Product'],
//     }),
//     getTopProducts: builder.query({
//       query: () => `${PRODUCTS_URL}/top`,
//       keepUnusedDataFor: 5,
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useUploadProductImageMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useGetTopProductsQuery,
// } = productsApiSlice;
