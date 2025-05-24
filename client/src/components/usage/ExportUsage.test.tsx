import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportUsageButton from './ExportUsage';

describe('ExportUsageButton', () => {
  const originalFetch = global.fetch;
  const originalAlert = window.alert;
  const originalError = console.error;

  beforeEach(() => {
    global.fetch = vi.fn();
    window.alert = vi.fn();
    console.error = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.alert = originalAlert;
    console.error = originalError;
    vi.restoreAllMocks();
  });

  it('renders the export button', () => {
  render(<ExportUsageButton />);
  expect(screen.getByTestId('export-usage-button')).toBeInTheDocument();
  expect(screen.getByText(/Export Usage Data/i)).toBeInTheDocument();
  });

    it('shows alert and logs error if response is not ok', async () => {
    const mockFetchResponse: Partial<Response> = {
        ok: false,
    };

    global.fetch = vi.fn().mockResolvedValueOnce(mockFetchResponse as Response);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ExportUsageButton />);
    fireEvent.click(screen.getByTestId('export-usage-button'));

    await Promise.resolve();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error exporting usage data:'),
        expect.any(Error)
    );
    expect(alertSpy).toHaveBeenCalledWith('Failed to export usage data.');

    consoleErrorSpy.mockRestore();
    alertSpy.mockRestore();
    });

   it('downloads the file when fetch is successful', async () => {
    const blob = new Blob(['test content'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const fakeUrl : string = 'blob:http://localhost/fake-url';

    const createObjectURL = vi.fn(() => fakeUrl);
    const revokeObjectURL = vi.fn();

    global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        blob: () => Promise.resolve(blob),
    });
    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;

    const anchor = document.createElement('a');
    const clickSpy = vi.spyOn(anchor, 'click');

    const originalCreateElement = document.createElement;
    document.createElement = vi.fn().mockImplementation((tagName) => {
        if (tagName === 'a') return anchor;
        return originalCreateElement.call(document, tagName);
    });

    render(<ExportUsageButton />);
    fireEvent.click(screen.getByTestId('export-usage-button'));
    await Promise.resolve(); // fetch
    await Promise.resolve(); // blob

    expect(createObjectURL).toHaveBeenCalledWith(blob);
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith(fakeUrl);

    document.createElement = originalCreateElement;
    });
});
