<script setup>
import L from 'leaflet';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Router
const route = useRoute();



onMounted(async () => {
  console.log(route.params.id);
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  await fetchItinerary();

  // Markers
  itinerary.value.forEach(step => {
    L.marker(step.latlng).addTo(map).bindPopup(step.name);
  });
})
</script>

<style scoped>
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
  </div>
</template>