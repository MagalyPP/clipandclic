<template>
  <div class="banner" :style="{ '--color-bisque': COLORS.BISQUE, '--color-dark-brown': COLORS.DARK_BROWN }">
    <section class="image-banner" aria-label="Featured products carousel">
      <div class="banner-window">
        <div
          class="banner-track"
          :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
          aria-live="polite"
        >
          <div
            v-for="product in bannerProducts"
            :key="product.id"
            class="banner-card"
          >
            <img :src="product.images[0]" :alt="product.title" loading="lazy" />
            <div class="banner-overlay">
              <div class="banner-content">
                <h2>{{ product.title }}</h2>
                <p class="banner-price">{{ clpFormat(product.price) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="banner-controls" role="tablist">
        <button
          v-for="(product, index) in bannerProducts"
          :key="`control-${product.id}`"
          class="control-dot"
          :class="{ active: index === activeIndex }"
          type="button"
          :aria-label="`Show ${product.title}`"
          :aria-selected="index === activeIndex"
          role="tab"
          @click="goToSlide(index)"
        ></button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { products } from '@/composables/data/products';
import { COLORS } from '@/infrastructure/constants/constants';
import useValidations from '@/composables/utils/useValidations';

const { clpFormat } = useValidations();

const bannerProducts = computed(() => {
  return products.filter(product => product.inBanner);
});

const activeIndex = ref(0);
const intervalMs = 4500;
let timer: ReturnType<typeof setInterval> | null = null;

const goToSlide = (index: number) => {
  activeIndex.value = index;
  restartAutoSlide();
};

const showNextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % bannerProducts.value.length;
};

const startAutoSlide = () => {
  timer = setInterval(showNextSlide, intervalMs);
};

const stopAutoSlide = () => {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
};

const restartAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<style scoped>
.banner {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.image-banner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.banner-window {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
}

.banner-track {
  display: flex;
  transition: transform 600ms ease;
}

.banner-card {
  min-width: 100%;
  position: relative;
  aspect-ratio: 30 / 9;
  display: block;
  background-color: white;
}

.banner-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}

.banner-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--color-dark-brown);
  padding: 1rem;
  border-radius: 12px;
  width: fit-content;
}

.banner-content h2 {
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--color-bisque);
  margin: 0;
  letter-spacing: 0.02em;
}

.banner-price {
  font-weight: 600;
  font-size: 1.1rem;
  color: v-bind('COLORS.SATURATED_YELLOW');
  margin: 0;
  letter-spacing: 0.02em;
}

.banner-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.control-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: none;
  background: rgba(137, 47, 98, 0.35);
  cursor: pointer;
  transition: all 200ms ease;
}

.control-dot.active {
  width: 36px;
  background: var(--color-dark-brown);
}

@media (max-width: 768px) {
  .banner-card {
    aspect-ratio: 15 / 9;
    min-height: 280px;
  }

  .banner-overlay {
    padding: 1rem;
  }

  .banner-content {
    padding: 0.75rem;
  }

  .banner-content h2 {
    font-size: small;
  }

  .banner-price {
    font-size: 0.95rem;
  }
}
</style>
