<script setup>
import { useCatalogStore } from "@/stores/modules/catalog.store";

const catalogStore = useCatalogStore();

import { useHead } from "#app";
useHead({
  title: "Заборы из штакетника, сетки Гиттер и профнастила — монтаж под ключ | БИС",
  meta: [
    {
      name: "description",
      content:
        "Монтаж заборов из штакетника, сетки Гиттер (3D), профнастила и других материалов. Надежные ограждения под ключ с гарантией.",
    },
    {
      name: "keywords",
      content: "установка заборов, забор из штакетника, сетка Гиттер, 3D забор, ограждение участка, забор под ключ, монтаж забора",
    },
  ],
});

onMounted(async () => {
  await catalogStore.loadCatalog();
  updatePrices();
});

//<Импорт картинок блок наши услуги>================================================================================
import img_service_1 from "../assets/images/fencePage/services-2.webp";
import img_service_2 from "../assets/images/fencePage/services-1.png";
import img_service_3 from "../assets/images/fencePage/services-3.webp";
import img_service_4 from "../assets/images/fencePage/services-4.webp";
import img_service_5 from "../assets/images/fencePage/services-6.webp";
import img_service_6 from "../assets/images/fencePage/services-5.webp";
//</Импорт картинок>===============================================================================
//<Импорт картинок доп услуг>================================================================================
import dop_img from "/images/fence/dop-1.png";
import dop_img_2 from "/images/fence/dop-2.png";
import dop_img_3 from "/images/fence/dop-3+.png";
import dop_img_4 from "/images/fence/dop-5+.png";
import dop_img_5 from "/images/fence/dop-4+.png";
import dop_img_6 from "/images/fence/dop-6.png";
//</Импорт картинок доп услуг>===============================================================================

function updatePrices() {
  //<Банер>================================================================================
  // Забор из металлического штакетника
  state.bannerPrice[0].price = catalogStore.getPriceById(16);
  // Забор из профлиста
  state.bannerPrice[1].price = catalogStore.getPriceById(17);
  // Забор из деревянного штакетника
  state.bannerPrice[2].price = catalogStore.getPriceById(18);
  // Забор из сетки гиттер
  state.bannerPrice[3].price = catalogStore.getPriceById(19);
  // Забор из бруска
  state.bannerPrice[4].price = catalogStore.getPriceById(20);
  // Установка автоматики
  state.bannerPrice[5].price = catalogStore.getPriceById(21);
  //</Банер>===============================================================================
  //<Услуги>================================================================================
  // Забор из металлического штакетника
  state.dataServices[0][0][0].price = catalogStore.getPriceById(16);
  // Забор из сетки гиттер
  state.dataServices[1][0][0].price = catalogStore.getPriceById(19);
  // Забор из бруска
  state.dataServices[1][0][1].price = catalogStore.getPriceById(20);
  // Забор из профлиста
  state.dataServices[0][1][0].price = catalogStore.getPriceById(17);
  // Забор из деревянного штакетника
  state.dataServices[0][1][1].price = catalogStore.getPriceById(18);
  // Забор из сетки рабица
  state.dataServices[1][1][0].price = catalogStore.getPriceById(22);
  //</Услуги>===============================================================================
  //<Дополнительно берут>================================================================================
  // Автоматика;
  state.servicePrice[0].price = catalogStore.getPriceById(21);
  // Уличное освещение
  state.servicePrice[1].price = catalogStore.getPriceById(23);
  // Организация парковки и заезда
  state.servicePrice[2].price = catalogStore.getPriceById(24);
  // Откатные ворота
  state.servicePrice[3].price = catalogStore.getPriceById(8);
  // Распашные ворота
  state.servicePrice[4].price = catalogStore.getPriceById(25);
  //</Дополнительно берут>===============================================================================
}

const state = reactive({
  price: [],
  bannerPrice: initializeBannerStructure(),
  dataServices: initializeServicesStructure(),
  servicePrice: initializeServicePriceStructure(),
  loading: false,
});

