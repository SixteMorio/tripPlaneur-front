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
    const response = await fetch('http://127.0.0.1:7001/v1/trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: userPrompt.value }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du nouveau voyage');
    }
    const responseData = await response.json();
    const newTripId = responseData.id;

    router.push(`/trip/${newTripId}`);
  } catch (error) {
    console.error('Erreur lors de la création du nouveau voyage :', error);
  }
};

// Function History
const loadHistory = async () => {
  try {
    const response = await fetch('http://127.0.0.1:7001/v1/trip');
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

<style scoped>
.body {
  font-family: Arial, sans-serif;
  max-width: 96vw;
  background-color: #2F2E2B;
  margin: 0 auto;
  padding: 2vh;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 4vw;
    margin-top: 4vh;
    margin-bottom: 0;
    color: #FFFFFF;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 4vh;
  }


}

h2 {
  color: #6D695E;
}

.prompt {
  display: flex;
  justify-content: center;

  input[type="textarea"] {
    display: flex;
    justify-content: center;
    width: 84%;
    padding: 2vh;
    margin-bottom: 4vh;
    background-color: #242321;
    box-sizing: border-box;
    border-radius: 5px;
    color: #6D695E;
    border: 1px solid #6D695E;
  }
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
}

button {
  display: block;
  width: 40%;
  padding: 1vh;
  color: #FFFFFF;
  margin-bottom: 4vh;
  cursor: pointer;
}

.btnOne {
  background-color: #6D695E;
  border: none;
  border-radius: 5px;
  margin-right: 1vh;
}

.btnTwo {
  border: 1px solid 5px;
  border-color: #6D695E;
  margin-left: 1vh;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 4vh;
}

li a {
  display: block;
  padding: 2vh;
  background-color: #242321;
  border-radius: 5px;
  text-decoration: none;
  color: #FFFFFF;
}

@media (min-width: 768px) {

  input[type="textarea"] {
    flex-basis: 68%;
    margin-right: 2%;
  }

  button {
    flex-basis: 30%;
  }

  ul {
    flex-basis: 30%;
  }
}
</style>

<template>
  <div class="body">
    <div class="header">
      <img src="../assets/logo.svg" alt="Logo" />

      <h1>Planificateur de Voyage</h1>
      <h2>généré par IA</h2>
    </div>

    <!--User prompt-->
    <div class="prompt">
      <input type="textarea" v-model="userPrompt" placeholder="Saisissez votre voyage" />
    </div>


    <!-- Buttons -->
    <div class="button-container">
      <!-- button-primary et secondary -->
      <button class="btnOne" @click="createNewTrip">Voir l'itinéraire</button>
      <button class="btnTwo"><router-link :to="`/trip/421b6857-2714-4c45-95f8-7604677b404a`">Voir un
          exemple</router-link></button>
    </div>

    <!-- History -->
    <div v-if="history.length > 0">
      <h2>Derniers itinéraires : </h2>
      <ul>
        <li v-for="(trip, index) in history" :key="index">
          <router-link :to="'/trip/' + trip.id">{{ trip.content }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
