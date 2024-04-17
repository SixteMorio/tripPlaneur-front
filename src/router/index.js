/*Sixte Morio*/
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import newTripResponse from '../pages/newTripResponse.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/trip', component: newTripResponse },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
