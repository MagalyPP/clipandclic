/* eslint-disable vue/max-len */
export const appTexts: any = {
  navbar: {
    brand1: 'Clip & Clic',
    brand2: '',
    navigation: {
      home: 'Inicio',
      schoolSupplies: 'Útiles escolares',
      christmasSpecial: 'Especial Navidad',
      technology: 'Tecnología',
      mousesKeyboards: 'Mouses / Teclados',
      audio: 'Audio',
      cables: 'Cables',
      storage: 'Almacenamiento',
      others: 'Otros',
    },
    toggleNavigation: 'Alternar navegación',
  },
  home: {
    heroSection: {
      headerTitle: 'Artículos de Tecnología y Útiles Escolares',
      description:
        'Prepara tu año escolar con tecnología confiable y útiles de calidad. En Clip and Clic, apoyamos tu aprendizaje desde casa, oficina o colegio.',
      buttons: {
        getStarted: 'Comenzar',
        ourServices: 'Nuestros Productos',
      },
    },
    callToActionSection: {
      title: 'Descansa, nosotros nos encargamos.',
      description:
        'En nuestra tienda de útiles escolares, simplificamos tu vida: realizamos la cotización por ti y te ofrecemos siempre el mejor precio. Tú solo eliges lo que necesitas, nosotros hacemos el resto.',
      buttons: {
        getStarted: 'Comenzar Hoy',
      },
    },
  },
  footer: {
    companyInfo: {
      title: 'Clip & Clic Company',
      description:
        'Ofrecemos soluciones de negocio modernas para ayudar a su empresa a crecer y tener éxito en la era digital.',
    },
    navigation: {
      title: 'Enlaces Rápidos',
      links: {
        home: 'Inicio',
        about: 'Acerca de',
        services: 'Servicios',
        portfolio: 'Portafolio',
      },
    },
    services: {
      title: 'Servicios',
      links: {
        webDevelopment: 'Desarrollo Web',
        mobileApps: 'Aplicaciones Móviles',
        cloudSolutions: 'Soluciones en la Nube',
        consulting: 'Consultoría',
      },
    },
    contact: {
      title: 'Información de Contacto',
      email: 'pyme.clipandclic@gmail.com',
    },
    copyright: 'Hecho por',
    copyrightLinkText: 'FennecSoft',
  },
  products: {
    searchPlaceholder: 'Buscar productos...',
    searchAriaLabel: 'Buscar productos',
    noResults: 'No hay productos disponibles en esta categoría.',
    outOfStock: 'Sin Stock',
    resultsCount: (count: number) => `${count} ${count === 1 ? 'producto encontrado' : 'productos encontrados'}`,
  },
};
