<script setup>
import { useCatalogStore } from "@/stores/modules/catalog.store";

import { useHead } from "#app";
useHead({
  title: "Очистка воды и водоподготовка — фильтры, умягчение, обезжелезивание",
  titleTemplate: "%s %separator %siteName",
  meta: [
    {
      name: "description",
      content:
        "Комплексные системы водоподготовки и очистки воды для дома и коттеджа. Фильтры, умягчение, обезжелезивание, монтаж и сервисное обслуживание.",
    },
    {
      name: "keywords",
      content: "водоподготовка, очистка воды, фильтры для воды, умягчение воды, обезжелезивание, система очистки, питьевая вода, скважина",
    },
  ],
});

const catalogStore = useCatalogStore();

//<Импорт картинок блок наши услуги>================================================================================
import img_service_1 from "../assets/images/services/water/service-caisson.webp";
import img_service_2 from "../assets/images/services/water/service-borehole-drill.webp";
import img_service_3 from "../assets/images/waterPage/services-3.webp";
import img_service_4 from "../assets/images/waterPage/services-4.webp";
import img_service_5 from "../assets/images/services/water/service-well-pump.webp";
import img_service_6 from "../assets/images/waterPage/services-6.webp";
//</Импорт картинок>===============================================================================
//<Импорт картинок для дополнительных услуг>================================================================================
import water_street_tap from "../assets/media/images/water/water-street-tap.png";
import water_underground_crane from "../assets/media/images/water/water-underground-crane.png";
import water_tapping_into from "../assets/media/images/water/water-tapping-into.webp";
import water_analysis from "../assets/media/images/water/water-analysis.png";
import water_supply_route from "../assets/media/images/water/water-supply-route.png";
import water_insulation_well from "../assets/media/images/water/water-insulation-well.png";
//</Импорт картинок для дополнительных услуг>===============================================================================

onMounted(async () => {
  await catalogStore.loadCatalog();
  updatePrices();
});

function updatePrices() {
  //<Основные услуги>================================================================================
  // Кессон
  state.dataServices[0][0][0].price = catalogStore.getPriceById(26);
  // Монтаж автоматики
  state.dataServices[1][0][0].price = catalogStore.getPriceById(27);
  // Обустройство колодца
  state.dataServices[1][0][1].price = catalogStore.getPriceById(14);
  // Водоподготовка
  state.dataServices[0][1][0].price = catalogStore.getPriceById(10);
  // Обвязка скважины
  state.dataServices[0][1][1].price = catalogStore.getPriceById(28);
  // Бурение скважин
  state.dataServices[1][1][0].price = catalogStore.getPriceById(11);
  //</Основные услуги>===============================================================================
  //<Банер>================================================================================
  //Кессон
  state.bannerPrice[0].price = catalogStore.getPriceById(26);
  //Монтаж автоматики
  state.bannerPrice[1].price = catalogStore.getPriceById(27);
  // Бурение скважин
  state.bannerPrice[2].price = catalogStore.getPriceById(11);
  //</Банер>===============================================================================
  //<Дополнительные бурут>================================================================================
  //Врезка в водопровод
  state.dopServices[0].price = catalogStore.getPriceById(29);
  // Анализ воды и подбор оборудования для очистки
  state.dopServices[1].price = catalogStore.getPriceById(30);
  // Уличный кран
  state.dopServices[2].price = catalogStore.getPriceById(31);
  // Утепление колодца
  state.dopServices[3].price = catalogStore.getPriceById(32);
  // Установка ковера (подземный кран)
  state.dopServices[4].price = catalogStore.getPriceById(33);
  // Прокладка дополнительных трас водоснабжения
  state.dopServices[5].price = catalogStore.getPriceById(34);
  //</Дополнительные берут>===============================================================================
}

const state = reactive({
  price: [],
  bannerPrice: initializeBannerStructure(),
  dataServices: initializeServicesStructure(),
  dopServices: initializeDopServicesStructure(),
  loading: false,
});

