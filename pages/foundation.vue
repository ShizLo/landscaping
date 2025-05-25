<script setup>
import { useCatalogStore } from "@/stores/modules/catalog.store";

import { useHead } from "#app";
useHead({
  title: "Свайный фундамент под ключ — винтовые сваи с гарантией",
  titleTemplate: "%s %separator %siteName",
  meta: [
    {
      name: "description",
      content:
        "Устройство свайного фундамента под ключ для жилых и коммерческих объектов. Винтовые, буронабивные сваи, расчет несущей способности, монтаж с гарантией.",
    },
    {
      name: "keywords",
      content:
        "свайный фундамент, винтовые сваи, буронабивные сваи, фундамент под дом, укрепление грунта, монтаж свай, строительство фундамента",
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
  // Монтаж фундамента под дом
  state.dataServices[0][0][0].price = catalogStore.getPriceById(2);
  // Обвязка профтрубой
  state.dataServices[1][0][0].price = catalogStore.getPriceById(36);
  // Пробное бурение
  state.dataServices[1][0][1].price = catalogStore.getPriceById(37);
  // Деревянная обвязка
  state.dataServices[0][1][0].price = catalogStore.getPriceById(35);
  // Обвязка уголком
  state.dataServices[0][1][1].price = catalogStore.getPriceById(38);
  // Обвязка швеллером
  state.dataServices[1][1][0].price = catalogStore.getPriceById(39);
  //</Основные услуги>===============================================================================
  //<Банер>================================================================================
  //Монтаж фундамента под дом
  state.bannerPrice[0].price = catalogStore.getPriceById(2);
  //Деревянная обвязка
  state.bannerPrice[1].price = catalogStore.getPriceById(35);
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
  dopServices: initializeDopServicesStructure(),
  loading: false,
});

function initializeBannerStructure() {
  return [
    {
      url: "/images/foundationPage/slider-1.jpg",
      price: "",
      name: "Монтаж фундамента под дом",
    },
    {
      url: "/images/foundationPage/slider-2.jpg",
      price: "",
      name: "Деревянная обвязка",
    },
  ];
}
function initializeServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-big",
          title: "Монтаж фундамента под дом",
          price: "",
          pathImg: img_service_1,
          hoverColors: "rgb(170, 214, 199)",
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Деревянная обвязка",
          price: "",
          pathImg: img_service_2,
          hoverColors: "rgb(204, 209, 255)",
        },
        {
          class: "services__row-item-sm",
          title: "Обвязка уголком",
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
          title: "Обвязка профтрубой",
          price: "",
          pathImg: img_service_4,
          hoverColors: "rgb(255, 229, 204)",
        },
        {
          class: "services__row-item-sm",
          title: "Пробное бурение",
          price: "",
          pathImg: img_service_5,
          hoverColors: "rgb(243, 253, 180)",
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Обвязка швеллером",
          price: "",
          pathImg: img_service_6,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
    ],
  ];
}
function initializeDopServicesStructure() {
  return [
    { urlImg: "", price: "", name: "Отсыпка свайного поля" },
    { urlImg: "", price: "", name: "Планировка и расчистка участка" },
    { urlImg: "", price: "", name: "Ливневка" },
  ];
}
//<Импорт картинок блок "Наши услуги">================================================================================
import img_service_1 from "../assets/images/foundationPage/services-1.png";
import img_service_2 from "../assets/images/foundationPage/services-2.png";
import img_service_3 from "../assets/images/foundationPage/services-3.png";
import img_service_4 from "../assets/images/foundationPage/services-4.png";
import img_service_5 from "../assets/images/foundationPage/services-5.png";
import img_service_6 from "../assets/images/foundationPage/services-6.png";
//</Импорт картинок>===============================================================================

const dataOrder = [
  {
    urlImg: "mdi:chat-processing-outline",
    title: "Заявка",
    text: "Оставьте заявку онлайн на нашем сайте, напишите нам в мессенджер или позвоните по телефону. Наш менеджер свяжется с Вами в течение нескольких минут и ответит на все Ваши вопросы.",
  },
  {
    urlImg: "mdi:calculator-variant-outline",
    title: "Пробное бурение, сметы ",
    text: "Специалист выезжает на участок и выполняет пробное бурение на основание которого составляется смета.",
  },
  {
    urlImg: "mdi:clipboard-check-outline",
    title: "Договор",
    text: "После утверждения сметы мы заключаем договор на выполнение работ. В договоре указываются все условия и сроки выполнения работ.",
  },
  {
    urlImg: "mdi:truck-delivery-outline",
    title: "Доставка и монтаж",
    text: "Мы доставляем и монтируем ваш заказ в удобное для вас время. Наша команда профессиональных монтажников гарантирует качественный монтаж.",
  },
];

const feedBackData = [
  "Монтаж фундамента под дом",
  "Обвязка профтрубой",
  "Пробное бурение",
  "Деревянная обвязка",
  "Обвязка уголком",
  "Обвязка шеллером",
  "Отсыпка свайного поля",
  "Планировка участка",
  "Дренаж и ливневка",
  "Нет в списке",
];
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
    <banner
      bannerText="Монтаж фундамента на винтовых сваях"
      bannerDescription="Быстрое, надежное и экономичное решение для строительства. Обеспечивает прочность основания и подходит для любых грунтовых условий. Различное назначение: фундамент для дома, хоз. построек, забора, фундамент под печти или доп оборудование. Везде где требуется обеспечить жесткое статичное основание."
      :bannerPrice="state.bannerPrice"
      @isVisible="visibleForm()"
    />
    <OurServices @isVisible="visibleForm()" :dataServices="state.dataServices" title="Услуги по фундаменту" />

    <WorkOrder :data="dataOrder" title="Как мы работаем" />
    <LocalService serviceTitle="Дополнительно берут" :servicePrice="state.dopServices" />
    <PopularServices title="Популярные услуги" />
    <FeedBackForm title="Оставьте заявку" id="GlobalForm" />
  </div>
</template>

<style lang="scss" scoped></style>
