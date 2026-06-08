import { useState } from 'react';
import Modal from '../components/ui/Modal';
import { useFormStore } from '../store/useFormStore';
import UncontrolledForm from '../components/UncontrolledForm';
import HookForm from '../components/HookForm';
import SubmissionCard from '../components/SubmissionCard';

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
        <UncontrolledForm onSuccess={() => setIsUncontrolledOpen(false)} />
      </Modal>

      <Modal
        isOpen={isHookFormOpen}
        onClose={() => setIsHookFormOpen(false)}
        title="React Hook Form"
      >
        <HookForm onSuccess={() => setIsHookFormOpen(false)} />
      </Modal>

      <h2>Submissions History ({submissions.length})</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet. Open a form and submit some data!</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {submissions.map((data) => (
            <SubmissionCard key={data.id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
