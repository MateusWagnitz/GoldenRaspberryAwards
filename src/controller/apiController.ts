import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';

const BASE_URL = 'https://tools.outsera.com/backend-java/api';

export const fetchYearsWithMultipleWinners = (): Observable<any> => {
  return ajax.getJSON(`${BASE_URL}/movies?projection=years-with-multiple-winners`);
};

export const fetchTopStudiosWithWinners = (): Observable<any> => {
  return ajax.getJSON(`${BASE_URL}/movies?projection=studios-with-win-count`);
};

export const fetchProducersWithWinIntervals = (): Observable<any> => {
  return ajax.getJSON(`${BASE_URL}/movies?projection=max-min-win-interval-for-producers`);
};

export const fetchMoviesByYear = (year: string): Observable<any> => {
  return ajax.getJSON(`${BASE_URL}/movies?winner=true&year=${year}`);
};

export const fetchMoviesList = (
  page: number,
  size: number,
  year?: string,
  winner?: string
): Observable<any> => {
  let url = `${BASE_URL}/movies?page=${page}&size=${size}`;
  if (year) {
    url += `&year=${year}`;
  }
  if (winner) {
    url += `&winner=${winner}`;
  }
  return ajax.getJSON(url);
};