function initializeBannerStructure() {
  return [
    {
      url: "/media/images/content/water/water-cusson-02.jpg",
      price: "",
      name: "Кессон",
    },
    {
      url: "/images/waterPage/slider-2.jpg",
      price: "",
      name: "Монтаж автоматики",
    },
    {
      url: "/media/images/content/water/water-drilling-well-01.jpg",
      price: "",
      name: "Бурение скважин",
    },
  ];
}
function initializeServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-big",
          title: "Кессон",
          price: "",
          pathImg: img_service_1,
          hoverColors: "rgb(204, 209, 255)",
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Водоподготовка",
          price: "",
          pathImg: img_service_6,
          hoverColors: "rgb(204, 209, 255)",
        },
        {
          class: "services__row-item-sm",
          title: "Обвязка скважины",
          price: "",
          pathImg: img_service_3,
          hoverColors: "rgb(204, 209, 255)",
        },
      ],
    ],
    [
      [
        {
          class: "services__row-item-sm",
          title: "Монтаж автоматики",
          price: "",
          pathImg: img_service_4,
          hoverColors: "rgb(204, 209, 255)",
        },
        {
          class: "services__row-item-sm",
          title: "Обустройство колодца",
          price: "",
          pathImg: img_service_5,
          hoverColors: "rgb(204, 209, 255)",
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Бурение скважин",
          price: "",
          pathImg: img_service_2,
          hoverColors: "rgb(204, 209, 255)",
        },
      ],
    ],
  ];
}
function initializeDopServicesStructure() {
  return [
    { urlImg: water_tapping_into, price: "", name: "Врезка в водопровод" },
    { urlImg: water_analysis, price: "", name: "Анализ воды и подбор оборудования для очистки" },
    { urlImg: water_street_tap, price: "", name: "Уличный кран" },
    { urlImg: water_insulation_well, price: "", name: "Утепление колодца" },
    { urlImg: water_underground_crane, price: "", name: "Установка ковера (подземный кран)" },
    { urlImg: water_supply_route, price: "", name: "Прокладка дополнительных трас водоснабжения" },
  ];
}

const dataOrder = [
  {
    urlImg: "mdi:draw-pen",
    title: "Проект и эскиз",
    text: "Готовим проект или визуализацию в форме электронного эскиза, где обозначаем схему будущих работ.",
  },
  {
    urlImg: "mdi:water-pump",
    title: "Источник воды",
    text: "Если воду запланировано брать из скважины, то ее надо пробурить и обустроить, так же с колодцем.*",
  },
  {
    urlImg: "mdi:pipe",
    title: "Подведение к дому",
    text: "Прокладка магистрали воды (ПНД труба и кабель питания) от источника (скважина, колодец или центральный водопровод) к точке/точкам ввода.",
  },
  {
    urlImg: "mdi:pipe-leak",
    title: "Разводка по дому",
    text: "Разводим воду под холодную и горячую воду по дому.",
  },
  {
    urlImg: "mdi:tools",
    title: "Установка оборудования",
    text: "Монтируем систему водоочистки, бойлер и прочие инженерные системы.",
  },
  {
    urlImg: "mdi:bathtub-outline",
    title: "Установка сантехники",
    text: "Устанавливаем ванны, унитазы, раковины, душевые, подключаем смесители и прочую сантехнику.",
  },
];

const feedBackData = [
  "Кессон",
  "Монтаж автоматики",
  "Бурение скважин",
  "Обвязка скважины",
  "Обустройство колодца",
  "Водоподготовка",
  "Врезка в водопровод",
  "Анализ воды",
  "Уличный кран",
  "Утепление колодца",
  "Нет в списке",
];

function visibleForm() {
  if (!feedbackForm.active) {
    feedbackForm.active = true;
    // toggleBodyScroll(true);
  } else {
    feedbackForm.active = false;
    // toggleBodyScroll(false);
  }
}
const feedbackForm = reactive({
  active: false, // Открыта ли форма обратной связи
});
</script>

<template>
  <div>
    <DialogFeedBack @isVisible="visibleForm()" v-if="feedbackForm.active" :services="feedBackData" />
    <banner
      bannerText="Водоснабжение и очистка воды в частном доме"
      bannerDescription="Одна из основных задач при обустройстве загородного дома организация водоснабжения.
В основном мы рекомендуем бурить скважины на воду, но в некоторых районах за счет особенностей экосистемы применяются и другие источники воды (колодец, накопительные ёмкости).
Кроме источника воды потребуется монтаж соответствующего оборудования. У нас есть для Вас решение."
      :bannerPrice="state.bannerPrice"
      @isVisible="visibleForm()"
    />
    <OurServices @isVisible="visibleForm()" :dataServices="state.dataServices" title="Услуги по водоснабжению" />
    <WorkOrder :data="dataOrder" title="Как мы работаем" />
    <LocalService serviceTitle="Дополнительно берут" :servicePrice="state.dopServices" />
    <PopularServices title="Популярные услуги" />
    <FeedBackForm title="Оставьте заявку" id="GlobalForm" />
  </div>
</template>

<style lang="scss" scoped></style>
