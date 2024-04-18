<script setup>
import { ref, defineExpose } from 'vue';
import { useRoute } from 'vue-router';

// Router
const route = useRoute();

const show = ref(false);

// Function to open the modal
const open = () => {
  show.value = true;
};

// Function to close the modal
const close = () => {
  show.value = false;
};

defineExpose({
  open
})

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
    <div class="modal" :class="{ 'is-active': show }">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <div class="box">
          <slot v-bind="{ close }"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
