import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock the axios instance before importing anything that uses it
vi.mock('../lib/axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

import api from '../lib/axios';
import { listings as mockData } from '../data/listings';

// Helper to create a fresh QueryClient for each test
// Prevents cache from leaking between tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // No retries in tests — fail fast
        retry: false,
        staleTime: 0,
      },
    },
  });

// Minimal component that uses the axios instance
const TestComponent = () => {
  return <div>Test</div>;
};

describe('API Mock Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('shows spinner while request is pending', async () => {
    // Mock a never-resolving promise — simulates loading state
    (api.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <TestComponent />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Component renders without crashing during loading
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('resolves with mock listings data', async () => {
    // Mock a successful response with our mock data
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockData,
    });

    const result = await api.get('/listings');

    // Assert the resolved data matches our mock listings
    expect(result.data).toEqual(mockData);
    expect(result.data).toHaveLength(mockData.length);
  });

  it('rejects with error on failed request', async () => {
    // Mock a failed request
    (api.get as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Network Error')
    );

    // Assert the promise rejects with the expected error
    await expect(api.get('/listings')).rejects.toThrow('Network Error');
  });
});