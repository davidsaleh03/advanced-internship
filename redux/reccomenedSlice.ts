import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export const recommendedApi = createApi({
  reducerPath: 'recommendedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://us-central1-summaristt.cloudfunctions.net/',
  }),
  endpoints: (builder) => ({
    getRecommendedBooks: builder.query<Book[], void>({
      query: () => 'getBooks?status=recommended',
    }),
    getSelectedBook: builder.query<Book[], void>({
      query: () => 'getBooks?status=selected',
    }),
    getSuggestedBook: builder.query<Book[], void>({
      query: () => 'getBooks?status=suggested',
    }),
  }),
})

export const { useGetRecommendedBooksQuery, useGetSelectedBookQuery, useGetSuggestedBookQuery } = recommendedApi