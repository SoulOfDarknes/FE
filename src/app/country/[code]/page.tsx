'use client';

import styles from './page.module.css';
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
    return <div>The country code is not defined.</div>;
  }

  const { data: countryInfo, error, isLoading } = useGetCountryInfoQuery(code);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error when receiving data:', error);
    return <div>An error occurred while uploading data.</div>;
  }

  if (!countryInfo) return <div>Country not found.</div>;

  const formattedPopulationData = countryInfo.populationData.map((data) => ({
    year: data.year,
    population: data.value,
  }));

  return (
    <div className={styles.country}>
      <h1>
        {countryInfo.countryName} ({countryInfo.countryCode})
      </h1>
      <img
        src={countryInfo.flagUrl}
        alt={`${countryInfo.countryName} Flag`}
        width="200"
      />

      <h2>Neighbouring countries:</h2>
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
        <p>This country has no neighbouring countries.</p>
      )}

      <h2>Graph of population:</h2>
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
