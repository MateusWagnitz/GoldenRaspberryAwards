import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';
import * as dashboardService from '../../services/dashboardService';
import { of } from 'rxjs';

jest.mock('../../services/dashboardService');

describe('Dashboard component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders years with multiple winners', async () => {
    const mockYears = [{ year: 2000, winnerCount: 2 }];
    (dashboardService.getYearsWithMultipleWinners as jest.Mock).mockReturnValue(of(mockYears));
    (dashboardService.getTopStudiosWithWinners as jest.Mock).mockReturnValue(of([]));
    (dashboardService.getProducersWithWinIntervals as jest.Mock).mockReturnValue(of({ max: [], min: [] }));

    render(<Dashboard />);

    expect(screen.getByText(/List years with multiple winners/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('2000')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  test('search movies by year', async () => {
    const mockMovies = [{ id: 1, year: 2000, title: 'Movie A', studios: [], producers: [], winner: true }];
    (dashboardService.getYearsWithMultipleWinners as jest.Mock).mockReturnValue(of([]));
    (dashboardService.getTopStudiosWithWinners as jest.Mock).mockReturnValue(of([]));
    (dashboardService.getProducersWithWinIntervals as jest.Mock).mockReturnValue(of({ max: [], min: [] }));
    (dashboardService.getMoviesByYear as jest.Mock).mockReturnValue(of(mockMovies));

    render(<Dashboard />);

    const searchInput = screen.getByPlaceholderText('Search by year');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: '2000' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Movie A')).toBeInTheDocument();
    });
  });
});
