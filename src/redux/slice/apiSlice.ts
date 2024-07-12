import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: async (headers, { getState }) => {
      //add Content-Type
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  keepUnusedDataFor: 600, //in seconds
  tagTypes: ['FilesAndFolders'],
  endpoints: (builder) => ({}),
})
