<template>
  <div class="image-carousel-container">
    <div class="image-display">
      <div v-if="isLoading" class="loading-spinner">
        <FontAwesomeIcon icon="spinner" spin size="2x" />
      </div>
      <img
        :src="currentImage"
        :alt="imageAlt"
        class="carousel-image"
        :class="{ 'image-hidden': isLoading }"
        @load="onImageLoad"
      />
      <div v-if="images.length > 1" class="image-counter">
        {{ currentImageIndex + 1 }} / {{ images.length }}
      </div>
    </div>
    <div v-if="images.length > 1" class="carousel-controls">
      <button
        class="carousel-btn carousel-btn-prev"
        @click="previousImage"
        aria-label="Imagen anterior"
      >
        <FontAwesomeIcon icon="chevron-left" />
      </button>
      <button
        class="carousel-btn carousel-btn-next"
        @click="nextImage"
        aria-label="Siguiente imagen"
      >
        <FontAwesomeIcon icon="chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
  images: string[];
  imageAlt: string;
}

const props = defineProps<Props>();

const currentImageIndex = ref(0);
const isLoading = ref(true);

const currentImage = computed(() => props.images[currentImageIndex.value]);

const onImageLoad = () => {
  isLoading.value = false;
};

const previousImage = () => {
  isLoading.value = true;
  currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length;
};

const nextImage = () => {
  isLoading.value = true;
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
};

// Reset loading state when image changes
watch(currentImage, () => {
  isLoading.value = true;
});
</script>

<style scoped>
.image-carousel-container {
  position: relative;
  width: 100%;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e9ecef;
  overflow: hidden;
  height: clamp(180px, 22vw, 260px);
  padding: 8px;
  box-sizing: border-box;
}

.image-display {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s ease-in-out;
}

.carousel-image.image-hidden {
  opacity: 0;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #972805;
  z-index: 10;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.image-counter {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  pointer-events: none;
}

.carousel-btn {
  pointer-events: all;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
  font-size: 1rem;
}

.carousel-btn:hover {
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.carousel-btn:active {
  transform: scale(0.95);
}

.carousel-btn-prev,
.carousel-btn-next {
  flex-shrink: 0;
}
</style>
