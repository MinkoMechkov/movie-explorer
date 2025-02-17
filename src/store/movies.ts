import { defineStore } from "pinia";
import { movieService } from "../services/movieService";
import type { Movie, MovieDetails } from "../types/movie";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    trendingMovies: [] as Movie[],
    searchResult: [] as Movie[],
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]") as Movie[],
    movieDetails: null as MovieDetails | null,
    genres: [] as { id: number; name: string }[],
    selectedGenre: [] as number[],
  }),

  actions: {
    async fetchTrendingMovies(timeframe: "day" | "week" = "week") {
      this.trendingMovies = await movieService.getTrendingMovies(timeframe);
    },

    async searchMovies(query: string) {
      this.searchResult = await movieService.searchMovies(query);
    },

    async fetchMovieDetails(movieId: number) {
      this.movieDetails = await movieService.getMovieDetails(movieId);
    },

    async fetchGenres() {
      this.genres = await movieService.getGenres();
    },

    toggleFavourite(movie: Movie) {
      const index = this.favorites.findIndex((m: Movie) => m.id === movie.id);
      if (index === -1) {
        this.favorites.push(movie);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },

  getters: {
    isFavourite: (state) => (movieId: number) =>
      state.favorites.some((m: Movie) => m.id === movieId),

    filteredMovies(state) {
      if (state.selectedGenre.length === 0) return state.trendingMovies;
      return state.trendingMovies.filter((movie) =>
        movie.genre_ids.some((id) => state.selectedGenre.includes(id))
      );
    },
  },
});
