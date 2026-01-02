<template>
  <div class="products-view">
    <div class="container py-3">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="pb-md-3">{{ pageTitle }}</h1>
          <p class="lead">{{ pageDescription }}</p>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-lg-4 ms-auto">
          <input
            type="search"
            class="form-control"
            v-model="searchTerm"
            :placeholder="appTexts.products.searchPlaceholder"
            aria-label="Buscar productos"
          />
        </div>
      </div>

      <div class="row mt-md-5">
        <div class="col-lg-4 col-md-6 mb-4" v-for="product in filteredProducts" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="row mt-5">
        <div class="col-lg-12 text-center">
          <p class="text-muted">{{ appTexts.products.noResults }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { products, getProductsByCategory } from '@/composables/data/products';
import { appTexts } from '@/infrastructure/lang/spanish';

const route = useRoute();

const categoryTitles: Record<string, { title: string; description: string }> = {
  utiles: {
    title: 'Útiles Escolares',
    description: 'Todo lo que necesitas para tus estudios. Cuadernos, lápices, mochilas y más.',
  },
  navidad: {
    title: 'Especial Navidad',
    description: 'Productos especiales para la temporada navideña. Regalos y decoraciones temáticas.',
  },
  mouses: {
    title: 'Mouses / Teclados',
    description: 'Periféricos de entrada de calidad. Mouses y teclados para productividad y gaming.',
  },
  audio: {
    title: 'Audio',
    description: 'Dispositivos de audio de alta calidad. Auriculares, parlantes y micrófonos profesionales.',
  },
  cables: {
    title: 'Cables',
    description: 'Cables de conexión certificados. USB, HDMI, Ethernet y más.',
  },
  almacenamiento: {
    title: 'Almacenamiento',
    description: 'Dispositivos de almacenamiento confiables. SSDs, pendrives y discos duros externos.',
  },
};

const category = computed(() => (route.params.category as string) || 'all');
const pageTitle = computed(() => categoryTitles[category.value]?.title || 'Productos');
const pageDescription = computed(
  () => categoryTitles[category.value]?.description || 'Explora nuestro catálogo de productos.',
);

const searchTerm = ref('');

const filteredProducts = computed(() => {
  const base = category.value === 'all' ? products : getProductsByCategory(category.value);
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) return base;
  return base.filter((p) => {
    const title = (p.title || '').toLowerCase();
    const desc = (p.description || '').toLowerCase();
    return title.includes(term) || desc.includes(term);
  });
});
</script>

<style scoped>
:root {
  --color-bisque: #ffe4c4;
  --color-bisque-light: #f0d4e8;
}

.products-view {
  min-height: 100vh;
  color: #972805;
}

h1 {
  color: #972805;
  font-weight: 700;
  font-size: 2.5rem;
}

.lead {
  color: #666;
  font-size: 1.1rem;
}

@media (min-width: 992px) {
  .products-view {
    padding-top: 80px;
  }
}
</style>
