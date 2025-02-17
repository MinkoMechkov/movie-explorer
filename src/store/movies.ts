import { defineStore } from "pinia";
import { movieService } from "../services/movieService";
import type { Movie, MovieDetails } from "../types/movie";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    trendingMovies: [] as Movie[],
    searchResult: [] as Movie[],
    favorites: [] as Movie[],
    movieDetails: null as MovieDetails | null,
  }),

  actions: {
    async fetchTrendingMovies() {
      this.trendingMovies = await movieService.getTrendingMovies();
    },
    toggleFavourite(movie: Movie) {
      const index = this.favorites.findIndex((m: Movie) => m.id === movie.id);
      if (index === -1) {
        this.favorites.push(movie);
      } else {
        this.favorites.splice(index, 1);
      }
    },
    async searcMovies(query: string) {
      this.searchResult = await movieService.searchMovies(query);
    },
    async fetchMovieDetails(movieId: number) {
      this.movieDetails = await movieService.getMovieDetails(movieId);
    },
  },

  getters: {
    isFavourite: (state) => (movieId: number) =>
      state.favorites.some((m: Movie) => m.id === movieId),
  },
});
