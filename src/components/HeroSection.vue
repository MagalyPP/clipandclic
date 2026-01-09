<script setup lang="ts">
// import { RouterLink } from 'vue-router'
import { appTexts } from '@/infrastructure/lang/spanish'
</script>

<template>
  <section class="hero-section position-relative overflow-hidden">
    <div class="container position-relative mt-3 mt-lg-5">
      <div class="row align-items-center p-lg-5">
        <div class="col-12">
          <h1 class="display-4 fw-bold mb-4 hero-title">{{ appTexts.home.heroSection.headerTitle }}</h1>
          <p class="lead mb-4 hero-description">
            {{ appTexts.home.heroSection.description }}
          </p>
          <!-- <div class="d-flex flex-column flex-sm-row gap-3 mb-3">
            <RouterLink
              to="/products"
              class="btn hero-btn overflow-hidden"
            >
              {{ appTexts.home.heroSection.buttons.getStarted }}
            </RouterLink>
            <RouterLink
              to="/products"
              class="btn hero-btn overflow-hidden"
            >
              {{ appTexts.home.heroSection.buttons.ourServices }}
            </RouterLink>
          </div> -->
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="hero-decoration-1 position-absolute"></div>
      <div class="hero-decoration-2 position-absolute"></div>
      <div class="hero-decoration-3 position-absolute"></div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.bounce {
  animation: bounce 2s infinite;
}
</style>
