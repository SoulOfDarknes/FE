'use client';

import React from 'react';
import Link from 'next/link';
import { useGetAvailableCountriesQuery } from '../../services/countryApi';

const HomePage: React.FC = () => {
  const { data: countries, error, isLoading } = useGetAvailableCountriesQuery();

  if (isLoading) return <div>Завантаження...</div>;
  if (error) {
    console.error('Помилка при отриманні даних:', error);
    return <div>Сталася помилка при завантаженні даних.</div>;
  }

  return (
    <div>
      <h1>Список країн</h1>
      <ul>
        {countries?.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/country/${country.countryCode}`}>
              {country.name} ({country.countryCode})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
