import { fetchMoviesList } from '../controller/apiController';
import { Observable } from 'rxjs';
import { MoviesData } from '../models/models';

export const getMoviesList = (
  page: number,
  size: number,
  year?: string,
  winner?: string
): Observable<MoviesData> => {
  return fetchMoviesList(page, size, year, winner);
};
