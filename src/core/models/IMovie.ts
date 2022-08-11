export interface IMovie {
  id: string;
  title: string;
  overview: string;
  score: string;
  releaseDate: string | Date;
  genres: IGenre[];
  ageLimit: number;
  //   cast: ICast[];
  //   crew: ICrew[];
}

export interface IGenre {
  name: string;
}
