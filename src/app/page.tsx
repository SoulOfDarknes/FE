'use client';

import React from 'react';
import Link from 'next/link';
import { useGetAvailableCountriesQuery } from '../../services/countryApi';

const HomePage: React.FC = () => {
  const { data: countries, error, isLoading } = useGetAvailableCountriesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error when receiving data:', error);
    return <div>An error occurred while uploading data.</div>;
  }

  return (
    <div>
      <header><h1><a href="/">List of countries</a></h1></header>
      <ul>
        {countries?.map((country) => (
          <Link href={`/country/${country.countryCode}`}>
            <li key={country.countryCode}>
              {country.name} ({country.countryCode})
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
