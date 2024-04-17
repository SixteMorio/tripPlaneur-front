<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Router
const route = useRoute();

// Data itinerary
const itinerary = ref([]);

onMounted(async () => {
  console.log(route.params.id);
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  try {
    const id = route.params.id;
    const response = await fetch(`http://127.0.0.1:7001/v1/trip/${id}`);
    const data = await response.json();
    console.log(data)
    itinerary.value = data.resIa;
  } catch (error) {
    console.log(route.params.id)
    //console.error('Erreur lors de la récupération des données de l\'itinéraire :', error);
  }

  // Markers
  itinerary.value.forEach(step => {
    L.marker(step.latlng).addTo(map).bindPopup(step.name);
  });
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  position: relative;
}

#map {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 200px;
  height: 100px;

}
</style>

<template>
  <div>
    <div id="map"></div>

    <router-link to="/">Retour à la page d'accueil</router-link>

    <h2>Itinéraire</h2>
    <ul>
      <li v-for="(step, index) in itinerary" :key="index">
        <h3>{{ `Étape ${step.num}: ${step.name}` }}</h3>
        <p>{{ `Distance: ${step.km !== null ? step.km : 0}Km` }}</p>
        <p>{{ `Description: ${step.desc}` }}</p>
      </li>
    </ul>
  </div>
</template>