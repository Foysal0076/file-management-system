import {
  AwsFilesAndFolders,
  AwsSignedUrl,
  FetchAwsSignedUrlParams,
  FetchFilesAndFoldersParams,
} from '@/redux/apiQueries/apiQueries.type'
import { apiSlice } from '@/redux/slice/apiSlice'

export const s3bucketQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFilesAndFolders: builder.query<
      AwsFilesAndFolders,
      FetchFilesAndFoldersParams
    >({
      query: (params) => ({
        url: '/files-and-folders',
        method: 'GET',
        params,
      }),
      providesTags: ['FilesAndFolders'],
    }),
    createS3Folder: builder.mutation({
      query: (folderName: string) => ({
        url: '/create-aws-folder',
        method: 'POST',
        body: { folderName },
      }),
    }),
    fetchAwsSignedUrl: builder.query<AwsSignedUrl, FetchAwsSignedUrlParams>({
      query: (params) => ({
        url: '/get-signed-url',
        method: 'GET',
        params,
      }),
    }),
    uploadFile: builder.mutation({
      query: (formData: any) => {
        const body = new FormData()
        body.append('folderName', formData.folderPath)
        body.append('file', formData.file)
        return {
          url: '/upload-file',
          method: 'POST',
          body: body,
        }
      },
    }),
    // uploadFile: builder.mutation({
    //   query: (formData: FormData) => ({
    //     url: '/upload-file',
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data;',
    //     },
    //     body: formData,
    //   }),
    // }),
  }),
})

export const {
  useFetchFilesAndFoldersQuery,
  useCreateS3FolderMutation,
  useFetchAwsSignedUrlQuery,
  useLazyFetchFilesAndFoldersQuery,
  useUploadFileMutation,
} = s3bucketQueries
