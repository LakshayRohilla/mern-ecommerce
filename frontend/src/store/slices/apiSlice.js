// fetchBaseQuery will allow us to make request ot BE api.
// createSlice use where are arent dealing with async req
// Since we are dealing with BE api, we will use createapi
// tagTypes: Type of data that we are fetching from the BE api
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice = createApi({
    baseQuery, // baseQuery:baseQuery
    tagTypes: ['Product', 'Order', 'User'],
    // We dont have to fetch our data using fetchAPI and do the error handling using try catch.
    // We can so all the using the below builder
    endpoints: (builder) => ({}),
});

// this is parent to all the slice what we will be creating ahead.