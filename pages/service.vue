<script setup>
import { useCatalogStore } from "@/stores/modules/catalog.store";
import { useHead } from "#app";

useHead({
  title: "Обслуживание и ремонт инженерных систем | Септик под ключ, водоснабжение, электроснабжение",
  titleTemplate: "%s %separator %siteName",
  meta: [
    {
      name: "description",
      content:
        "Профессиональное обслуживание и ремонт септиков, систем водоочистки, водоснабжения и электроснабжения. Гарантийное и постгарантийное обслуживание, срочный выезд, комплексное сервисное сопровождение.",
    },
    {
      name: "keywords",
      content:
        "обслуживание септиков, ремонт водоочистки, сервис водоподготовки, ремонт водоснабжения, обслуживание электроснабжения, чистка септика, ремонт фильтров воды, сервис инженерных систем",
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
  // Базовое обслуживание
  state.dataServices[0][0][0].price = catalogStore.getPriceById(72);
  // Чистка фильтрационного колодца
  state.dataServices[1][0][0].price = catalogStore.getPriceById(75);
  // Аварийный выезд
  state.dataServices[1][0][1].price = catalogStore.getPriceById(87);
  // Демонтаж/монтаж насоса
  state.dataServices[0][1][0].price = catalogStore.getPriceById(73);
  // Поплавок с заменой
  state.dataServices[0][1][1].price = catalogStore.getPriceById(74);
  // Консервация
  state.dataServices[1][1][0].price = catalogStore.getPriceById(76);
  //</Основные услуги>===============================================================================
  //<Дополнительные бурут>================================================================================
  // Аварийная сигнализация
  state.dopServices[0][0][0].price = catalogStore.getPriceById(77);
  // Электромагнитный клапан
  state.dopServices[0][0][1].price = catalogStore.getPriceById(78);
  // Замена аэролифта
  state.dopServices[0][1][0].price = catalogStore.getPriceById(79);
  // Ремонт крышки септика
  state.dopServices[0][1][1].price = catalogStore.getPriceById(80);
  // Замена компрессора
  state.dopServices[1][0][0].price = catalogStore.getPriceById(81);
  // Замена аэратора
  state.dopServices[1][0][1].price = catalogStore.getPriceById(82);
  // Наращивание горловины
  state.dopServices[1][1][0].price = catalogStore.getPriceById(83);
  //</Дополнительные берут>===============================================================================
}

const state = reactive({
  price: [],
  dataServices: initializeServicesStructure(),
  dopServices: initializeDopServicesStructure(),
  dataWork: initializeDataWorkStructure(),
  loading: false,
});

function initializeServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-big",
          title: "Базовое обслуживание",
          price: "...",
          pathImg: img_service_3,
          hoverColors: "rgb(170, 214, 199)",
          routePath: "",
          content: [
            {
              text: "Откачка отработанного материала",
            },
            {
              text: "Чистка узлов и переливов",
            },
            {
              text: "Чистка камер септика",
            },
            {
              text: "Обратная сборка и установка",
            },
            {
              text: "Полная проверка работы септика",
            },
            {
              text: "Выезд мастера",
            },
          ],
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Демонтаж/монтаж насоса",
          price: "",
          pathImg: "",
          hoverColors: "rgb(204, 209, 255)",
          routePath: "",
        },
        {
          class: "services__row-item-sm",
          title: "Поплавок с заменой",
          price: "",
          pathImg: img_service_5,
          hoverColors: "rgb(204, 209, 255)",
          routePath: "",
        },
      ],
    ],
    [
      [
        {
          class: "services__row-item-sm",
          title: "Чистка фильтрационного колодца",
          price: "",
          pathImg: "",
          hoverColors: "rgb(204, 209, 255)",
          routePath: "",
        },
        {
          class: "services__row-item-sm",
          title: "Аварийный выезд",
          price: "",
          pathImg: "",
          hoverColors: "rgb(204, 209, 255)",
          routePath: "",
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Консервация",
          price: "...",
          pathImg: img_service_4,
          hoverColors: "rgb(255, 229, 204)",
          routePath: "",
          content: [
            {
              text: "Полная проверка работы септика",
            },
            {
              text: "Изъятие оборудования из станции",
            },
            {
              text: "Обслуживание септика",
            },
            {
              text: "Выезд мастера",
            },
          ],
        },
      ],
    ],
  ];
}

function initializeDopServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-sm",
          title: "Аварийная сигнализация",
          price: "от 9 500 руб.",
          pathImg: img_service_6,
          hoverColors: "rgb(204, 209, 255)",
          routePath: "",
        },
        {
          class: "services__row-item-sm",
          title: "Электромагнитный клапан",
          price: "от 7 500 руб.",
          pathImg: img_service_7,
          hoverColors: "rgb(255, 229, 204)",
          routePath: "",
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Замена аэролифта",
          price: "от 7 500 руб.",
          pathImg: "",
          hoverColors: "rgb(204, 209, 255)",
          routePath: "",
        },
        {
          class: "services__row-item-sm",
          title: "Ремонт крышки септика",
          price: "от 10 000 руб.",
          pathImg: "",
          hoverColors: "rgb(255, 229, 204)",
          routePath: "",
        },
      ],
    ],
    [
      [
        {
          class: "services__row-item-sm",
          title: "Замена компрессора",
          price: "от 6 500 руб.",
          pathImg: img_service_8,
          hoverColors: "rgb(255, 229, 204)",
          routePath: "",
        },
        {
          class: "services__row-item-sm",
          title: "Замена аэратора",
          price: "от 11 000 руб.",
          pathImg: img_service_9,
          hoverColors: "rgb(243, 253, 180)",
          routePath: "",
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Наращивание горловины",
          price: "от 11 000 руб.",
          pathImg: "",
          hoverColors: "rgb(204, 209, 255)",
          routePath: "",
        },
        {
          class: "services__row-item-sm",
          title: "Нет вашей услуги?",
          price: "Поможем!",
          pathImg: "",
          hoverColors: "rgb(255, 229, 204)",
          routePath: "",
        },
      ],
    ],
  ];
}

