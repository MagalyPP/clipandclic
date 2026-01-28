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
          <div class="input-group mb-2">
            <span class="input-group-text bg-white">
              <FontAwesomeIcon icon="search" class="text-muted" />
            </span>
            <input
              type="search"
              class="form-control border-start-0"
              v-model="searchTerm"
              :aria-label="appTexts.products.searchAriaLabel"
              :placeholder="appTexts.products.searchPlaceholder"
            />
          </div>
          <div class="text-end text-muted small mb-3 mb-lg-0">
            {{ appTexts.products.resultsCount(filteredProducts.length) }}
          </div>
        </div>
      </div>

      <div class="row mt-md-5 cards-row">
        <div class="col-lg-3 col-md-4 mb-4" v-for="product in filteredProducts" :key="product.id">
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

const subCategoryTitles: Record<string, string> = {
  'lapiz-goma-sacapuntas': 'Lápices, Gomas y Sacapuntas',
  'cuadernos': 'Cuadernos',
  'manualidades': 'Manualidades',
  'arte': 'Arte',
  'reglas': 'Reglas y Geometría',
  'pegamento': 'Pegamento',
  'cartulinas': 'Cartulinas',
  'plumones-destacadores': 'Plumones y Destacadores',
  'carpetas': 'Carpetas',
  'otros': 'Otros',
};

const category = computed(() => (route.params.category as string) || 'all');
const subCategory = computed(() => (route.params.subCategory as string | undefined) || undefined);

const pageTitle = computed(() => {
  if (subCategory.value && category.value === 'utiles') {
    const catTitle = categoryTitles[category.value]?.title || 'Productos';
    const subCatTitle = subCategoryTitles[subCategory.value] || subCategory.value;
    return `${catTitle} - ${subCatTitle}`;
  }
  return categoryTitles[category.value]?.title || 'Productos';
});

const pageDescription = computed(() => {
  if (subCategory.value && category.value === 'utiles') {
    const subCatName = subCategoryTitles[subCategory.value]?.toLowerCase() ||
      subCategory.value.replace('-', ' ');
    return `Explora nuestro catálogo de ${subCatName}.`;
  }
  return categoryTitles[category.value]?.description || 'Explora nuestro catálogo de productos.';
});

const searchTerm = ref('');

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const filteredProducts = computed(() => {
  let base = category.value === 'all' ? products : getProductsByCategory(category.value);

  if (subCategory.value) {
    base = base.filter((p) => p.subCategory === subCategory.value);
  }

  const term = normalizeText(searchTerm.value.trim());
  if (!term) return base;
  return base.filter((p) => {
    const title = normalizeText(p.title || '');
    const desc = normalizeText(p.description || '');
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
  font-weight: 500;
}

@media (min-width: 992px) {
  .products-view {
    padding-top: 80px;
  }
}
</style>
