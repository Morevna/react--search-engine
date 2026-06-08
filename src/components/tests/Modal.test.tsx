import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../ui/Modal';

describe('Modal Component', () => {
  it('renders children when open and handles close action', () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content Content</div>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content Content')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape key press', () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Esc Modal">
        <div>Content</div>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('closes when clicking outside the modal (overlay)', () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Overlay Modal">
        <div>Content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('does not close when clicking inside modal content', () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Modal">
        <div>Inner Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText('Inner Content'));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Hidden">
        <div>Hidden content</div>
      </Modal>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });
});
