import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './components/home';

test('renders login link', () => {
  render(<Home />)
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
