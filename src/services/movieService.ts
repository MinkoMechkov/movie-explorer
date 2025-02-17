import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const movieService = {
  async getTrendingMovies() {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY },
    });
    return response.data.results.map((movie: any) => ({
      ...movie,
      poster_path: movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "",
      backdrop_path: movie.backdrop_path
        ? IMAGE_BASE_URL + movie.backdrop_path
        : "",
    }));
  },

  async searchMovies(query: string) {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query },
    });
    return response.data.results;
  },
  async getMovieDetails(movieId: number) {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY, append_to_response: "credits,videos" },
    });
    return response.data;
  },
};
