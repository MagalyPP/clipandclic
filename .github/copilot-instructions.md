# Copilot Instructions - Clip & Clic

## Project Overview
Vue 3 + TypeScript e-commerce site for "Clip & Clic" selling school supplies and tech accessories. Spanish language primary (Chilean market). Uses Vite, Pinia, Vue Router, Bootstrap 5, and Vitest.

**CRITICAL RULES:**
- **ALL user-facing text MUST be in Spanish** in `infrastructure/lang/spanish.ts` - NEVER hardcode text in components
- **DO NOT add background colors to view components** - Keep views transparent for global background
- **DO NOT run or create unit tests** unless specifically requested
- **Always use Bootstrap 5** for layout - avoid custom CSS frameworks

## Architecture & Patterns

### Directory Structure
- **`src/composables/`**: Reusable composition functions split by purpose
  - `data/` - Static data exports (e.g., `products.ts`)
  - `utils/` - Utility composables (e.g., `useApi.ts`, `useValidations.ts`)
- **`src/infrastructure/`**: Core types, interfaces, constants, and i18n
  - `types.ts` - Type aliases (`ApiResponse<T>`, `AppLanguages`, `ServiceKey`)
  - `interfaces.ts` - Interface definitions
  - `constants/` - App-wide constants (colors, API endpoints)
  - `lang/` - Language files (currently Spanish only in `spanish.ts`)
- **`src/stores/`**: Pinia stores using Composition API setup syntax
- **`src/components/`**: Vue SFCs with PascalCase naming ending in `.vue`
- **`src/views/`**: Route-level components

### Key Conventions
1. **Routing**: Uses `createWebHashHistory()` for hash-based routing (GitHub Pages compatibility)
   - Pattern: `/products`, `/products/:category`, `/product/:productId`
   - Example: `/technology/audio`, `/product/2245`
2. **Icons**: FontAwesome 6.7 configured in `fontawesome-icons.ts` - only import icons actually used to minimize bundle
   - Use `<FontAwesomeIcon icon="icon-name" />` component syntax (preferred)
   - Icons must be imported in `fontawesome-icons.ts` and added to the library before use
   - Example: `<FontAwesomeIcon icon="chevron-left" />` or `<FontAwesomeIcon :icon="['fab', 'facebook-f']" />` for brand icons
3. **Components**: Use `<script setup lang="ts">` with TypeScript, props defined via `defineProps<{}>()` type parameter
4. **Stores**: Composition API style with `defineStore('name', () => {})` - return reactive refs
5. **Composables**: Export default function that returns methods/values (see `useApi()`, `useValidations()`)
6. **API wrapper**: `useApi()` returns standardized `ApiResponse<T>` with `{ data, status, statusText, isOk }`

### Chilean-Specific Features
- **Currency**: Use `clpFormat()` from `useValidations` - formats as `$1.000` (Chilean pesos)
- **RUN validation**: `validateRun()` validates Chilean national ID numbers with mod-11 algorithm
- **Language**: Primary text in `infrastructure/lang/spanish.ts` - all UI strings centralized here

## Development Workflow

### Commands (npm scripts)
```bash
npm run dev        # Start Vite dev server
npm run build      # Type-check + build for production
npm run preview    # Preview production build locally
npm run lint       # ESLint with auto-fix
npm run format     # Prettier format src/
```

### Testing
- **Framework**: Vitest with jsdom environment
- **Location**: Tests colocated in `__tests__/` folders (e.g., `composables/utils/__tests__/`)
- **Naming**: `*.spec.ts` files
- **Run tests**: Use VS Code test runner or terminal commands
- **Example pattern**: See `useValidations.spec.ts` for composable testing

### ESLint Rules (Important)
- **Quotes**: Single quotes, allow escaping (`'quotes': ['error', 'single', { 'avoidEscape': true }]`)
- **Indentation**: 2 spaces
- **Line length**: Max 120 chars for code, 300 for templates
- **Trailing commas**: Required on multiline (`'comma-dangle': ['error', 'always-multiline']`)
- **Strict equality**: Always use `===` (`eqeqeq: ['error', 'always']`)
- **No trailing spaces**, max 1 empty line

## Styling Patterns
- **Bootstrap 5**: Primary framework, imported globally in `main.ts`
- **Custom CSS variables**: Defined in `assets/main.css` and `App.vue` (`:root` section)
  - `--color-primary: #FBCEB1` (warm peach background)
  - `--color-bisque: #ffe4c4` (light peach accent)
  - `--color-bisque-light: #f0d4e8` (light pink)
  - All colors centrally managed in `infrastructure/constants/constants.ts` as `COLORS` object