function initializeBannerStructure() {
  return [
    {
      url: "/images/fence/banner-2.webp",
      price: "",
      name: "Забор из металлического штакетника",
    },
    {
      url: "/images/fence/banner-1.jpg",
      price: "",
      name: "Забор из профлиста",
    },
    {
      url: "/images/fence/banner-3.webp",
      price: "",
      name: "Забор из деревянного штакетника",
    },
    {
      url: "/images/fence/banner-4.jpg",
      price: "",
      name: "Забор из сетки гиттер",
    },

    {
      url: "/images/fence/banner-6.jpg",
      price: "",
      name: "Забор из бруска",
    },
    {
      url: "/images/fence/banner-5.jpg",
      price: "",
      name: "Установка автоматики",
    },
  ];
}
function initializeServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-big",
          title: "Забор из металлического штакетника",
          price: "",
          pathImg: img_service_1,
          hoverColors: "rgb(170, 214, 199)",
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Забор из профлиста",
          price: "",
          pathImg: img_service_2,
          hoverColors: "rgb(204, 209, 255)",
        },
        {
          class: "services__row-item-sm",
          title: "Забор из деревянного штакетника",
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
          title: "Забор из сетки гиттер (3D сетка)",
          price: "",
          pathImg: img_service_4,
          hoverColors: "rgb(255, 229, 204)",
        },
        {
          class: "services__row-item-sm",
          title: "Забор и оргаждения из бруска",
          price: "",
          pathImg: img_service_5,
          hoverColors: "rgb(243, 253, 180)",
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Забор из сетки рабица",
          price: "",
          pathImg: img_service_6,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
    ],
  ];
}
function initializeServicePriceStructure() {
  return [
    { urlImg: dop_img, price: "", name: "Установка автоматики" },
    { urlImg: dop_img_2, price: "", name: "Монтаж уличного освещения" },
    { urlImg: dop_img_3, price: "", name: "Организация парковки и заезда" },
    { urlImg: dop_img_4, price: "", name: "Откатные ворота" },
    { urlImg: dop_img_5, price: "", name: "Распашные ворота" },
    { urlImg: dop_img_6, price: "", name: "Дополнительные услуги" },
  ];
}
const dataOrder = [
  {
    urlImg: "mdi:chat-processing-outline",
    title: "Заявка",
    text: "Оставьте заявку онлайн на нашем сайте, напишите нам в мессенджер или позвоните по телефону. Наш менеджер свяжется с Вами в течении нескольких минут.",
  },
  {
    urlImg: "mdi:calculator-variant-outline",
    title: "Расчёты, сметы",
    text: "Мы проводим расчет стоимости и составляем смету, учитывая все Ваши пожелания и требования.",
  },
  {
    urlImg: "mdi:clipboard-check-outline",
    title: "Договор",
    text: "После утверждения сметы мы заключаем договор на выполнение работ. В договоре указываются все условия и сроки выполнения работ.",
  },
  {
    urlImg: "mdi:truck-delivery-outline",
    title: "Доставка и монтаж",
    text: "Доставляем и монтируем заказ в удобное для Вас время. Наша команда гарантирует качественный монтаж и безупречную работу оборудования.",
  },
];
const feedBackData = [
  "Забор из мет. штакетника",
  "Забор из профлиста",
  "Забор из дер. штакетника",
  "Забор из сетки гиттер",
  "Забор из бруска",
  "Забор из сетки рабица",
  "Автоматика",
  "Ворота",
  "Освещение",
  "Доп. услуги",
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
  <DialogFeedBack @isVisible="visibleForm()" v-if="feedbackForm.active" :services="feedBackData" />
  <banner
    bannerText="Заборы и ограждения"
    bannerDescription="Забор нужен для защиты вашего дома от посторонних, а также выделить и огородить четкие границы вашей территории. Устанавливаем заборы на винтовых сваях, что обеспечивает длительный срок службы."
    :bannerPrice="state.bannerPrice"
    @isVisible="visibleForm()"
  />
  <OurServices @isVisible="visibleForm()" :dataServices="state.dataServices" title="Наши услуги по заборам" />
  <WorkOrder :data="dataOrder" title="Как мы работаем" />
  <LocalService serviceTitle="Дополнительно берут" :servicePrice="state.servicePrice" />
  <PopularServices title="Популярные услуги" />
  <FeedBackForm title="Закажите установку забора" id="GlobalForm" />
</template>

<style lang="scss" scoped></style>