//<Импорт картинок блок "Наши услуги">================================================================================
import img_service_3 from "../assets/images/homePage/bis-1.webp";
import img_service_4 from "../assets/images/homePage/bis-2.webp";
import img_service_5 from "../assets/images/servicePage/slider/3.png";
import img_service_6 from "../assets/images/servicePage/slider/5.png";
import img_service_7 from "../assets/images/servicePage/slider/2.png";
import img_service_8 from "../assets/images/homePage/work-bis-service-1.webp";
import img_service_9 from "../assets/images/servicePage/slider/4.png";
//</Импорт картинок>===============================================================================

// const dataOrder = [
//   {
//     urlImg: "/icons/homePage/spinner9.svg",
//     title: "Обсуживание",
//     text: "Регулярное обслуживание позволяет предотвратить аварии, продлить срок службы оборудования и обеспечить комфортное проживание в загородном доме. Рекомендуем проводить его не реже 1-2 раз в год.",
//   },
//   {
//     urlImg: "/icons/homePage/checkmark.svg",
//     title: "Консервация",
//     text: "Подготовим системы к длительному простою для защиты оборудования и коммуникаций вызванных низкими температурами, коррозией или другими внешними факторами.",
//   },
//   {
//     urlImg: "/icons/waterPage/hammer.svg",
//     title: "Ремонт",
//     text: "Восстановим работоспособность систем, которые вышли из строя или требующие модернизации.",
//   },
//   {
//     urlImg: "/icons/homePage/cogs.svg",
//     title: "Диагностика",
//     text: "Оценим состояние всех систем и выявим потенциальные проблемы. Проводится как в профилактических целях, так и перед ремонтом, консервацией или после длительного простоя.",
//   },
// ];

function initializeDataWorkStructure() {
  return [
    {
      url: "/media/images/content/services/service-septik-01.jpg",
      title: "Септик",
      work: [
        {
          url: "/media/images/content/services/service-septik-01.jpg",
          alt: "Обслуживание септика",
        },
      ],
    },
    {
      url: "/media/images/content/services/service-septik-02.jpg",
      title: "Септик",
      work: [
        {
          url: "/media/images/content/services/service-septik-02.jpg",
          alt: "Обслуживание септика",
        },
      ],
    },
    {
      url: "/media/images/content/services/service-septik-03.jpg",
      title: "Септик",
      work: [
        {
          url: "/media/images/content/services/service-septik-03.jpg",
          alt: "Обслуживание септика",
        },
      ],
    },
    {
      url: "/media/images/content/services/service-septik-04.jpg",
      title: "Септик",
      work: [
        {
          url: "/media/images/content/services/service-septik-04.jpg",
          alt: "Обслуживание септика",
        },
      ],
    },
    {
      url: "/media/images/content/services/service-septik-05.jpg",
      title: "Септик",
      work: [
        {
          url: "/media/images/content/services/service-septik-05.jpg",
          alt: "Обслуживание септика",
        },
      ],
    },
  ];
}
// const dataWork = [
//   {
//     url: "/media/images/content/services/service-septik-01.jpg",
//     title: "",
//     work: [
//       {
//         url: "/media/images/content/services/service-septik-01.jpg",
//         alt: "Обслуживание септика",
//       },
//     ],
//   },
//   {
//     url: "/media/images/content/services/service-septik-02.jpg",
//     title: "",
//     work: [
//       {
//         url: "/media/images/content/services/service-septik-02.jpg",
//         alt: "Обслуживание септика",
//       },
//     ],
//   },
//   {
//     url: "/media/images/content/services/service-septik-03.jpg",
//     title: "",
//     work: [
//       {
//         url: "/media/images/content/services/service-septik-03.jpg",
//         alt: "Обслуживание септика",
//       },
//     ],
//   },
//   {
//     url: "/media/images/content/services/service-septik-04.jpg",
//     title: "",
//     work: [
//       {
//         url: "/media/images/content/services/service-septik-04.jpg",
//         alt: "Обслуживание септика",
//       },
//     ],
//   },
//   {
//     url: "/media/images/content/services/service-septik-05.jpg",
//     title: "",
//     work: [
//       {
//         url: "/media/images/content/services/service-septik-05.jpg",
//         alt: "Обслуживание септика",
//       },
//     ],
//   },
// ];
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
const feedBackData = ["Аварийный выезд", "Базовое обслуживание", "Консервация", "Проверка тех. состояния", "Нет в списке"];
</script>

<template>
  <div>
    <DialogFeedBack @isVisible="visibleForm()" v-if="feedbackForm.active" :services="feedBackData" />
    <BannerFeedBack />
    <SeptikServices @isVisible="visibleForm()" title="Наши услуги" :dataServices="state.dataServices" :dopServices="state.dopServices" />
    <VariantServiceSlider title="Варианты обслуживания" />
    <WorksSlider :data="state.dataWork" />
    <PriceExpansion />
    <FeedBackForm title="Оставьте заявку" id="GlobalForm" />
  </div>
</template>

<style lang="scss" scoped></style>
