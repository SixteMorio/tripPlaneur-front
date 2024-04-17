<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Router
const route = useRoute();
const router = useRouter();

// Data itinerary
const itinerary = ref([]);

//Update
const newPrompt = ref('');

// Modal
const showModal = ref(false);

// Function to open the modal
const openModal = () => {
  showModal.value = true;
};

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

const fetchItinerary = async () => {
  try {
    const id = route.params.id;
    const response = await fetch(`http://127.0.0.1:7001/v1/trip/${id}`);
    const data = await response.json();
    console.log(data);
    itinerary.value = data.resIa;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'itinéraire :', error);
  }
};

// Function to update the prompt
const updatePrompt = async () => {
  try {
    const id = route.params.id;
    const response = await fetch(`http://127.0.0.1:7001/v1/trip/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newPrompt.value }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du prompt');
    }

    await fetchItinerary();
  } catch (error) {
    console.error('Erreur lors de la mise à jour du prompt :', error);
  }
};

// Function to update the prompt and close the modal
const updatePromptAndCloseModal = async () => {
  await updatePrompt();
  closeModal();
};

onMounted(async () => {
  console.log(route.params.id);
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  await fetchItinerary();

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

.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  margin: 10% auto;
  width: 50%;
  background-color: #fff;
  padding: 20px;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.is-active {
  display: block;
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
        <p>{{ `Distance: ${step.km !== null ? step.km : 0} km` }}</p>
        <p>{{ `Description: ${step.desc}` }}</p>
      </li>
    </ul>

    <!-- Bouton pour mettre à jour le prompt et la réponse de l'IA -->
    <button @click="openModal">Modifier le prompt</button>

    <!-- Modale -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="box">
          <h2>Modifier le prompt</h2>
          <input type="text" v-model="newPrompt" placeholder="Nouveau prompt">
          <button @click="updatePromptAndCloseModal">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>