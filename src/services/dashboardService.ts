import {
    fetchYearsWithMultipleWinners,
    fetchTopStudiosWithWinners,
    fetchProducersWithWinIntervals,
    fetchMoviesByYear,
  } from '../controller/apiController';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, ProducerInterval, StudioWin, YearWinner } from '../models/models';
  
  export const getYearsWithMultipleWinners = (): Observable<YearWinner[]> => {
    return fetchYearsWithMultipleWinners().pipe(
      map((data) => data.years)
    );
  };
  
  export const getTopStudiosWithWinners = (): Observable<StudioWin[]> => {
    return fetchTopStudiosWithWinners().pipe(
      map((data) => data.studios.sort((a: StudioWin, b: StudioWin) => b.winCount - a.winCount).slice(0, 3))
    );
  };
  
  export const getProducersWithWinIntervals = (): Observable<{
    max: ProducerInterval[];
    min: ProducerInterval[];
  }> => {
    return fetchProducersWithWinIntervals().pipe(
      map((data) => ({
        max: data.max,
        min: data.min,
      }))
    );
  };
  
  export const getMoviesByYear = (year: string): Observable<Movie[]> => {
    return fetchMoviesByYear(year).pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data;
        } else if (data.id) {
          return [data];
        } else {
          return [];
        }
      })
    );
  };
  