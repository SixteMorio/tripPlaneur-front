<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Variables réactives
const userPrompt = ref('');
const history = ref([]);

// Router
const router = useRouter();

// Function new Trip
const createNewTrip = async () => {
  try {
    const response = await fetch('URL_de_votre_backend/api/newTrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: userPrompt.value }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du nouveau voyage');
    }

    // Redirection vers la page pour afficher la réponse de l'IA
    router.push('/newTripResponse');
  } catch (error) {
    console.error('Erreur lors de la création du nouveau voyage :', error);
  }
};

// Fonction pour afficher un exemple
const showExample = async () => {
  try {
    // Appel à l'API pour récupérer un exemple depuis la base de données
    const response = await fetch('URL_de_votre_backend/api/exemple');
    const data = await response.json();
    history.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'exemple :', error);
  }
};

// Function History
const loadHistory = async () => {
  try {
    const response = await fetch('URL_de_votre_backend/api/history');
    const data = await response.json();
    history.value = data;
  } catch (error) {
    console.error('Erreur lors du chargement de l\'historique :', error);
  }
};

onMounted(() => {
  loadHistory();
});
</script>


<template>
  <div>
    <img src="../assets/logo.svg" alt="Logo" />

    <h1>Bienvenue sur notre application</h1>

    <!--User prompt-->
    <input type="text" v-model="userPrompt" placeholder="Saisissez votre voyage" />

    <!-- Buttons -->
    <button @click="createNewTrip">Voir l'itinéraire</button>
    <button @click="showExample">Voir un exemple</button>

    <!-- History -->
    <div v-if="history.length > 0">
      <h2>Historique des précédents voyages</h2>
      <ul>
        <li v-for="(trip, index) in history" :key="index">
          {{ trip.content }}
        </li>
      </ul>
    </div>
  </div>
</template>
