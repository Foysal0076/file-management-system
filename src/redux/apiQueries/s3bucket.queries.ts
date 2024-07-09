import { apiSlice } from '@/redux/slice/apiSlice'

export const s3bucketQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBucket: builder.query({
      query: () => ({
        url: '/s3bucket',
        method: 'GET',
      }),
    }),
  }),
})

export const { useFetchBucketQuery } = s3bucketQueries
