import { valueToPercent } from "@mui/base";
import { flow, makeAutoObservable, toJS } from "mobx";
import { IMovie } from "../models/IMovie";
import MainService from "../service/MainService";

class MainStore {
  movies: IMovie[] = [];
  selectedMovie: IMovie = null;
  isMovieDialogOpen: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      loadMovies: flow,
      getMovieById: flow,
    });

    this.loadMovies();
  }

  *loadMovies(): any {
    this.isLoading = true;
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
    this.isLoading = false;
  }

  *getMovieById(movieId: string): any {
    this.isLoading = true;
    const data = yield MainService.getMovieById(movieId);
    if (data) {
      this.selectedMovie = {
        ...data,
        id: data._id,
      };
    }

    console.log("getMovieById", toJS(this.selectedMovie));
    this.isLoading = false;
  }

  *save() {
    this.isLoading = true;
    yield MainService.addMovie(this.selectedMovie);
    this.loadMovies();
    this.closeMovieDialog();
    this.isLoading = false;
  }

  *delete() {
    this.isLoading = true;
    yield MainService.deleteMovie(this.selectedMovie.id);
    this.closeMovieDialog();
    this.loadMovies();
    this.isLoading = false;
  }

  updateFieldByKey(key: keyof IMovie, value: any) {
    this.selectedMovie = {
      ...this.selectedMovie,
      [key]: value,
    };
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
