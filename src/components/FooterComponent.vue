<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { appTexts } from '@/infrastructure/lang/spanish';

const tabIconPath = `${import.meta.env.BASE_URL}tabIcon.ico`;
</script>

<template>
  <footer class="bg-dark text-light mt-5">
    <div class="container py-5 px-lg-5">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4">
          <h5 class="company-name">{{ appTexts.footer.companyInfo.title }}</h5>
          <div class="d-flex">
            <a href="https://www.facebook.com/" class="text-light me-3" aria-label="Facebook">
              <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
            </a>
            <!-- <a href="#" class="text-light me-3" aria-label="Twitter">
              <FontAwesomeIcon :icon="['fab', 'twitter']" />
            </a>
            <a href="#" class="text-light me-3" aria-label="LinkedIn">
              <FontAwesomeIcon :icon="['fab', 'linkedin-in']" />
            </a> -->
            <a href="https://www.instagram.com/" class="text-light" aria-label="Instagram">
              <FontAwesomeIcon :icon="['fab', 'instagram']" />
            </a>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">{{ appTexts.footer.contact.title }}</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a :href="`mailto:${appTexts.footer.contact.email}`" class="text-light text-decoration-none">
              <FontAwesomeIcon icon="envelope" class="me-2" />
              {{ appTexts.footer.contact.email }}
              </a>
            </li>
            <!-- <li class="mb-2">
              <FontAwesomeIcon icon="phone" class="me-2" />
              {{ appTexts.contact.phone }}
            </li>
            <li class="mb-2">
              <FontAwesomeIcon icon="map-marker-alt" class="me-2" />
              {{ appTexts.contact.address }}
            </li> -->
          </ul>
        </div>
      </div>
    </div>

    <div class="border-top border-secondary">
      <div class="container py-3 px-lg-5">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0">
              &copy; {{ new Date().getFullYear() }} {{ appTexts.footer.companyInfo.title }}.
              {{ appTexts.footer.copyright }}
              <a href="https://www.fennecsoft.cl" target="_blank" class="text-light fennecsoft-link">
                {{ appTexts.footer.copyrightLinkText }}
                <img :src="tabIconPath" alt="FennecSoft" class="fennec-icon" />
              </a>
            </p>
          </div>
          <!-- <div class="col-md-6 text-md-end">
            <a href="#" class="text-light text-decoration-none me-3">{{ appTexts.legalLinks.privacyPolicy }}</a>
            <a href="#" class="text-light text-decoration-none">{{ appTexts.legalLinks.termsOfService }}</a>
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #732626 !important;
}

footer a:hover {
  color: #ffffff !important;
}

.fas,
.fab {
  width: 20px;
  text-align: center;
}
.company-name {
  color: #ffd894;
}

.fennecsoft-link {
  text-decoration: underline;
  transition: opacity 0.3s ease;
}

.fennecsoft-link:hover {
  opacity: 0.8;
}

.fennec-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
  margin-bottom: 4px;
  vertical-align: middle;
}
</style>
