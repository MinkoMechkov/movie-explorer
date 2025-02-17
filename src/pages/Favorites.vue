<script setup lang="ts">
import { useMovieStore } from "../store/movies";
import MovieCard from "../components/MovieCard.vue";

const movieStore = useMovieStore();
</script>

<template>
  <div class="favorites-page">
    <h1>Favorites</h1>
    <div v-if="movieStore.favorites.length > 0" class="movies-grid">
      <a-row :gutter="[16, 16]" justify="center">
        <a-col
          v-for="movie in movieStore.favorites"
          :key="movie.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <MovieCard :movie="movie" />
        </a-col>
      </a-row>
    </div>
    <p v-else>No favorite movies yet.</p>
  </div>
</template>

<style scoped>
.favorites-page {
  text-align: center;
}
</style>
