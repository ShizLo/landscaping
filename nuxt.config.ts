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
    // layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      meta: [
        { name: "geo.region", content: "RU-LEN" },
        { name: "geo.placename", content: "Санкт-Петербург и Ленинградская область" },
        { name: "google-site-verification", content: "eSWBoZSLK1cegGffHHnDzwhIlnbTnasVKU4SgdGfz38" },
        { name: "yandex-verification", content: "aff45da8bad2b8c5" },
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
    "nuxt-yandex-metrika",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxt/icon",
    "@nuxtjs/seo",
  ],
  site: {
    url: "https://spb-bis.ru",
    name: "БИС",
  },
  yandexMetrika: {
    id: "101887232",
  },
  vuetify: {
    vuetifyOptions: {
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
  },
  icon: {
    customCollections: [
      {
        prefix: "my-icon",
        dir: "./assets/iconBIS",
        normalizeIconName: false, //TODO: разобратья
      },
    ],
  },
  image: {
    provider: process.env.NITRO_PRESET === "static" ? "static" : "ipx",
  },
});
