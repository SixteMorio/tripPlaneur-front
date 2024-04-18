import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomeVue.vue';
import newTripResponse from '../pages/TripVue.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/trip/:id', component: newTripResponse },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
