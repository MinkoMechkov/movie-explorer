<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import { useMovieStore } from "../store/movies";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const movieStore = useMovieStore();
const { trendingMovies } = storeToRefs(movieStore);

const trendingType = ref<"day" | "week">("week");

const changeTrendingType = async (type: "day" | "week") => {
  trendingType.value = type;
  await movieStore.fetchTrendingMovies(type);
};

onMounted(async () => {
  await movieStore.fetchTrendingMovies(trendingType.value);
});
</script>

<template>
  <div class="trending-section">
    <h2>Trending:</h2>
    <div class="trending-buttons">
      <button
        :class="{ active: trendingType === 'day' }"
        @click="changeTrendingType('day')"
      >
        Today
      </button>
      <button
        :class="{ active: trendingType === 'week' }"
        @click="changeTrendingType('week')"
      >
        Week
      </button>
    </div>

    <Swiper
      :slides-per-view="1"
      :space-between="18"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :modules="[Autoplay]"
      :breakpoints="{
        360: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 18,
        },
      }"
      class="trending-slider"
    >
      <SwiperSlide
        v-for="movie in trendingMovies"
        :key="movie.id"
      >
        <router-link
          :to="`/movie/${movie.id}`"
          class="movie-slide"
        >
          <img
            :src="movie.backdrop_path"
            :alt="movie.title"
            class="backdrop"
          />
          <div class="overlay">
            <h3>{{ movie.title }}</h3>
          </div>
        </router-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.trending-section {
  text-align: center;
  padding: 20px;
}

.trending-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.trending-buttons button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background: #ccc;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s;
}

.trending-buttons button.active {
  background: #007bff;
  color: white;
}

.trending-slider {
  width: 100%;
  max-width: 800px;
  margin: auto;
}

.movie-slide {
  display: block;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  text-decoration: none;
  color: inherit;
}

.movie-slide:hover {
  transform: scale(1.05);
}

.backdrop {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
