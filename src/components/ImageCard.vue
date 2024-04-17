<!--Sixte Morio-->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const images = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('https://esd.atontour.org/v1/prompt');
    images.value = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des images :', error);
  }
});
</script>

<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="d-flex flex-column align-items-center mb-4">
      <img src="../assets/logo.png" alt="Logo">
      <h1 class="mt-2">Les dernières Images</h1>
    </div>
  </div>
  <div class="container">
    <div class="row g-4">
      <div v-for="imageItem in  images " :key="imageItem.id_prompt" class="col-lg-3 col-md-4 col-sm-6 col-12">
        <router-link :to="{ path: '/single/' + imageItem.id_prompt }" class="card-link">
          <div class="card h-100">
            <img :src="imageItem.img" class="img-fluid w-100" :alt="imageItem.title">
            <div class="card-body">
              <h2 class="h5 card-title">{{ imageItem.title }}</h2>
              <p class="card-text">{{ imageItem.prompt }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.card-link {
  text-decoration: none;
  color: black;
  transition: filter 0.3s ease-in-out;
}

.card-link:hover {
  filter: brightness(70%)
}
</style>