import React, { useEffect, useState } from 'react';
import {
  getMoviesByYear,
  getProducersWithWinIntervals,
  getTopStudiosWithWinners,
  getYearsWithMultipleWinners,
} from '../services/dashboardService';
import { Subscription, of } from 'rxjs';
import { YearWinner, StudioWin, ProducerInterval, Movie } from '../models/models';



const Dashboard: React.FC = () => {
  const [years, setYears] = useState<YearWinner[]>([]);
  const [studios, setStudios] = useState<StudioWin[]>([]);
  const [maxProducers, setMaxProducers] = useState<ProducerInterval[]>([]);
  const [minProducers, setMinProducers] = useState<ProducerInterval[]>([]);
  const [searchYear, setSearchYear] = useState<string>('');
  const [moviesByYear, setMoviesByYear] = useState<Movie[]>([]);
  const [loadingMoviesByYear, setLoadingMoviesByYear] = useState<boolean>(false);
  const [errorMoviesByYear, setErrorMoviesByYear] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  useEffect(() => {
    const subscriptions: Subscription[] = [];

    const yearsSub = getYearsWithMultipleWinners().subscribe({
      next: (data) => setYears(data),
      error: (err) => console.error('Error fetching years with multiple winners:', err),
    });
    subscriptions.push(yearsSub);

    const studiosSub = getTopStudiosWithWinners().subscribe({
      next: (data) => setStudios(data),
      error: (err) => console.error('Error fetching studios with winners:', err),
    });
    subscriptions.push(studiosSub);

    const producersSub = getProducersWithWinIntervals().subscribe({
      next: (data) => {
        setMaxProducers(data.max);
        setMinProducers(data.min);
      },
      error: (err) => console.error('Error fetching producers:', err),
    });
    subscriptions.push(producersSub);

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, []);

  const handleSearch = () => {
    setLoadingMoviesByYear(true);
    setErrorMoviesByYear(null);
    setSearchPerformed(true);

    const moviesSub = getMoviesByYear(searchYear).subscribe({
      next: (data) => {
        setMoviesByYear(data);
        setLoadingMoviesByYear(false);
      },
      error: (err) => {
        console.error('Error fetching movies by year:', err);
        setErrorMoviesByYear('Error fetching movies.');
        setLoadingMoviesByYear(false);
      },
    });

    return () => {
      moviesSub.unsubscribe();
    };
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-800 p-4">
        <h2 className="text-xl mb-4">List years with multiple winners</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Year</th>
              <th className="text-right">Win Count</th>
            </tr>
          </thead>
          <tbody>
            {years.map((yearItem) => (
              <tr key={yearItem.year}>
                <td className="text-left">{yearItem.year}</td>
                <td className="text-right">{yearItem.winnerCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 p-4">
        <h2 className="text-xl mb-4">Top 3 studios with winners</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-right">Win Count</th>
            </tr>
          </thead>
          <tbody>
            {studios.map((studio) => (
              <tr key={studio.name}>
                <td className="text-left">{studio.name}</td>
                <td className="text-right">{studio.winCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 p-4 col-span-2">
        <h2 className="text-xl mb-4">
          Producers with longest and shortest interval between wins
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg mb-2">Maximum</h3>
            {maxProducers.map((producer) => (
              <div key={producer.producer} className="mb-2">
                <p>Producer: {producer.producer}</p>
                <p>Interval: {producer.interval}</p>
                <p>Previous Win: {producer.previousWin}</p>
                <p>Following Win: {producer.followingWin}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg mb-2">Minimum</h3>
            {minProducers.map((producer) => (
              <div key={producer.producer} className="mb-2">
                <p>Producer: {producer.producer}</p>
                <p>Interval: {producer.interval}</p>
                <p>Previous Win: {producer.previousWin}</p>
                <p>Following Win: {producer.followingWin}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 col-span-2">
        <h2 className="text-xl mb-4">List movie winners by year</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by year"
            className="w-full p-2 bg-gray-700 text-white"
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="mt-2 p-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Search
          </button>
        </div>
        {loadingMoviesByYear ? (
          <p>Loading...</p>
        ) : errorMoviesByYear ? (
          <p>{errorMoviesByYear}</p>
        ) : moviesByYear.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Id</th>
                <th className="text-center">Year</th>
                <th className="text-right">Title</th>
              </tr>
            </thead>
            <tbody>
              {moviesByYear.map((movie) => (
                <tr key={movie.id}>
                  <td className="text-left">{movie.id}</td>
                  <td className="text-center">{movie.year}</td>
                  <td className="text-right">{movie.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          searchPerformed && !loadingMoviesByYear && (
            <p>No movies found for the year</p>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