- **Scoped styles**: Use `<style scoped>` in components
- **Theme colors**: Orange/bisque palette for product cards (`#972805`, `#ffe4c4`) - see `ProductCard.vue`
- **Colors from constants**: Import `COLORS` from `infrastructure/constants/constants.ts` and use via inline style bindings in templates or directly in scoped styles for components
  - **Important**: In scoped styles, `:root` pseudo-selector doesn't work. Define CSS variables on `.banner` or root component element via `:style` binding
  - See `BannerComponent.vue` for example of proper color constant usage
- **To change colors**: Update `COLORS` constant in `constants.ts`, then all references automatically update

### Banner (size/height)
- If the user asks to change the banner size or height, this is controlled in `src/components/BannerComponent.vue` via the `.banner-card` CSS class, using the `aspect-ratio` property.
- Key relationship: `aspect-ratio: W / H` implies the height is approximately `width * (H/W)`.
  - Example: `aspect-ratio: 30 / 9` implies `height ≈ width * (9/30)`, which is about `0.3 * width`.
- If the user requests a specific height in pixels, approximate it by converting pixels into an aspect ratio:
  - Pick a reasonable target width for the breakpoint (e.g. desktop container ~1200px, mobile ~360px).
  - Compute `W/H = targetWidthPx / desiredHeightPx`, then round to a simple fraction (e.g. 16/9, 21/9, 3/1, 4/3).
  - Note: there is a mobile override in `@media (max-width: 768px)` for `.banner-card` (it changes `aspect-ratio` and enforces a `min-height`).

## Data & State Management
- **Products**: Static array in `composables/data/products.ts` with type `Product[]`
- **Categories**: `'utiles' | 'navidad' | 'mouses' | 'audio' | 'cables' | 'almacenamiento'`
- **Images**: 
  - Product images stored in `public/images/products/` directory
  - **CRITICAL**: Must use `getImagePath()` helper function to reference images - never hardcode paths
  - The helper function automatically handles the base URL (`/clipandclic/`) for both dev and production
  - Placeholder images use `picsum.photos` service with product ID as seed for testing
  - **Never** use `/src/assets/` paths for product images - they won't work in production builds
- **Global state**: Pinia stores - currently `appSettingsStore` for language selection

### Adding Product Images
When adding new product images:
1. Place image files in `public/images/products/` directory
2. In `composables/data/products.ts`, use the `getImagePath()` helper function:
   ```typescript
   images: [getImagePath('YOUR_IMAGE.png')]
   ```
3. The `getImagePath()` function automatically prepends `import.meta.env.BASE_URL + 'images/products/'`
4. This ensures images work correctly in both development and production with the `/clipandclic/` base path
5. **Never** hardcode `/images/products/` or `/clipandclic/images/products/` - always use `getImagePath()`

### Updating Products Catalog
When the user requests to update the products catalog, follow this workflow:

**Step 1: Check Available Product Images**
1. List all files in `public/images/products/` directory
2. These image files are the **source of truth** for which products should exist in the catalog
3. Each image filename contains product information (name, variant, specifications)

**Step 2: Identify Category**
- Ask the user which category to update if not specified: `'utiles' | 'navidad' | 'mouses-teclados' | 'audio' | 'cables' | 'almacenamiento'`
- The `products` constant in `composables/data/products.ts` is organized with comment headers for each category:
  - `// Útiles Escolares`
  - `// Especial Navidad`
  - `// Tecnología - Mouses/Teclados`
  - `// Tecnología - Audio`
  - `// Tecnología - Cables`
  - `// Tecnología - Almacenamiento`

**Step 3: Remove Example Products**
- Delete all placeholder products in the target category that use `picsum.photos` images
- Example products are for testing only and should be replaced with real product data

**Step 4: Group Similar Products**
- Analyze image filenames to identify product variants (different colors, sizes, models)
- Group similar products into single entries with multiple images
- Example grouping pattern:
  ```typescript
  {
    id: 10,
    title: 'Cinta Mágica Lisa',
    description: 'Cinta mágica lisa 2.7x48cm, variedades de colores (dorada, plata, roja, verde) para decoración.',
    price: 0,
    category: 'navidad',
    inBanner: true,
    images: [
      getImagePath('CINTA MAGICA LISA DORADA 2,7X48CM.png'),
      getImagePath('CINTA MAGICA LISA PLATA 2,7X48CM.png'),
      getImagePath('CINTA MAGICA LISA ROJA 2,7X48CM.png'),
      getImagePath('CINTA MAGICA LISA VERDE 2,7X48CM.png'),
    ],
  }
  ```

