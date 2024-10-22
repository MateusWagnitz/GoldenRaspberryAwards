import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MoviesList from '../MoviesList';
import * as movieListService from '../../services/movieListService';
import { of } from 'rxjs';

jest.mock('../../services/movieListService');

describe('MoviesList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders movies list', async () => {
    const mockMoviesData = {
      content: [
        { id: 1, year: 2000, title: 'Movie A', studios: [], producers: [], winner: true },
        { id: 2, year: 2001, title: 'Movie B', studios: [], producers: [], winner: false },
      ],
      totalPages: 1,
      number: 0,
    };
    (movieListService.getMoviesList as jest.Mock).mockReturnValue(of(mockMoviesData));

    render(<MoviesList />);

    expect(screen.getByText(/List movies/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Movie A')).toBeInTheDocument();
      expect(screen.getByText('Movie B')).toBeInTheDocument();
    });
  });

  test('filters movies by year', async () => {
    const mockMoviesData = {
      content: [
        { id: 1, year: 2000, title: 'Movie A', studios: [], producers: [], winner: true },
      ],
      totalPages: 1,
      number: 0,
    };
    (movieListService.getMoviesList as jest.Mock).mockReturnValue(of(mockMoviesData));

    render(<MoviesList />);

    const yearInput = screen.getByPlaceholderText('Filter by year');

    fireEvent.change(yearInput, { target: { value: '2000' } });

    await waitFor(() => {
      expect(screen.getByText('Movie A')).toBeInTheDocument();
    });
  });
});
