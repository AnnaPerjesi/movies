import { IMovie } from "../models/IMovie";

const API_URL = "https://crudcrud.com/api/1ba99db066b84bc3827fca686145ee12";
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
}
export default new MainService();
