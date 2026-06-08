import '@testing-library/jest-dom';
import { vi } from 'vitest';

if (typeof window !== 'undefined') {
  window.URL.createObjectURL = vi.fn(() => 'mock-url');
}
