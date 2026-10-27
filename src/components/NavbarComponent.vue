<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { appTexts } from '@/infrastructure/lang/spanish';
import { COLORS } from '@/infrastructure/constants/constants';

const isNavCollapsed = ref(true);

const toggleNav = () => {
  isNavCollapsed.value = !isNavCollapsed.value;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">
        <img
          src="/favicon.png"
          alt="Logo"
          width="45"
          height="40"
          class="d-inline-block align-top me-4 fennec-logo"
        />
        <span class="brand-text"
          >{{ appTexts.navbar.brand1 }}<span class="text-fennec-orange">{{ appTexts.navbar.brand2 }}</span></span
        >
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        :aria-label="appTexts.navbar.toggleNavigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: !isNavCollapsed }" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" @click="isNavCollapsed = true">{{
              appTexts.navbar.navigation.home
            }}</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ appTexts.navbar.navigation.schoolSupplies }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles"
                  @click="isNavCollapsed = true"
                >
                  Ver todos
                </RouterLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/arte"
                  @click="isNavCollapsed = true"
                >
                  Arte
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/carpetas"
                  @click="isNavCollapsed = true"
                >
                  Carpetas
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/cartulinas"
                  @click="isNavCollapsed = true"
                >
                  Cartulinas
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/cintas-adhesivas"
                  @click="isNavCollapsed = true"
                >
                  Cintas Adhesivas
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/cuadernos"
                  @click="isNavCollapsed = true"
                >
                  Cuadernos
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/forros-fundas"
                  @click="isNavCollapsed = true"
                >
                  Forros y Fundas
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/lapiz-goma-sacapuntas"
                  @click="isNavCollapsed = true"
                >
                  Lápices, Gomas y Sacapuntas
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/manualidades"
                  @click="isNavCollapsed = true"
                >
                  Manualidades
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/otros"
                  @click="isNavCollapsed = true"
                >
                  Otros
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/pegamento"
                  @click="isNavCollapsed = true"
                >
                  Pegamento
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/plumavit"
                  @click="isNavCollapsed = true"
                >
                  {{ appTexts.navbar.navigation.plumavit }}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/plumones-destacadores"
                  @click="isNavCollapsed = true"
                >
                  Plumones y Destacadores
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/utiles/reglas"
                  @click="isNavCollapsed = true"
                >
                  Reglas y Geometría
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products/navidad" @click="isNavCollapsed = true">{{
              appTexts.navbar.navigation.christmasSpecial
            }}</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ appTexts.navbar.navigation.technology }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/almacenamiento"
                  @click="isNavCollapsed = true"
                >
                  {{ appTexts.navbar.navigation.storage }}
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/products/audio" @click="isNavCollapsed = true">
                  {{ appTexts.navbar.navigation.audio }}
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/products/cables" @click="isNavCollapsed = true">
                  {{ appTexts.navbar.navigation.cables }}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/products/mouses-teclados"
                  @click="isNavCollapsed = true"
                >
                  {{ appTexts.navbar.navigation.mousesKeyboards }}
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/products/otros" @click="isNavCollapsed = true">
                  {{ appTexts.navbar.navigation.others }}
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
:root {
  --color-bisque: #ffe4c4;
}

.navbar {
  background-color: #732626 !important;
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(151, 40, 5, 0.2);
}

.custom-navbar {
  background-color: #732626 !important;
}

.navbar-brand {
  font-size: 1.5rem;
  padding: 0;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar-brand:hover {
  transform: translateY(-1px);
  background: transparent;
}

.brand-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-bisque);
  transition: all 0.3s ease;
}

.navbar-brand:hover .brand-text {
  color: #ffd4e5;
}

.navbar-brand:hover .text-fennec-orange {
  color: v-bind('COLORS.SATURATED_YELLOW');
}

.text-fennec-orange {
  color: v-bind('COLORS.SATURATED_YELLOW');
  transition: color 0.3s ease;
}

.nav-link {
  font-weight: 500;
  color: var(--color-bisque) !important;
  transition: color 0.3s ease;
  position: relative;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  background: transparent;
}

.nav-link:hover, .nav-link.router-link-active {
  color: v-bind('COLORS.SATURATED_YELLOW') !important;
  background: transparent;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: v-bind('COLORS.SATURATED_YELLOW');
}

.navbar-toggler {
  border-color: rgba(151, 40, 5, 0.3);
  padding: 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.dropdown-menu {
  background-color: var(--color-bisque);
  border: 1px solid rgba(151, 40, 5, 0.2);
  box-shadow: 0 4px 15px rgba(115, 38, 38, 0.2);
  border-radius: 8px;
  padding: 0.5rem;
}

.dropdown-item {
  color: v-bind('COLORS.DARK_BROWN');
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  border-radius: 4px;
  background: transparent;
}

.dropdown-item:hover {
  background: transparent;
  color: v-bind('COLORS.SATURATED_YELLOW');
}

.dropdown-item.active {
  background: transparent;
  color: v-bind('COLORS.SATURATED_YELLOW');
  font-weight: 600;
}

.fennec-logo {
  transition: all 0.3s ease;
  background: white;
  border-radius: 50%;
  padding: 5px;
  transform: scale(1.33);
}

.fennec-logo:hover {
  filter: drop-shadow(0 0 8px rgba(151, 40, 5, 0.4));
}

/* Línea separadora en el menú de idiomas */
.vr {
  background-color: rgba(151, 40, 5, 0.2);
  opacity: 0.5;
}

hr {
  opacity: 0.1;
}

@media (max-width: 991.98px) {
  .navbar {
    max-height: 100vh;
  }

  .navbar-collapse {
    background-color: #732626;
    backdrop-filter: blur(8px);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 0.5rem;
    border: 1px solid rgba(151, 40, 5, 0.2);
    max-height: calc(100vh - 5rem);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .nav-link {
    padding: 0.75rem 1rem;
  }

  .nav-link.router-link-active::after {
    display: none;
  }

  .dropdown-menu {
    position: static !important;
    width: 100%;
    max-height: min(55vh, 26rem);
    margin-top: 0.25rem;
    overflow-y: auto;
    border-radius: 6px;
    box-shadow: none;
  }
}
</style>
