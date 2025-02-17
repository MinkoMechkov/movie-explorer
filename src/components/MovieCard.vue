<script setup lang="ts">
import { defineProps } from "vue";
import type { Movie } from "../types/movie";
import { useRouter } from "vue-router";
import { useMovieStore } from "../store/movies";
import { HeartOutlined, HeartFilled } from "@ant-design/icons-vue";
import { Card, Button } from "ant-design-vue";

const props = defineProps<{ movie: Movie }>();
const router = useRouter();
const movieStore = useMovieStore();

const goToDetails = () => {
  router.push({ name: "MovieDetails", params: { id: props.movie.id } });
};
</script>

<template>
  <Card hoverable class="movie-card">
    <template #cover>
      <img
        :src="
          movie.poster_path
            ? movie.poster_path
            : 'https://via.placeholder.com/200x300'
        "
        alt="Movie Poster"
        class="movie-image"
      />
    </template>

    <template #actions>
      <span @click="movieStore.toggleFavourite(movie)">
        <HeartFilled v-if="movieStore.isFavourite(movie.id)" class="fav-icon" />
        <HeartOutlined v-else class="fav-icon" />
      </span>
      <Button type="primary" @click="goToDetails">Details</Button>
    </template>

    <Card.Meta :title="movie.title" />
  </Card>
</template>

<style scoped>
.movie-card {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.movie-card:hover .movie-image {
  transform: scale(1.05);
}

.movie-image {
  transition: transform 0.3s ease-in-out;
  width: 100%;
}

.fav-icon {
  font-size: 20px;
  cursor: pointer;
  color: red;
}
</style>
