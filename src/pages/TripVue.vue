<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Map from '../components/Map.vue';
import Modal from '../components/Modal.vue';

// Router
const route = useRoute();
const router = useRouter();

// Data itinerary
const itinerary = ref([]);

//Update
const newPrompt = ref('');

// Modal
const modal = ref()


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

onMounted(async () => {
  fetchItinerary()
  console.log(route.params.id);
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  position: relative;
}
</style>


<template>
  <div>
    <Map v-if="itinerary.length > 0" :locations="itinerary" />

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
    <button @click="$refs.modal.open">Modifier le prompt</button>

    <!-- Modale -->
    <Modal ref="modal">
      <template #default="{ close }">
        <h2>Modifier le prompt</h2>
        <input type="text" v-model="newPrompt" placeholder="Nouveau prompt">
        <button @click="updatePrompt(); close()">Valider</button>
      </template>
    </Modal>
  </div>
</template>