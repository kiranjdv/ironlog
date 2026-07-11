import { render, screen } from '@testing-library/react';
import App from './App';

test('renders IRONLOG logo', () => {
  render(<App />);
  const linkElement = screen.getByText(/IRONLOG/i);
  expect(linkElement).toBeInTheDocument();
});