**Step 5: Create Product Entries**
- Add new product objects with:
  - **id**: Unique sequential number (continue from existing IDs)
  - **title**: Extract from filename, capitalize properly, use Spanish
  - **description**: Brief description mentioning variants/specs from filenames, in Spanish
  - **price**: Set to `0` initially (user will update manually)
  - **category**: One of `'utiles' | 'navidad' | 'mouses-teclados' | 'audio' | 'cables' | 'almacenamiento'`
  - **images**: Array of strings using `getImagePath('filename.png')` for each variant
  - **inBanner** (optional): Boolean - user decides which products to feature
  - **inStock** (optional): Boolean - marks product availability (default: true)

**Step 6: Verify Completeness**
- Cross-check that all image files from `public/images/products/` are included in the products array
- Compare filenames in the folder with the image paths used in `products.ts`
- Identify any **unused image files** that are not referenced in the products array
- Create new product entries for unused images or ask user about them
- Ensure no duplicate entries exist
- Maintain existing products that already have real images

**Post-Update Reminders**
After updating products, remind the user to:
1. **Manually update prices** in `composables/data/products.ts` - replace `price: 0` with actual prices
2. **Set banner products** - add `inBanner: true` to products they want featured in the home page banner
3. **Review descriptions** - ensure Spanish descriptions are accurate and complete

## Integration Points
- **API endpoint**: AWS Lambda URL in `constants.ts` (`AWS_CONTACT_ENDPOINT`)
- **External services**: Axios for HTTP (wrapped in `useApi()`)
- **Deployment**: Likely GitHub Pages (based on hash routing + CNAME file)

## When Creating New Features
- Place types in `infrastructure/types.ts`, interfaces in `infrastructure/interfaces.ts`
- Add Spanish text to `infrastructure/lang/spanish.ts` object structure
- Use `@` alias for imports (`@/composables/...`) - configured in `vite.config.ts`
- Follow existing patterns: composables return functions, components use `<script setup>`, stores use composition API
- Add tests in colocated `__tests__/` folder for new utilities/composables

## Code Examples

### Using Localized Text
```typescript
import { appTexts } from '@/infrastructure/lang/spanish';

// In template:
<h1>{{ appTexts.home.title }}</h1>
<p>{{ appTexts.products.noResults }}</p>
```

### Product Type Structure
```typescript
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: 'utiles' | 'navidad' | 'mouse y teclados' | 'audio' | 'cables' | 'almacenamiento';
  image?: string;
};
```

### Using Bootstrap Layout
```vue
<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-3" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.image" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ formatPrice(product.price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

### Using FontAwesome Icons
```vue
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <!-- Solid icons -->
  <FontAwesomeIcon icon="shopping-cart" />
  <FontAwesomeIcon icon="search" />
  <FontAwesomeIcon icon="heart" />
  
  <!-- Brand icons (array syntax) -->
  <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
  <FontAwesomeIcon :icon="['fab', 'instagram']" />
</template>
```

**Important**: Before using any icon, you must:
1. Import the icon in `src/fontawesome-icons.ts`:
   ```typescript
   import { faShoppingCart, faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';
   ```
2. Add it to the library:
   ```typescript
   library.add(faShoppingCart, faSearch, faHeart, ...);
   ```
3. Then use it as `<FontAwesomeIcon icon="shopping-cart" />` in components

### Using Colors from Constants
```vue
<script setup lang="ts">
import { COLORS } from '@/infrastructure/constants/constants';
</script>

<template>
  <!-- Pass colors to element via inline styles -->
  <div :style="{ '--color-dark-brown': COLORS.DARK_BROWN, '--color-bisque': COLORS.BISQUE }">
    <h2 style="color: var(--color-bisque)">Title</h2>
    <p style="background: var(--color-dark-brown)">Content</p>
  </div>
</template>

<style scoped>
/* CSS variables are now available in scoped styles due to inline style binding */
.content {
  background: var(--color-dark-brown);
  color: var(--color-bisque);
}
</style>
```

**Note**: In scoped styles, `:root` doesn't work for component-level variables. Use inline `:style` binding on the root component element to set CSS variables that cascade to child styles.

## Best Practices
- **Component Organization**: Keep components focused and single-responsibility
- **Composition API**: Use `<script setup>` syntax for all new components
- **Types**: Define interfaces/types for all data structures in `infrastructure/`
- **Performance**: Use lazy loading for images, optimize imports
- **Accessibility**: Include proper ARIA labels and semantic HTML
- **Responsive**: Test on mobile, tablet, and desktop viewports (mobile-first approach)
