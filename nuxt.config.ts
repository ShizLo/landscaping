// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://spb-bis.ru",
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-64x64.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "geo.region", content: "RU-LEN" },
        { name: "geo.placename", content: "Санкт-Петербург и Ленинградская область" },
        { name: "google-site-verification", content: "eSWBoZSLK1cegGffHHnDzwhIlnbTnasVKU4SgdGfz38" },
        { name: "yandex-verification", content: "aff45da8bad2b8c5" },
        { name: "apple-mobile-web-app-title", content: "БИС" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://spb-bis.ru" },
        { property: "og:title", content: "БИС: благоустройство и инженерные сети" },
        {
          property: "og:description",
          content:
            "БИС - профессиональная команда нулевого цикла, предоставляющая комплексные решения в области инженерных коммуникаций и благоустройства участков.",
        },
        { property: "og:image", content: "https://spb-bis.ru/static/bis-logo+.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "https://spb-bis.ru" },
        { name: "twitter:title", content: "БИС: благоустройство и инженерные сети" },
        {
          name: "twitter:description",
          content:
            "БИС - профессиональная команда нулевого цикла, предоставляющая комплексные решения в области инженерных коммуникаций и благоустройства участков.",
        },
        {
          name: "twitter:image:src",
          content: "https://spb-bis.ru/static/bis-logo+.png",
        },
      ],
    },
  },
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/fence", "/privacy-policy", "/water", "/foundation", "/topography", "/electricity", "/drainage", "/service"],
    },
  },

  routeRules: {
    "/departure": { ssr: false },
    "/icons/**": { robots: false },
  },
  css: ["./assets/styles/main.scss"],
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/scripts",
    "@pinia/nuxt",
    "vuetify-nuxt-module",
    ...(process.env.NODE_ENV === "production" ? ["nuxt-yandex-metrika"] : []),
    "@nuxtjs/robots",
    "@nuxt/icon",
    "@nuxtjs/seo",
    "@nuxtjs/sitemap", // Должен быть в конце?
  ],

  site: {
    url: "https://spb-bis.ru",
    name: "БИС",
  },
  ...(process.env.NODE_ENV === "production"
    ? {
        yandexMetrika: {
          id: "101887232",
          // debug: process.env.NODE_ENV !== "production",
        },
      }
    : {}),
  vuetify: {
    vuetifyOptions: {
      directives: true,
      locale: {
        locale: "ru", // Устанавливаем язык по умолчанию
        fallback: "en", // Язык по умолчанию, если перевод отсутствует
      },
      localeMessages: ["ru"], // Загружаем русский язык из пакета Vuetify
    },
  },

  sitemap: {
    exclude: ["/departure", "/develop", "/landscape", "/questionnaire", "/vacancies-junior", "/vacancies-middle", "/icons/**"],
    //TODO: Исключить изображения из sitemap
  },
  robots: {
    disallow: ["/departure", "/develop", "/landscape", "/questionnaire", "/vacancies-junior", "/vacancies-middle", "/icons/**"],
    groups: [
      {
        userAgent: "Yandex",
        disallow: ["/departure", "/develop", "/landscape", "/questionnaire", "/vacancies-junior", "/vacancies-middle", "/icons/**"],
        allow: ["/"],
      },
      {
        userAgent: "Googlebot",
        disallow: ["/departure", "/develop", "/landscape", "/questionnaire", "/vacancies-junior", "/vacancies-middle", "/icons/**"],
        allow: ["/"],
      },
      {
        userAgent: "*",
        disallow: ["/departure", "/develop", "/landscape", "/questionnaire", "/vacancies-junior", "/vacancies-middle", "/icons/**"],
        allow: ["/"],
      },
    ],
  },
  icon: {
    customCollections: [
      {
        prefix: "bis",
        dir: "./assets/media/icons/common/social",
        normalizeIconName: true, //TODO: разобратья
      },
      {
        prefix: "my-icon",
        dir: "./assets/iconBIS",
        normalizeIconName: false, //TODO: разобратья
      },
    ],
  },
  // image: {
  //   provider: process.env.NITRO_PRESET === "static" ? "static" : "ipx",
  // },
  // image: {
  //   // domains: ["ваш-домен"], // если используете внешние изображения
  //   provider: "ipx", // или 'cloudinary', 'imgix' и т.д.
  //   screens: {
  //     xs: 320,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     xxl: 1536,
  //   },
  // },
  image: {
    provider: process.env.NITRO_PRESET === "static" ? "static" : "ipx",
    dir: "public", // указываем корневую директорию для изображений
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});
