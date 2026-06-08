import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from '../../store/useFormStore';

describe('Zustand Form Store', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('should contain initial countries list', () => {
    const state = useFormStore.getState();
    expect(state.countries.length).toBeGreaterThan(0);
    expect(state.countries).toContain('Germany');
  });

  it('should add form submissions to history', () => {
    const { addSubmission } = useFormStore.getState();

    const mockData = {
      name: 'Maria',
      age: 20,
      email: 'maria@example.com',
      gender: 'female' as const,
      country: 'Georgia',
      image: 'data:image/png;base64,...',
      terms: true,
    };

    addSubmission(mockData);

    const updatedSubmissions = useFormStore.getState().submissions;
    expect(updatedSubmissions.length).toBe(1);
    expect(updatedSubmissions[0].name).toBe('Maria');
    expect(updatedSubmissions[0].id).toBeDefined();
  });
});
