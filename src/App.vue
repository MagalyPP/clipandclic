<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';
</script>

<template>
  <div class="app-wrapper">
    <Navbar />
    <main class="container-lg px-0">
      <RouterView />
    </main>
    <FooterComponent />
    <WhatsAppButton />
  </div>
</template>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  overflow-x: hidden;
}

#app,
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
}

/* Custom theme colors */
:root {
  --primary-color: #0066cc;
  --secondary-color: #6c757d;
  --accent-color: #28a745;
  --dark-color: #212529;
  --light-color: #f8f9fa;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}
</style>
