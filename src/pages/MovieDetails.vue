<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "../store/movies";
import { storeToRefs } from "pinia";
import { Spin, Card } from "ant-design-vue";

const route = useRoute();
const movieStore = useMovieStore();
const { movieDetails } = storeToRefs(movieStore);

onMounted(async () => {
  await movieStore.fetchMovieDetails(Number(route.params.id));
});
</script>

<template>
  <div class="movie-details" v-if="movieDetails">
    <Card :title="movieDetails.title" class="movie-card">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path"
        alt="Movie Poster"
        class="poster"
      />
      <p><strong>Release Date: </strong>{{ movieDetails.release_date }}</p>
      <p><strong>Rating: </strong>{{ movieDetails.vote_average }}</p>
      <p><strong>Overview: </strong>{{ movieDetails.overview }}</p>
    </Card>
  </div>
  <Spin v-else size="large"></Spin>
</template>

<style scoped>
.movie-details {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.movie-card {
  width: 500px;
  text-align: center;
}
.poster {
  width: 100%;
  border-radius: 10px;
}
</style>
