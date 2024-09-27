import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Country {
    name: string;
    countryCode: string;
}

interface CountryInfo {
    countryCode: string;
    countryName: string;
    borderCountries: {
        name: string;
        code: string;
    }[];
    populationData: {
        year: string;
        value: number;
    }[];
    flagUrl: string;
}

export const countryApi = createApi({
    reducerPath: 'countryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    endpoints: (builder) => ({
        getAvailableCountries: builder.query<Country[], void>({
            query: () => '/countries/available',
        }),
        getCountryInfo: builder.query<CountryInfo, string>({
            query: (countryCode) => `/countries/info/${countryCode}`,
        }),
    }),
});

export const {
    useGetAvailableCountriesQuery,
    useGetCountryInfoQuery,
} = countryApi;
