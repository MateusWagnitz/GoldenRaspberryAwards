import { of } from 'rxjs';
import { getMoviesList } from '../movieListService';
import * as apiController from '../../controller/apiController';
import { MoviesData } from '../../models/models';

jest.mock('../../controller/apiController');

describe('movieListService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getMoviesList should return movies list data', (done) => {
    const mockData: MoviesData = {
      content: [
        { id: 1, year: 2000, title: 'Movie A', studios: [], producers: [], winner: true },
        { id: 2, year: 2001, title: 'Movie B', studios: [], producers: [], winner: false },
      ],
      totalPages: 5,
      number: 0,
    };
    (apiController.fetchMoviesList as jest.Mock).mockReturnValue(of(mockData));

    getMoviesList(0, 15).subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
  });
});