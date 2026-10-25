import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';
import App from '../../App';

describe('Geriatric Care Assessment Form', () => {
  it('loads the sample patient and submits validated assessment data', async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /load sample patient/i }));

    fireEvent.click(screen.getByRole('button', { name: /save assessment/i }));

    expect(
      await screen.findByText('Assessment saved successfully', {
        exact: false,
      })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/MRN-004821/)).toBeInTheDocument();
      expect(screen.getByText(/Sushila Deshpande/)).toBeInTheDocument();
    });
  });
});
