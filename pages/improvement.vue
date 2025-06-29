<script setup>
import { useCatalogStore } from "@/stores/modules/catalog.store";

import { useHead } from "#app";
useHead({
  title: "Благоустройство территории под ключ — комплексные решения",
  titleTemplate: "%s %separator %siteName",
  meta: [
    {
      name: "description",
      content:
        "Комплексное благоустройство территории: озеленение, мощение, освещение, малые архитектурные формы. Проектирование и реализация под ключ с гарантией качества.",
    },
    {
      name: "keywords",
      content:
        "благоустройство территории, озеленение участка, мощение дорожек, ландшафтный дизайн, малые архитектурные формы, освещение участка, двор под ключ",
    },
  ],
});

const catalogStore = useCatalogStore();

onMounted(async () => {
  await catalogStore.loadCatalog();
  updatePrices();
});

function updatePrices() {
  //<Основные услуги>================================================================================
  // Планировка и проектирование
  state.dataServices[0][0][0].price = catalogStore.getPriceById(50);
  // Садовая мебель
  state.dataServices[1][0][0].price = catalogStore.getPriceById(107);
  // Укладка дорожек
  state.dataServices[1][0][1].price = catalogStore.getPriceById(109);
  // Озеленение
  state.dataServices[0][1][0].price = catalogStore.getPriceById(108);
  // Автополив
  state.dataServices[0][1][1].price = catalogStore.getPriceById(110);
  // МаФЫ
  state.dataServices[1][1][0].price = catalogStore.getPriceById(111);
  //</Основные услуги>===============================================================================
  //<Банер>================================================================================
  //Благоустройство
  state.bannerPrice[0].price = catalogStore.getPriceById(7);
  //Ландшафтный проект
  state.bannerPrice[1].price = catalogStore.getPriceById(50);
  //Озеленение участка
  state.bannerPrice[2].price = catalogStore.getPriceById(108);
  //Освещение участка
  state.bannerPrice[3].price = catalogStore.getPriceById(3);
  //</Банер>===============================================================================
  //<Дополнительные бурут>================================================================================
  //Отсыпка свайного поля
  state.dopServices[0].price = catalogStore.getPriceById(40);
  //Планировка и расчистка участка
  state.dopServices[1].price = catalogStore.getPriceById(41);
  //Ливневка
  state.dopServices[2].price = catalogStore.getPriceById(12);
  //</Дополнительные берут>===============================================================================
}

const state = reactive({
  price: [],
  bannerPrice: initializeBannerStructure(),
  dataServices: initializeServicesStructure(),

  loading: false,
});

function initializeBannerStructure() {
  return [
    {
      url: "media/images/content/landscaping/photo-landscaping-04.jpg",
      price: "",
      name: "Благоустройство",
    },
    {
      url: "media/images/content/landscaping/photo-landscaping-07.jpeg",
      price: "",
      name: "Ландшафтный проект",
    },
    {
      url: "media/images/content/landscaping/photo-landscaping-01.jpg",
      price: "",
      name: "Озеленение участка",
    },
    {
      url: "media/images/content/electricity/electricity-street-lighting-01.jpg",
      price: "",
      name: "Освещение участка",
    },
  ];
}
function initializeServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-big",
          title: "Планировка и проектирование",
          price: "",
          pathImg: img_service_1,
          hoverColors: "rgb(170, 214, 199)",
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Озеленение",
          price: "",
          pathImg: img_service_2,
          hoverColors: "rgb(204, 209, 255)",
        },
        {
          class: "services__row-item-sm",
          title: "Автополив",
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
          title: "Садовая мебель",
          price: "",
          pathImg: img_service_4,
          hoverColors: "rgb(255, 229, 204)",
        },
        {
          class: "services__row-item-sm",
          title: "Укладка дорожек",
          price: "",
          pathImg: img_service_5,
          hoverColors: "rgb(243, 253, 180)",
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Малые архитектурные формы",
          price: "",
          pathImg: img_service_6,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
    ],
  ];
}

//<Импорт картинок блок "Наши услуги">================================================================================
import img_service_1 from "../assets/media/images/improvement/improvement-project.webp";
import img_service_2 from "../assets/media/images/improvement/improvement-grass.png";
import img_service_3 from "../assets/media/images/water/water-automatic-watering-01.png";
import img_service_4 from "../assets/media/images/garden/garden-table.png";
import img_service_5 from "../assets/media/images/improvement/improvement-track.png";
import img_service_6 from "../assets/media/images/improvement/improvement-barbecue.png";
//</Импорт картинок>===============================================================================

const dataOrder = [
  {
    urlImg: "mdi:leaf", // Иконка (растения/ландшафт)
    title: "Консультация и замеры",
    text: "Оставьте заявку, и наш специалист приедет на участок для консультации, оценки территории и точных замеров. Мы учтем ваши пожелания и особенности участка.",
  },
  {
    urlImg: "mdi:draw", // Иконка (проектирование)
    title: "Проектирование",
    text: "Разрабатываем индивидуальный дизайн-проект благоустройства с 3D-визуализацией. Согласуем с вами все детали: зонирование, материалы, растения и освещение.",
  },
  {
    urlImg: "mdi:file-sign", // Иконка (договор)
    title: "Договор и подготовка",
    text: "После утверждения проекта заключаем договор с фиксированной сметой и сроками. Завозим материалы и готовим участок к работам.",
  },
  {
    urlImg: "mdi:shovel", // Иконка (работы)
    title: "Реализация",
    text: "Выполняем все этапы благоустройства: мощение, озеленение, установку малых архитектурных форм, системы полива и освещения. Сдаем объект «под ключ» с гарантией.",
  },
];

const feedBackData = ["Планировка и проект", "Садовая мебель", "Укладка дорожек", "Озеленение", "Автополив", "МАФы", "Нет в списке"];
function visibleForm() {
  if (!feedbackForm.active) {
    feedbackForm.active = true;
  } else {
    feedbackForm.active = false;
  }
}
const feedbackForm = reactive({
  active: false, // Открыта ли форма обратной связи
});
</script>
<template>
  <div>
    <DialogFeedBack @isVisible="visibleForm()" v-if="feedbackForm.active" :services="feedBackData" />
    <banner bannerText="Благоустройство участка под ключ" :bannerPrice="state.bannerPrice" @isVisible="visibleForm()" />
    <OurServices @isVisible="visibleForm()" :dataServices="state.dataServices" title="Услуги по благоустройству" />
    <WorkOrder :data="dataOrder" title="Как мы работаем" />

    <PopularServices title="Популярные услуги" />
    <FeedBackForm title="Оставьте заявку" id="GlobalForm" />
  </div>
</template>

<style lang="scss" scoped></style>
