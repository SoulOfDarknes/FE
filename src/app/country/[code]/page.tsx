'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetCountryInfoQuery } from '../../../../services/countryApi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import Link from 'next/link';

const CountryInfoPage: React.FC = () => {
  const params = useParams();
  const code = params.code as string;

  if (!code) {
    return <div>Код країни не визначено.</div>;
  }

  const { data: countryInfo, error, isLoading } = useGetCountryInfoQuery(code);

  if (isLoading) return <div>Завантаження...</div>;
  if (error) {
    console.error('Помилка при отриманні даних:', error);
    return <div>Сталася помилка при завантаженні даних.</div>;
  }

  if (!countryInfo) return <div>Країна не знайдена.</div>;

  const formattedPopulationData = countryInfo.populationData.map((data) => ({
    year: data.year,
    population: data.value,
  }));

  return (
    <div>
      <h1>
        {countryInfo.countryName} ({countryInfo.countryCode})
      </h1>
      <img
        src={countryInfo.flagUrl}
        alt={`${countryInfo.countryName} Flag`}
        width="200"
      />

      <h2>Сусідні країни:</h2>
      {countryInfo.borderCountries.length > 0 ? (
        <ul>
          {countryInfo.borderCountries.map((borderCountry) => (
            <li key={borderCountry.code}>
              <Link href={`/country/${borderCountry.code}`}>
                {borderCountry.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ця країна не має сусідніх країн.</p>
      )}

      <h2>Графік населення:</h2>
      <LineChart
        width={600}
        height={300}
        data={formattedPopulationData}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="population" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default CountryInfoPage;
