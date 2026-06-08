import { useFormStore } from '../store/useFormStore';

interface Props {
  id: string;
  name: string;
  defaultValue?: string;
}

const CountryAutocomplete = ({ id, name, defaultValue = '' }: Props) => {
  const countries = useFormStore((state) => state.countries);

  return (
    <>
      <input
        id={id}
        name={name}
        type="text"
        list="countries-list"
        defaultValue={defaultValue}
        placeholder="Type to search country..."
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      <datalist id="countries-list">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
    </>
  );
};

export default CountryAutocomplete;