import { useState } from 'react';
import Modal from '../components/ui/Modal';
import { useFormStore } from '../store/useFormStore';

const Main = () => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isHookFormOpen, setIsHookFormOpen] = useState(false);

  const submissions = useFormStore((state) => state.submissions);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>React Forms Task</h1>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <button
          onClick={() => setIsUncontrolledOpen(true)}
          style={{ padding: '12px 24px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Open Uncontrolled Form
        </button>
        <button
          onClick={() => setIsHookFormOpen(true)}
          style={{ padding: '12px 24px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Open React Hook Form
        </button>
      </div>

      <Modal
        isOpen={isUncontrolledOpen}
        onClose={() => setIsUncontrolledOpen(false)}
        title="Uncontrolled Form"
      >
        <div style={{ color: '#666' }}>[Место для Неуправляемой формы]</div>
      </Modal>

      <Modal
        isOpen={isHookFormOpen}
        onClose={() => setIsHookFormOpen(false)}
        title="React Hook Form"
      >
        <div style={{ color: '#666' }}>[Место для React Hook Form]</div>
      </Modal>

      <h2>Submissions History ({submissions.length})</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet. Open a form and submit some data!</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {submissions.map((data) => (
            <div
              key={data.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
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
              <h3>{data.name}</h3>
              <p>Age: {data.age}</p>
              <p>Email: {data.email}</p>
              <p>Country: {data.country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
