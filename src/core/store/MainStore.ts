import { flow, makeAutoObservable, toJS } from "mobx";
import { IMovie } from "../models/IMovie";
import MainService from "../service/MainService";

class MainStore {
  movies: IMovie[] = [];
  selectedMovie: IMovie = null;
  isMovieDialogOpen: boolean = false;
  isLoading: boolean = false;
  validationErrors: string[] = [];
  filterByaAgeLimit: number = null;

  constructor() {
    makeAutoObservable(this, {
      loadMovies: flow,
      getMovieById: flow,
    });

    this.loadMovies();
  }

  /**
   * Load movies from crudcrud
   * MaterialUI DataGrid need the "id" -> add to every element
   */
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
    }
    this.isLoading = false;
  }

  get getMovies() {
    if (this.filterByaAgeLimit) {
      return this.movies.filter(
        (movie) => movie.ageLimit && movie.ageLimit === this.filterByaAgeLimit
      );
    }
    return this.movies;
  }

  /**
   * get movie by id from crudcrud
   * @param movieId
   */
  *getMovieById(movieId: string): any {
    this.isLoading = true;
    const data = yield MainService.getMovieById(movieId);
    if (data) {
      this.selectedMovie = {
        ...data,
        id: data._id,
      };
    }

    this.isLoading = false;
  }

  /**
   * Save movie Add and Edit
   * Before dave we have to validate the fields
   * If the item has id, we will use PUT
   * If the item is new, we have to use POST
   */
  *save() {
    this.validateForm();
    if (this.validationErrors?.length === 0) {
      this.isLoading = true;
      if (this.selectedMovie.id) {
        const movieToUpdate: Partial<IMovie> = {
          title: this.selectedMovie.title,
          ageLimit: this.selectedMovie.ageLimit,
          overview: this.selectedMovie.overview,
        };

        yield MainService.editMovie(movieToUpdate, this.selectedMovie.id);
      } else {
        yield MainService.addMovie(this.selectedMovie);
      }

      this.loadMovies();
      this.closeMovieDialog();
      this.isLoading = false;
    }
  }

  validateForm() {
    this.validationErrors = [];
    if (!this.selectedMovie.title || this.selectedMovie.title.trim() === "") {
      this.validationErrors.push('"Movie title" is required');
    }

    if (!this.selectedMovie.ageLimit) {
      this.validationErrors.push('"Age limit" is required');
    }

    if (!this.isAgeLimitValid) {
      this.validationErrors.push(
        '"Age limit" entry is wrong. Age limit must be greater than 0'
      );
    }
  }

  /**
   * delete movie from the list
   */
  *delete() {
    this.isLoading = true;
    yield MainService.deleteMovie(this.selectedMovie.id);
    this.closeMovieDialog();
    this.loadMovies();
    this.isLoading = false;
  }

  setFilter(value: any) {
    this.filterByaAgeLimit = value;
  }

  /**
   * validate the age limit
   */
  get isAgeLimitValid() {
    return (
      this.selectedMovie &&
      this.selectedMovie.ageLimit &&
      this.selectedMovie.ageLimit > 0
    );
  }

  /**
   * Update selected movie field by Key
   * @param key keyof Movie
   * @param value new value
   */
  updateFieldByKey(key: keyof IMovie, value: any) {
    this.selectedMovie = {
      ...this.selectedMovie,
      [key]: value,
    };
  }

  /**
   * open dialog, if movie has the id we have to use the getById function
   * if there is no id we create a new item that we can modify in the dialog
   * @param movieId
   */
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

  /**
   * close dialog
   */
  closeMovieDialog() {
    this.isMovieDialogOpen = false;
    this.selectedMovie = null;
  }
}
export default MainStore;
