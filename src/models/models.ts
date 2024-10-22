export type YearWinner = {
    year: number;
    winnerCount: number;
  };
  
  export type StudioWin = {
    name: string;
    winCount: number;
  };
  
  export type ProducerInterval = {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  };
  
  export type Movie = {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
  };
  
  export type MoviesData = {
    content: Movie[];
    totalPages: number;
    number: number;
  };