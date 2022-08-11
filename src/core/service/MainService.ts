import { IMovie } from "../models/IMovie";

const API_URL = `https://crudcrud.com/api/${process.env.REACT_APP_API_KEY}`;
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

  async editMovie(movie: Partial<IMovie>, movieId: string) {
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
  }

  async deleteMovie(movieId: string): Promise<any> {
    await fetch(`${API_URL}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export default new MainService();
