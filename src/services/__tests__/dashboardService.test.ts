import { of } from 'rxjs';
import { getYearsWithMultipleWinners, getTopStudiosWithWinners, getProducersWithWinIntervals, getMoviesByYear } from '../dashboardService';
import * as apiController from '../../controller/apiController';

jest.mock('../../controller/apiController');

describe('dashboardService', () => {
    const mockedApiController = jest.mocked(apiController, { shallow: false });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getYearsWithMultipleWinners should return years data', (done) => {
    const mockData = { years: [{ year: 2000, winnerCount: 2 }] };
    mockedApiController.fetchYearsWithMultipleWinners.mockReturnValue(of(mockData));

    getYearsWithMultipleWinners().subscribe((data) => {
      expect(data).toEqual(mockData.years);
      done();
    });
  });

  test('getTopStudiosWithWinners should return top studios data', (done) => {
    const mockData = {
      studios: [
        { name: 'Studio A', winCount: 5 },
        { name: 'Studio B', winCount: 3 },
        { name: 'Studio C', winCount: 7 },
        { name: 'Studio D', winCount: 2 },
      ],
    };
    mockedApiController.fetchTopStudiosWithWinners.mockReturnValue(of(mockData));

    getTopStudiosWithWinners().subscribe((data) => {
      expect(data).toEqual([
        { name: 'Studio C', winCount: 7 },
        { name: 'Studio A', winCount: 5 },
        { name: 'Studio B', winCount: 3 },
      ]);
      done();
    });
  });

  test('getProducersWithWinIntervals should return producers data', (done) => {
    const mockData = {
      max: [{ producer: 'Producer A', interval: 10, previousWin: 1990, followingWin: 2000 }],
      min: [{ producer: 'Producer B', interval: 1, previousWin: 2000, followingWin: 2001 }],
    };
    mockedApiController.fetchProducersWithWinIntervals.mockReturnValue(of(mockData));

    getProducersWithWinIntervals().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
  });

  test('getMoviesByYear should return movies data', (done) => {
    const mockData = [{ id: 1, year: 2000, title: 'Movie A', studios: [], producers: [], winner: true }];
    mockedApiController.fetchMoviesByYear.mockReturnValue(of(mockData));

    getMoviesByYear('2000').subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
  });
});
