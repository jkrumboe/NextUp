import { render } from '@testing-library/react-native';
import { MediaCard } from '../MediaCard';

describe('MediaCard', () => {
  const mockItem = {
    id: '1',
    type: 'BOOK' as const,
    title: 'Test Book',
    subtitle: 'Subtitle',
    year: 2024,
    coverUrl: 'https://example.com/cover.jpg',
    averageRating: 8.5,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  };

  it('renders media item correctly', () => {
    const { getByText } = render(<MediaCard item={mockItem} />);
    expect(getByText('Test Book')).toBeTruthy();
    expect(getByText('Subtitle')).toBeTruthy();
  });
});
