import React, { useEffect, useState } from 'react';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { getMoviesList } from '../services/movieListService';
import { MoviesData } from '../models/models';


const MoviesList: React.FC = () => {
  const [moviesData, setMoviesData] = useState<MoviesData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(0);
  const [yearFilter, setYearFilter] = useState<string>('');
  const [winnerFilter, setWinnerFilter] = useState<string>('');

  const pageSize = 15;

  const [yearFilterSubject] = useState(new Subject<string>());
  const [yearFilterInput, setYearFilterInput] = useState<string>('');

  useEffect(() => {
    const subscription = yearFilterSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value.length >= 3 || value === '') {
          setYearFilter(value);
          setPage(0);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const moviesSub = getMoviesList(page, pageSize, yearFilter, winnerFilter).subscribe({
      next: (data) => {
        setMoviesData(data);
        setLoading(false);
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        setError('Error fetching movies.');
        setLoading(false);
      },
    });

    return () => {
      moviesSub.unsubscribe();
    };
  }, [page, yearFilter, winnerFilter]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setYearFilterInput(value);
    yearFilterSubject.next(value);
  };

  const handleWinnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWinnerFilter(e.target.value);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = moviesData ? moviesData.totalPages : 0;

  return (
    <div>
      <h2 className="text-2xl mb-4">List movies</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Filter by year"
          className="p-2 bg-gray-700 text-white mr-2"
          value={yearFilterInput}
          onChange={handleYearChange}
        />
        <select
          className="p-2 bg-gray-700 text-white"
          value={winnerFilter}
          onChange={handleWinnerChange}
        >
          <option value="">Winner?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : moviesData && moviesData.content.length > 0 ? (
        <>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Year</th>
                <th className="text-center">Title</th>
                <th className="text-right">Winner?</th>
              </tr>
            </thead>
            <tbody>
              {moviesData.content.map((movie) => (
                <tr key={movie.id}>
                  <td className="text-left">{movie.id}</td>
                  <td className="text-left">{movie.year}</td>
                  <td className="text-center">{movie.title}</td>
                  <td className="text-right">{movie.winner ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(0)}
              disabled={page === 0}
              className="p-2 bg-gray-700 text-white mx-1"
            >
              {'<<'}
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`p-2 mx-1 ${
                  page === index ? 'bg-blue-500' : 'bg-gray-700'
                } text-white`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={page === totalPages - 1}
              className="p-2 bg-gray-700 text-white mx-1"
            >
              {'>>'}
            </button>
          </div>
        </>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesList;
