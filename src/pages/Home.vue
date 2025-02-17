<script setup lang="ts">
import { onMounted } from "vue";
import { useMovieStore } from "../store/movies";
import MovieCard from "../components/MovieCard.vue";

const movieStore = useMovieStore();

onMounted(() => {
  movieStore.fetchTrendingMovies();
});
</script>

<template>
  <a-row :gutter="[16, 16]" justify="center">
    <a-col
      v-for="movie in movieStore.trendingMovies"
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
