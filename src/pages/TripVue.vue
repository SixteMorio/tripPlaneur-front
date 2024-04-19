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

//fetchItinerary
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
      throw new Error('Error updating prompt');
    }

    await fetchItinerary();
  } catch (error) {
    console.error('Error updating prompt :', error);
  }
};

onMounted(async () => {
  fetchItinerary()
  console.log(route.params.id);
});
</script>

<style>
.body {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 1rem;
  background-color: #2F2E2B;

  h2 {
    color: #6D695E;
  }

  ul li {
    list-style: none;

    h3 {
      color: #FFFFFF;
    }

    p {
      color: #CECECE;
    }
  }

  .menu-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4vh;
  }

  input[type="textarea"] {
    display: flex;
    justify-content: center;
    width: 84%;
    padding: 1rem;
    margin-bottom: 4vh;
    border-radius: 1rem;
    border: 1px solid #6D695E;
    color: #FFFFFF;
    background-color: #242321;
  }

  button {
    display: block;
    width: 40%;
    padding: 1em;
    margin-bottom: 4vh;
    border-radius: 1em;
    color: #FFFFFF;
    cursor: pointer;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
  }

  .button-primary {
    padding: 0.5em 1em;
    border: none;
    border-radius: 0.5em;
    background-color: #6D695E;
    color: #FFFFFF;
    cursor: pointer;
  }

  .button-secondary {
    padding: 0.5em 1em;
    border: solid;
    border-radius: 0.5em;
    border-color: #6D695E;
    color: #FFFFFF;
    background-color: #2F2E2B;
    cursor: pointer;
  }
}
</style>

<template>
  <Map v-if="itinerary.length > 0" :locations="itinerary" />
  <div class="body">

    <router-link to="/"><img src="../assets/btnBack.svg" alt="button back" /></router-link>

    <div class="menu-container">
      <h2>Itinéraire</h2>
      <!-- Button prompt update -->
      <img @click="$refs.modal.open" src="../assets/update.svg" alt="update the prompt" />
    </div>

    <ul>
      <li v-for="(step, index) in itinerary" :key="index">
        <h3>{{ `Étape ${step.num}: ${step.name}` }}</h3>
        <p>{{ `Distance: ${step.km !== null ? step.km : 0} km` }}</p>
        <p>{{ `Description: ${step.desc}` }}</p>
      </li>
    </ul>

    <!-- Modale -->
    <Modal ref="modal">
      <template #default="{ close }">
        <h2>Modifier le prompt</h2>
        <input type="textarea" v-model="newPrompt" placeholder="Nouveau prompt">
        <div class="button-container">
          <button class="button-primary" @click="updatePrompt(); close()">Valider</button>
          <button class="button-secondary" @click="close()">Annuler</button>
        </div>

      </template>
    </Modal>
  </div>
</template>