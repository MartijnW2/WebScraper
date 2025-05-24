import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('Check if all required elements are in the document', () => {
  it('renders filter and sort dropdowns, loading text, and export button', () => {
    render(<App />);

    expect(screen.getByLabelText(/Filter:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();

    expect(screen.getByRole('option', { name: /More than 5 words/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /5 or fewer words/i })).toBeInTheDocument();

    expect(screen.getByRole('option', { name: /Comments/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Score/i })).toBeInTheDocument();

    expect(screen.getByText(/Loading headlines.../i)).toBeInTheDocument();

    expect(screen.getByTestId('export-usage-button')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export Usage Data/i })).toBeInTheDocument();
  });
});
