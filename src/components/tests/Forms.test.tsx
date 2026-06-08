import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UncontrolledForm from '../UncontrolledForm';
import HookForm from '../HookForm';
import { useFormStore } from '../../store/useFormStore';

vi.mock('../../store/useFormStore', () => ({
  useFormStore: vi.fn(),
}));

describe('Forms Integration and Validation', () => {
  const mockAddSubmission = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useFormStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector) =>
        selector({
          submissions: [],
          countries: ['Germany', 'Georgia', 'Canada'],
          addSubmission: mockAddSubmission,
        })
    );
  });

  it('submits UncontrolledForm successfully with valid data', async () => {
    const handleSuccess = vi.fn();
    const { container } = render(
      <UncontrolledForm onSuccess={handleSuccess} />
    );

    fireEvent.change(container.querySelector('#unc-name')!, {
      target: { value: 'Maria' },
    });
    fireEvent.change(container.querySelector('#unc-age')!, {
      target: { value: '25' },
    });
    fireEvent.change(container.querySelector('#unc-email')!, {
      target: { value: 'maria@example.com' },
    });
    fireEvent.change(container.querySelector('#unc-gender')!, {
      target: { value: 'female' },
    });
    fireEvent.change(container.querySelector('#unc-country')!, {
      target: { value: 'Germany' },
    });
    fireEvent.change(container.querySelector('#unc-password')!, {
      target: { value: 'Password123!' },
    });
    fireEvent.change(container.querySelector('#unc-confirmPassword')!, {
      target: { value: 'Password123!' },
    });

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    const originalFormData = window.FormData;
    window.FormData = class MockFormData {
      append = vi.fn();
      delete = vi.fn();
      get(key: string) {
        const mockData: Record<string, unknown> = {
          name: 'Maria',
          age: '25',
          email: 'maria@example.com',
          gender: 'female',
          country: 'Germany',
          password: 'Password123!',
          confirmPassword: 'Password123!',
          terms: 'on',
          imageFile: file,
        };
        return mockData[key];
      }
      getAll = vi.fn();
      has = vi.fn();
      set = vi.fn();
      forEach = vi.fn();
    } as unknown as typeof FormData;

    const form = container.querySelector('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockAddSubmission).toHaveBeenCalledTimes(1);
      expect(handleSuccess).toHaveBeenCalledTimes(1);
    });

    window.FormData = originalFormData;
  });

  it('submits HookForm successfully with valid data', async () => {
    const handleSuccess = vi.fn();
    const { container } = render(<HookForm onSuccess={handleSuccess} />);

    fireEvent.change(container.querySelector('#hk-name')!, {
      target: { value: 'Maria' },
    });
    fireEvent.change(container.querySelector('#hk-age')!, {
      target: { value: '25' },
    });
    fireEvent.change(container.querySelector('#hk-email')!, {
      target: { value: 'maria@example.com' },
    });
    fireEvent.change(container.querySelector('#hk-gender')!, {
      target: { value: 'female' },
    });

    const countryInput = container.querySelector('#hk-country')!;
    fireEvent.change(countryInput, { target: { value: 'Germany' } });

    fireEvent.change(container.querySelector('#hk-password')!, {
      target: { value: 'Password123!' },
    });
    fireEvent.change(container.querySelector('#hk-confirmPassword')!, {
      target: { value: 'Password123!' },
    });

    const file = new File(['content'], 'avatar.jpg', { type: 'image/jpeg' });
    fireEvent.change(container.querySelector('#hk-image')!, {
      target: { files: [file] },
    });

    fireEvent.click(container.querySelector('#hk-terms')!);

    const submitButton = screen.getByRole('button', {
      name: /Submit \(Hook Form\)/i,
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddSubmission).toHaveBeenCalled();
      expect(handleSuccess).toHaveBeenCalled();
    });
  });

  it('shows validation errors in UncontrolledForm on invalid data', async () => {
    const handleSuccess = vi.fn();
    const { container } = render(
      <UncontrolledForm onSuccess={handleSuccess} />
    );

    fireEvent.change(container.querySelector('#unc-name')!, {
      target: { value: 'maria' },
    });

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByText(/first letter/i)).toBeInTheDocument();
    });

    expect(handleSuccess).not.toHaveBeenCalled();
  });

  it('fails submission when schema validation fails', async () => {
    const handleSuccess = vi.fn();
    const { container } = render(
      <UncontrolledForm onSuccess={handleSuccess} />
    );

    const originalFormData = window.FormData;

    window.FormData = class MockFormData {
      append = vi.fn();
      delete = vi.fn();
      get(key: string) {
        return {
          name: 'maria',
          age: '25',
          email: 'maria@example.com',
          gender: 'female',
          country: 'Germany',
          password: 'Password123!',
          confirmPassword: 'Password123!',
          terms: 'on',
          imageFile: new File(['a'], 'a.png', { type: 'image/png' }),
        }[key];
      }
      getAll = vi.fn();
      has = vi.fn();
      set = vi.fn();
      forEach = vi.fn();
    } as unknown as typeof FormData;

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(handleSuccess).not.toHaveBeenCalled();
    });

    window.FormData = originalFormData;
  });

  it('fails when image validation fails', async () => {
    const handleSuccess = vi.fn();
    const { container } = render(
      <UncontrolledForm onSuccess={handleSuccess} />
    );

    const originalFormData = window.FormData;

    window.FormData = class MockFormData {
      get() {
        return new File(['x'], 'file.txt', { type: 'text/plain' });
      }
    } as unknown as typeof FormData;

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(handleSuccess).not.toHaveBeenCalled();
    });

    window.FormData = originalFormData;
  });
});
