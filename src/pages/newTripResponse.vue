<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';

// Référence à la carte Leaflet
const map = ref(null);

// Données de l'itinéraire
const itinerary = ref([
  {
    name: 'Gotham City',
    km: 0,
    desc: 'Départ de Gotham City, préparation et vérification de la batmobile.',
    latlng: [40.7128, -74.0060] // Exemple de coordonnées pour Gotham City
  },
  // Ajoutez les autres étapes ici
]);

// Fonction pour initialiser la carte Leaflet
const initMap = () => {
  map.value = L.map('map').setView([40.7128, -74.0060], 10); // Centre la carte sur Gotham City avec un zoom de 10
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value); // Ajoute une couche de tuiles OpenStreetMap

  // Ajoute les marqueurs pour chaque étape de l'itinéraire
  itinerary.value.forEach(step => {
    L.marker(step.latlng).addTo(map.value).bindPopup(step.name);
  });
};

// Appel de la fonction d'initialisation de la carte lors du montage du composant
onMounted(() => {
  initMap();
});
</script>

<style>
/* Assurez-vous d'importer les styles CSS de Leaflet dans votre projet */
</style>

<template>
  <div>
    <!-- Carte Leaflet -->
    <div ref="map" style="height: 400px;"></div>

    <!-- Liste des étapes de l'itinéraire -->
    <h2>Itinéraire</h2>
    <ul>
      <li v-for="(step, index) in itinerary" :key="index">
        <h3>{{ `Étape ${index + 1}: ${step.name}` }}</h3>
        <p>{{ `Description: ${step.desc}` }}</p>
        <p>{{ `Kilomètres: ${step.km}` }}</p>
      </li>
    </ul>
  </div>
</template>
