<script setup lang="ts">
import { onMounted } from "vue";
import { Select } from "ant-design-vue";
import { useMovieStore } from "../store/movies";
import { storeToRefs } from "pinia";

const movieStore = useMovieStore();
const { genres, selectedGenre } = storeToRefs(movieStore);

onMounted(() => {
  movieStore.fetchGenres();
});
</script>

<template>
  <div class="category-filter">
    <Select
      v-model:value="selectedGenre"
      mode="multiple"
      placeholder="Select genres"
      style="width: 100%"
      allowClear
    >
      <Select.Option
        v-for="genre in genres"
        :key="genre.id"
        :value="genre.id"
      >
        {{ genre.name }}
      </Select.Option>
    </Select>
  </div>
</template>
