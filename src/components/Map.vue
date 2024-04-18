<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';

// Router
const route = useRoute();

const props = defineProps({
  locations: {
    name: String,
    latlng: [Number, Number]
  }
})

onMounted(async () => {
  console.log(route.params.id);
  const map = L.map('map').setView([0, 0], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);;


  // Markers
  props.locations.forEach(step => {
    L.marker(step.latlng).addTo(map).bindPopup(step.name);
  });

  //Group Marker
  const group = new L.featureGroup(props.location);
  map.fitBounds(group.getBounds());
})
</script>

<style scoped>
#map {
  width: 100%;
  height: 40svh;
}
</style>

<template>
  <div>
    <div id="map"></div>
  </div>
</template>