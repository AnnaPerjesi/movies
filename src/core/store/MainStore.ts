import { flow, makeAutoObservable, toJS } from "mobx";
import { IMovie } from "../models/IMovie";
import MainService from "../service/MainService";

class MainStore {
  movies: IMovie[] = [];
  selectedMovie: IMovie = null;
  isMovieDialogOpen: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      loadMovies: flow,
      getMovieById: flow,
    });

    this.loadMovies();
  }

  *loadMovies(): any {
    const data = yield MainService.getMovies();
    if (data) {
      this.movies = data.map((movie: any) => {
        return {
          ...movie,
          id: movie._id,
        };
      });
      console.log("loadMovies", toJS(this.movies));
    }
  }

  *getMovieById(movieId: string): any {
    const data = yield MainService.getMovieById(movieId);
    if (data) {
      this.selectedMovie = {
        ...data,
        id: data._id,
      };
    }

    console.log("getMovieById", toJS(this.selectedMovie));
  }

  openMovieDialog(movieId: string) {
    if (movieId) {
      this.getMovieById(movieId);
    } else {
      this.selectedMovie = {
        id: "",
        genres: [],
        overview: null,
        releaseDate: null,
        score: null,
        title: null,
        ageLimit: null,
      };
    }
    this.isMovieDialogOpen = true;
  }

  closeMovieDialog() {
    this.isMovieDialogOpen = false;
    this.selectedMovie = null;
  }
}
export default MainStore;
