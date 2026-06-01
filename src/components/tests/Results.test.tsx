import { render, screen } from '@testing-library/react';
import Results from '../Results';

describe('Results Component', () => {
  it('shows loader when isLoading is true', () => {
    render(<Results results={[]} isLoading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(<Results results={[]} isLoading={false} error="API Error" />);
    expect(screen.getByText('API Error')).toBeInTheDocument();
  });

  it('renders list of pokemon cards', () => {
    const mockList = [
      { name: 'bulbasaur', description: 'desc1', image: 'img1' },
      { name: 'ivysaur', description: 'desc2', image: 'img2' },
    ];
    render(<Results results={mockList} isLoading={false} error={null} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
