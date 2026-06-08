import { useEffect, useState } from 'react';
import type { FormData } from '../types/form.types';

interface Props {
  data: FormData;
}

const SubmissionCard = ({ data }: Props) => {
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNew(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        border: isNew ? '2px solid #4CAF50' : '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: isNew ? '#E8F5E9' : '#f9f9f9',
        transition: 'all 0.5s ease',
        boxShadow: isNew ? '0 4px 12px rgba(76, 175, 80, 0.2)' : 'none',
      }}
    >
      {data.image && (
        <img
          src={data.image}
          alt={data.name}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      )}
      <h3 style={{ margin: '12px 0 8px 0' }}>{data.name}</h3>
      <p style={{ margin: '4px 0' }}>
        <b>Age:</b> {data.age}
      </p>
      <p style={{ margin: '4px 0', wordBreak: 'break-all' }}>
        <b>Email:</b> {data.email}
      </p>
      <p style={{ margin: '4px 0' }}>
        <b>Country:</b> {data.country}
      </p>
      <p style={{ margin: '4px 0' }}>
        <b>Gender:</b> {data.gender}
      </p>
    </div>
  );
};

export default SubmissionCard;
