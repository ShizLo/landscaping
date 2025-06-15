<script setup>
import { ROUTES_PATHS } from "./assets/constants";

const catalogStore = useCatalogStore();

import { useHead } from "#app";
useHead({
  title: "Благоустройство и инженерные сети",
  titleTemplate: "%s %separator %siteName",
  meta: [
    {
      name: "description",
      content:
        "Компания «БИС» — профессиональные услуги по благоустройству участков и монтажу инженерных сетей. Полный цикл работ: от проектирования до реализации. Гарантия качества, современные технологии, индивидуальный подход.",
    },
    {
      name: "keywords",
      content:
        "благоустройство участка, инженерные сети, строительство под ключ, проектирование участка, дренаж, ливневая канализация, септик, фундамент, водоподготовка, электромонтаж",
    },
  ],
});

const state = reactive({
  bannerPrice: initializeBannerStructure(),
  dataServices: initializeServicesStructure(),
  dopServices: initializeDopServicesStructure(),
  dataWork: initializeDataWorkStructure(),
});
function initializeBannerStructure() {
  return [
    {
      url: "/images/swiperBanner/banner-1.jpg",
      price: "",
      name: "Благоустройство",
      routerPath: "/",
      alt: "Благоустройсто участка | БИС",
    },
    {
      url: "/images/swiperBanner/swiper-slide-1.webp",
      price: "",
      name: "Установка забора",
      routerPath: ROUTES_PATHS.FENCE,
    },
    {
      url: "/images/swiperBanner/swiper-slide-2.webp",
      price: "",
      name: "Свайное поле",
      routerPath: ROUTES_PATHS.FAUNDATION,
    },
    {
      url: "/images/swiperBanner/banner-3.jpg",
      price: "",
      name: "Откатные ворота",
      routerPath: ROUTES_PATHS.FENCE,
    },
    {
      url: "/images/swiperBanner/swiper-slide-4.webp",
      price: "",
      name: "Парковка",
      routerPath: "/",
    },
    {
      url: "/images/swiperBanner/swiper-slide-5.webp",
      price: "",
      name: "Водоподготовка",
      routerPath: ROUTES_PATHS.WATER,
    },
    {
      url: "/images/swiperBanner/swiper-slide-6.webp",
      price: "",
      name: "Септик под ключ",
      routerPath: "/",
    },
  ];
}
function initializeServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-big",
          title: "Септик под ключ",
          price: "",
          pathImg: img_service_1,
          hoverColors: "rgb(170, 214, 199)",
          garanty: [
            {
              icon: garantyIcon,
              text: "Гарантия качества",
            },
            {
              icon: keyIcon,
              text: "Работа под ключ",
            },
            {
              icon: montagIcon,
              text: "Быстрый монтаж",
            },
          ],
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Водоснабжение",
          price: "",
          pathImg: img_service_2,
          hoverColors: "rgb(204, 209, 255)",
          routePath: ROUTES_PATHS.WATER,
        },
        {
          class: "services__row-item-sm",
          title: "Установка заборов",
          price: "",
          pathImg: img_service_3,
          hoverColors: "rgb(255, 229, 204)",
          routePath: ROUTES_PATHS.FENCE,
        },
      ],
    ],
    [
      [
        {
          class: "services__row-item-sm",
          title: "Фундамент",
          price: "",
          pathImg: img_service_4,
          hoverColors: "rgb(255, 229, 204)",
          routePath: ROUTES_PATHS.FAUNDATION,
        },
        {
          class: "services__row-item-sm",
          title: "Электромонтаж",
          price: "",
          pathImg: img_service_5,
          hoverColors: "rgb(243, 253, 180)",
          routePath: ROUTES_PATHS.ELECTRICITY,
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Проект участка и топографическая съемка",
          price: "",
          pathImg: img_service_6,
          hoverColors: "rgb(255, 229, 204)",
          routePath: ROUTES_PATHS.TOPOGRAPHY,
          garanty: [
            {
              icon: projectIcon,
              text: "Визуализация проекта",
            },
            {
              icon: keyIcon,
              text: "Работа под ключ",
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
          class: "services__row-item-big",
          title: "Благоустройство",
          price: "",
          pathImg: img_service_12,
          hoverColors: "rgb(170, 214, 199)",
          garanty: [
            {
              icon: contractIcon,
              text: "Гарантия по договору",
            },
            {
              icon: projectIcon,
              text: "Визуализация проекта",
            },
            {
              icon: keyIcon,
              text: "Работа под ключ",
            },
          ],
        },
      ],
      [
        {
          class: "services__row-item-sm",
          title: "Бурение скважин",
          price: "",
          pathImg: img_service_7,
          hoverColors: "rgb(204, 209, 255)",
          routePath: ROUTES_PATHS.WATER,
        },
        {
          class: "services__row-item-sm",
          title: "Садовая мебель",
          price: "",
          pathImg: garden_table,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
    ],
    [
      [
        {
          class: "services__row-item-sm",
          title: "Обустройство дренажа",
          price: "",
          pathImg: img_service_9,
          hoverColors: "rgb(255, 229, 204)",
          routePath: ROUTES_PATHS.DRAINAGE,
        },
        {
          class: "services__row-item-sm",
          title: "Обустройство колодца",
          price: "",
          pathImg: img_service_10,
          hoverColors: "rgb(243, 253, 180)",
          routePath: ROUTES_PATHS.WATER,
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "БИС сервис",
          price: "",
          pathImg: img_service_11,
          hoverColors: "rgb(255, 229, 204)",
          routePath: ROUTES_PATHS.SERVICE,
          garanty: [
            {
              icon: garantyIcon,
              text: "Гарантия качества",
            },
            {
              icon: likeIcon,
              text: "Лучшие мастера",
            },
            {
              icon: carIcon,
              text: "Быстрый выезд",
            },
          ],
        },
      ],
    ],
  ];
}
function initializeDataWorkStructure() {
  return [
    {
      url: "/media/images/content/landscaping/photo-landscaping-01.jpg",
      title: "Озеленение",
      work: [
        {
          url: "/media/images/content/landscaping/photo-landscaping-01.jpg",
          alt: "Озеленение",
        },
        {
          url: "/media/images/content/landscaping/photo-landscaping-02.jpg",
          alt: "Озеленение",
        },
        {
          url: "/media/images/content/landscaping/photo-landscaping-03.webp",
          alt: "Озеленение",
        },
      ],
    },
    {
      url: "/media/images/content/gates/gate-sliding-01.jpeg",
      title: "Откатные ворота",
      work: [
        {
          url: "/media/images/content/gates/gate-sliding-01.jpeg",
          alt: "Откатные ворота",
        },
        {
          url: "/media/images/content/gates/gate-sliding-02.jpg",
          alt: "Откатные ворота",
        },
        {
          url: "/media/images/content/gates/gate-sliding-03.jpg",
          alt: "Откатные ворота",
        },
        {
          url: "/media/images/content/gates/gate-sliding-04.jpeg",
          alt: "Откатные ворота",
        },
      ],
    },
    {
      url: "/media/images/content/arrival/arrival-rough-run-01.jpg",
      title: "Черновой заезд",
      work: [
        {
          url: "/media/images/content/arrival/arrival-rough-run-01.jpg",
          alt: "Заезд на участок",
        },
      ],
    },

    {
      url: "/media/images/content/fence/fence-metal-picket-01.jpeg",
      title: "Забор из штакетника",
      work: [
        {
          url: "/media/images/content/fence/fence-metal-picket-01.jpeg",
          alt: "Забор из штакетника",
        },
        {
          url: "/media/images/content/fence/fence-metal-picket-02.jpg",
          alt: "Забор из штакетника",
        },

        {
          url: "/media/images/content/fence/fence-wooden-picket-01.jpeg",
          alt: "Забор из штакетника",
        },
        {
          url: "/media/images/content/fence/fence-metal-picket-03.jpeg",
          alt: "Забор из штакетника",
        },
        {
          url: "/media/images/content/fence/fence-metal-picket-04.jpeg",
          alt: "Забор из штакетника",
        },
        {
          url: "/media/images/content/fence/fence-metal-picket-05.jpeg",
          alt: "Забор из штакетника",
        },
        {
          url: "/media/images/content/fence/fence-metal-picket-06.jpeg",
          alt: "Забор из штакетника",
        },
      ],
    },
    {
      url: "/media/images/content/electricity/electricity-street-lighting-01.jpg",
      title: "Уличное освещение",
      work: [
        {
          url: "/media/images/content/electricity/electricity-street-lighting-01.jpg",
          alt: "Уличное освещение",
        },
        {
          url: "/media/images/content/electricity/electricity-street-lighting-02.jpg",
          alt: "Уличное освещение",
        },
      ],
    },
    {
      url: "/media/images/content/foundation/foundation-installation-01.webp",
      title: "Монтаж фундамента",
      work: [
        {
          url: "/media/images/content/foundation/foundation-installation-01.webp",
          alt: "Свайное поле",
        },
        {
          url: "/media/images/content/foundation/foundation-installation-02.webp",
          alt: "Свайное поле",
        },
        {
          url: "/media/images/content/foundation/foundation-installation-03.webp",
          alt: "Свайное поле",
        },
        {
          url: "/media/images/content/foundation/foundation-installation-04.webp",
          alt: "Свайное поле",
        },
        {
          url: "/media/images/content/foundation/foundation-installation-05.jpg",
          alt: "Свайное поле",
        },
        {
          url: "/media/images/content/foundation/foundation-installation-06.jpg",
          alt: "Свайное поле",
        },
        {
          url: "/media/images/content/foundation/foundation-installation-07.jpeg",
          alt: "Свайное поле",
        },
        {
          url: "/media/images/content/foundation/foundation-installation-08.jpg",
          alt: "Свайное поле",
        },
      ],
    },
    {
      url: "/media/images/content/fence/fence-gitter-mesh-01.jpg",
      title: "Забор из гиттера",
      work: [
        {
          url: "/media/images/content/fence/fence-gitter-mesh-01.jpg",
          alt: "Забор из гиттера",
        },
        {
          url: "/media/images/content/fence/fence-gitter-mesh-02.jpeg",
          alt: "Забор из гиттера",
        },
      ],
    },

    {
      url: "/media/images/content/topography/topography-removal-boundaries-01.jpeg",
      title: "Вынос границ участка",
      work: [
        {
          url: "/media/images/content/topography/topography-removal-boundaries-01.jpeg",
          alt: "Вынос границ",
        },
      ],
    },
    {
      url: "/media/images/content/preparation/preparation-clearning-01.jpg",
      title: "Расчистка участка",
      work: [
        {
          url: "/media/images/content/preparation/preparation-clearning-01.jpg",
          alt: "Расчистка участка",
        },
      ],
    },
  ];
}
onMounted(async () => {
  await catalogStore.loadCatalog();
  updatePrices();
});

function updatePrices() {
  // Для септика (первый элемент)
  // state.dataServices[0][0][0].price = state.price[0].price;
  state.dataServices[0][0][0].price = catalogStore.getPriceById(1);
  // Фундамент
  state.dataServices[1][0][0].price = catalogStore.getPriceById(2);
  // Электромонтаж
  state.dataServices[1][0][1].price = catalogStore.getPriceById(3);
  // Водоснабжение
  state.dataServices[0][1][0].price = catalogStore.getPriceById(4);
  // Заборы
  state.dataServices[0][1][1].price = catalogStore.getPriceById(5);
  // Проект участка
  state.dataServices[1][1][0].price = catalogStore.getPriceById(6);
  //<Банер>================================================================================
  //Благоустройство
  state.bannerPrice[0].price = catalogStore.getPriceById(7);
  //Заборы
  state.bannerPrice[1].price = catalogStore.getPriceById(5);
  //Свайное поле
  state.bannerPrice[2].price = catalogStore.getPriceById(2);
  //Откатные ворота
  state.bannerPrice[3].price = catalogStore.getPriceById(8);
  //Парковка
  state.bannerPrice[4].price = catalogStore.getPriceById(9);
  //Водоподготовка
  state.bannerPrice[5].price = catalogStore.getPriceById(10);
  //Септик под ключ
  state.bannerPrice[6].price = catalogStore.getPriceById(1);
  //</Банер>===============================================================================
  //<Дополнительные услуги>================================================================================
  // Благоустройство
  state.dopServices[0][0][0].price = catalogStore.getPriceById(7);
  // Обустройство дренажа
  state.dopServices[1][0][0].price = catalogStore.getPriceById(13);
  // Обустройство колодца
  state.dopServices[1][0][1].price = catalogStore.getPriceById(14);
  // Бурение скважин
  state.dopServices[0][1][0].price = catalogStore.getPriceById(11);
  // Садовая мебель
  state.dopServices[0][1][1].price = catalogStore.getPriceById(107);
  // Бис сервис
  state.dopServices[1][1][0].price = catalogStore.getPriceById(15);
  //</Дополнительные услуги>===============================================================================
}

//<Импорт картинок блок "Наши услуги">================================================================================
import img_service_1 from "./assets/images/services/home/service-septik.webp";
import img_service_2 from "./assets/images/services/water/service-caisson.webp";
import img_service_3 from "./assets/images/services/fence/service-metal-picket-fence.webp";
import img_service_4 from "./assets/images/services/foundation/service-metal-piles.webp";
import img_service_5 from "./assets/images/services/electricity/service-street-lamp.webp";
import img_service_6 from "./assets/images/services/topography/service-site-project.png";
import img_service_7 from "./assets/images/services/water/service-borehole-drill.webp";
import img_service_8 from "./assets/images/services/drainage/service-storm-drain.webp";
import garden_table from "./assets/media/images/garden/garden-table.png";
import img_service_9 from "./assets/images/services/drainage/service-drainage-pipe.webp";
import img_service_10 from "./assets/images/services/water/service-well-pump.webp";
import img_service_11 from "./assets/images/services/home/service-department.png";
import img_service_12 from "./assets/images/services/home/service-improvement.webp";

//</Импорт картинок>===============================================================================

//<Импорт картинок блок "Наши работы">================================================================================
import img_work_1 from "./assets/images/homePage/works/1.jpg";
import img_work_2 from "./assets/images/homePage/works/2.jpg";
import img_work_3 from "./assets/images/homePage/works/3.jpg";
import img_work_4 from "./assets/images/homePage/works/4.jpg";
import img_work_5 from "./assets/images/homePage/works/5.jpg";
import img_work_6 from "./assets/images/homePage/works/6.jpg";
import img_work_7 from "./assets/images/homePage/works/7.jpg";
import img_work_8 from "./assets/images/homePage/works/8.jpg";

//</Импорт картинок>===============================================================================

//<Импорт картинок блок "Галерея">================================================================================
// import greenPark_1 from "./assets/images/workPhoto/greenPark/1.jpg";
// import greenPark_2 from "./assets/images/workPhoto/greenPark/2.webp";
// import greenPark_3 from "./assets/images/workPhoto/greenPark/3.jpg";
// import greenPark_4 from "./assets/images/workPhoto/greenPark/4.jpg";

import foundation_1 from "./assets/images/workPhoto/foundation/1.webp";
import foundation_2 from "./assets/images/workPhoto/foundation/2.webp";
import foundation_3 from "./assets/images/workPhoto/foundation/3.webp";
import foundation_4 from "./assets/images/workPhoto/foundation/4.webp";
import foundation_5 from "./assets/images/workPhoto/foundation/7.jpg";
import foundation_6 from "./assets/images/workPhoto/foundation/8.jpg";
import foundation_7 from "./assets/images/workPhoto/foundation/9.jpeg";
import foundation_8 from "../assets/images/workPhoto/foundation/10.jpg";

import electricity_1 from "./assets/images/workPhoto/electricity/1.jpg";

// import gate_1 from "./assets/images/workPhoto/slidingGate/1.jpeg";
// import gate_2 from "./assets/images/workPhoto/slidingGate/2.jpg";
// import gate_3 from "./assets/images/workPhoto/slidingGate/3.jpeg";

import fence_1 from "./assets/images/workPhoto/fence/1.jpeg";
import fence_2 from "./assets/images/workPhoto/fence/2.jpeg";
import fence_3 from "./assets/images/workPhoto/fence/3.jpeg";
import fence_4 from "./assets/images/workPhoto/fence/4.jpeg";
import fence_5 from "./assets/images/workPhoto/fence/5.jpeg";
import fence_6 from "./assets/images/workPhoto/fence/6.jpeg";

import gitter_1 from "./assets/images/workPhoto/gitter/1.jpeg";

import borders_1 from "./assets/images/workPhoto/borders/1.jpeg";

//</Импорт картинок>===============================================================================

import garantyIcon from "./assets/icons/Icons_BIS/SVG/garantyQuolity.svg";
import keyIcon from "./assets/icons/Icons_BIS/SVG/workKey.svg";
import montagIcon from "./assets/icons/Icons_BIS/SVG/montag.svg";
import projectIcon from "./assets/icons/Icons_BIS/SVG/project.svg";
import carIcon from "./assets/icons/Icons_BIS/SVG/car.svg";
import likeIcon from "./assets/icons/Icons_BIS/SVG/like.svg";
import contractIcon from "./assets/icons/Icons_BIS/SVG/contract.svg";

const dataOrder = [
  {
    urlImg: "mdi:reload",
    title: "Делаем полный цикл",
    text: "Мы беремся за реализацию всего цикла от проектирования до организации газона. Большой набор услуг позволяет закрыть большую часть потребностей в 'одном окне', что позволяет не тратить время на согласования, коллаборации и экономит средства.",
  },
  {
    urlImg: "mdi-badge-account-outline",
    title: "Индивидуальный подход",
    text: "Как не бывает двух одинаковых заказчиков, так и нет полностью идентичных участков. Наши инженеры и ландшафтный дизайнер помогут создать индивидуальный ландшафт и грамотно разместить коммуникации, учитывая все особенности участка.",
  },
  {
    urlImg: "mdi:certificate-outline",
    title: "Гарантия качества",
    text: "Гарантируем качество наших работ и оперативно реагируем в случае когда, что-то пошло не так. ",
  },
  {
    urlImg: "mdi:wrench-clock-outline",
    title: "Служба сервиса",
    text: "Если заказываете сервис у нас, то помимо сезонного обслуживания получаете и расширенную* гарантию. После монтажа оборудования наш специалист сам будет отслеживать и напоминать вам о необходимости провести ТО.",
  },
  {
    urlImg: "mdi:calculator-variant-outline",
    title: "Прозрачная смета",
    text: "После первичной встречи на участке составляется визуализация вашего участка с привязками и размерами. Это позволяет точно составить подробную смету. Цена в большинстве случаев фиксируется или в смете указаны пункты, корректируемые по факту.",
  },
];
const dataBisService = [
  {
    urlImg: "",
    title: "Уборка участка",
    // price: [{ text: "Вывоз мусора" }, { text: "Уборка крыши" }, { text: "Чистка террасы" }, { text: "..." }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },
  {
    urlImg: "",
    title: "Генераторы",
    // price: [{ text: "ТО и сервис" }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },

  {
    urlImg: "url(/images/waterPage/water-6@0.5x.webp)",
    title: "Водоподготовка",
    // price: [{ text: "Анализ воды" }, { text: "Обслуживание" }, { text: "Ремонт" }, { text: "Магистральный фильтр" }, { text: "..." }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },

  {
    urlImg: "url(/images/waterPage/bis-service-1+.webp)",
    title: "Водоочистка",
    // price: [{ text: "Замена картриджей" }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },
  {
    urlImg: "url(/images/globalServices/services-1+.webp)",
    title: "Септики",
    // price: [{ text: "Обслуживание" }, { text: "Консервация" }, { text: "Ремонт" }, { text: "Диагностика" }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },
  {
    urlImg: "url(/images/waterPage/bis-service-2+.webp)",
    title: "Бойлеры",
    // price: [{ text: "Обслуживание" }, { text: "Диагностика" }, { text: "Замена тена" }, { text: "Чистка от накипи" }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },
  {
    urlImg: "url(/images/globalServices/sticker.png)",
    title: "Водоснабжение",
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },
  {
    urlImg: "",
    title: "Газон",
    // price: [{ text: "Стрижка" }, { text: "Аэрация" }, { text: "Восстановление" }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },
  {
    urlImg: "",
    title: "Водопровод",
    // price: [{ text: "Разморозка" }],
    price: [{ text: "Подробнее" }],
    routePath: ROUTES_PATHS.SERVICE,
  },
];
const feedBackData = [
  "Садовая мебель",
  "Проект участка",
  "Свайный фундамент",
  "Септик под ключ",
  "Водоподготовка",
  "Водоснабжение",
  "Дренаж",
  "Электромонтаж",
  "Благоустройство",
  "Заборы",
  "Сервис",
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
    <Banner
      style="white-space: pre-line"
      bannerText="Инженерные коммуникации и благоустройство участка"
      :bannerPrice="state.bannerPrice"
      @isVisible="visibleForm()"
      stikers="true"
    />
    <OurServices @isVisible="visibleForm()" :dataServices="state.dataServices" :dopServices="state.dopServices" title="Наши услуги" />
    <BisService title="БИС Сервис" :data="dataBisService" />
    <WorksSlider :data="state.dataWork" />
    <WorkOrder :data="dataOrder" title="За что нас ценят" />
    <Partners />
    <AboutUs />
    <Commands />
    <FeedBackForm title="Оставьте заявку" id="GlobalForm" />
  </div>
</template>
