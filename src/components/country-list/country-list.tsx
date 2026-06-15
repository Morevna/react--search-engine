import { useMemo, useState } from 'react';
import type { UIEvent } from 'react';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
    return countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        } else {
          const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
          const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        }
      });
  }, [countries, searchQuery, selectedRegion, sortField, sortOrder, selectedYear]);

  const [scrollTop, setScrollTop] = useState(0);
  const listHeight = 600;
  const itemHeight = 380;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
  const endIndex = Math.min(
    filteredCountries.length - 1,
    Math.floor((scrollTop + listHeight) / itemHeight) + 1
  );

  const totalHeight = filteredCountries.length * itemHeight;

  const offsetY = startIndex * itemHeight;

  const visibleCountries = filteredCountries.slice(startIndex, endIndex + 1);

  if (filteredCountries.length === 0) {
    return <div className={styles.noData}>No countries found</div>;
  }

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: `${listHeight}px`,
        overflowY: 'auto',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        border: '1px solid #eee',
        borderRadius: '8px',
      }}
    >
      <div style={{ height: `${totalHeight}px`, width: '100%', position: 'relative' }}>
        <div
          style={{ transform: `translateY(${offsetY}px)`, left: 0, right: 0, position: 'absolute' }}
        >
          {visibleCountries.map((country) => (
            <div key={country.id} style={{ height: `${itemHeight}px` }}>
              <CountryCard
                country={country}
                selectedYear={selectedYear}
                selectedColumns={selectedColumns}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
