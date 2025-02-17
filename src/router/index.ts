import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import MovieDetails from "../pages/MovieDetails.vue";
import Favorites from "../pages/Favorites.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: MovieDetails,
    props: true,
  },
  { path: "/favorites", name: "Favorites", component: Favorites },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
