import { IMovie } from "../models/IMovie";

const API_URL = "https://crudcrud.com/api/eaed7c4f29544051b61dd69ea6d729bb";
class MainService {
  async getMovies(): Promise<IMovie[]> {
    const response = await fetch(`${API_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("getMovies", response);

    return response.json();
  }

  async getMovieById(movieId: string): Promise<IMovie> {
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("getMovieById", response);

    return response.json();
  }

  async addMovie(movie: IMovie): Promise<any> {
    const response = await fetch(`${API_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    return response.json();
  }

  async deleteMovie(movieId: string): Promise<any> {
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }
}
export default new MainService();
