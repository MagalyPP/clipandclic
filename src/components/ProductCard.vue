<template>
  <div class="product-card shadow-lg" :class="{ 'out-of-stock': !product.inStock }">
    <div class="product-header">
      <h3>{{ product.title }}</h3>
    </div>
    <ImageCarousel :images="product.images" :image-alt="product.title" />
    <div class="product-body">
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">
        <span class="price">{{ formatPrice(product.price) }}</span>
      </div>
    </div>
    <div v-if="!product.inStock" class="out-of-stock-overlay">
      <span class="out-of-stock-text">{{ appTexts.products.outOfStock }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Product } from '@/infrastructure/types';
import { appTexts } from '@/infrastructure/lang/spanish';
import ImageCarousel from './ImageCarousel.vue';

defineProps<{
  product: Product;
}>();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
};
</script>

<style scoped>
:root {
  --color-bisque: #ffe4c4;
  --color-bisque-light: #f0d4e8;
}

.product-card {
  border: none;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(151, 40, 5, 0.15) !important;
}

.product-header {
  background: linear-gradient(135deg, #972805 0%, #c94000 100%);
  padding: 1.5rem;
  color: white;
  border-bottom: 3px solid var(--color-bisque);
  height: 80px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.product-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
}

.product-body {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
  margin: 0 0 1rem 0;
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e9ecef;
  padding-top: 10px;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #972805;
}

.product-card.out-of-stock {
  opacity: 0.6;
}

.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.out-of-stock-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
