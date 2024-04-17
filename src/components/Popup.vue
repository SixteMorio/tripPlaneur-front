<script setup>
import { useRoute } from 'vue-router';

// Router
const route = useRoute();

const showModal = ref(false);

//Update
const newPrompt = ref('');

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
</script>

<style scoped>
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
