<script setup lang="ts">
import { useMovieStore } from "../store/movies";
import { storeToRefs } from "pinia";
import MovieCard from "../components/MovieCard.vue";
import CategoryFilter from "../components/CategoryFilter.vue";
import TrendingMovies from "../components/TrendingMovies.vue";

const movieStore = useMovieStore();
const { filteredMovies } = storeToRefs(movieStore);
</script>

<template>
  <TrendingMovies />
  <CategoryFilter style="margin-bottom: 1rem" />
  <a-row
    :gutter="[16, 16]"
    justify="center"
  >
    <a-col
      v-for="movie in filteredMovies"
      :key="movie.id"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
    >
      <MovieCard :movie="movie" />
    </a-col>
  </a-row>
</template>
