<script setup>
import { useCatalogStore } from "@/stores/modules/catalog.store";

const catalogStore = useCatalogStore();
import { useHead } from "#app";
useHead({
  title: "Топосъемка и проектирование участка — геодезия, 3D-планирование",
  titleTemplate: "%s %separator %siteName",
  meta: [
    {
      name: "description",
      content:
        "Профессиональное проектирование участка и топографическая съемка для точного планирования строительства и ландшафтных работ. Геодезические изыскания, 3D-моделирование, согласование документации.",
    },
    {
      name: "keywords",
      content:
        "проектирование участка, топографическая съемка, геодезия, план участка, межевание, ландшафтный дизайн, 3D-моделирование, геодезические работы",
    },
  ],
});

onMounted(async () => {
  await catalogStore.loadCatalog();
  updatePrices();
});

function updatePrices() {
  //<Основные услуги>================================================================================
  // Вынос в натуру
  state.dataServices[0][0][0].price = catalogStore.getPriceById(48);
  // Полный ландшафтный проект
  state.dataServices[0][1][0].price = catalogStore.getPriceById(51);
  // Эскизный проект
  state.dataServices[1][0][0].price = catalogStore.getPriceById(50);
  // Топографическая съемка
  state.dataServices[1][1][0].price = catalogStore.getPriceById(47);
  //</Основные услуги>===============================================================================
  //<Банер>================================================================================
  //Топографическая съемка
  state.bannerPrice[0].price = catalogStore.getPriceById(47);
  //Вынос границ земельного участка
  state.bannerPrice[1].price = catalogStore.getPriceById(48);
  //Проектирование и ландшафтный дизайн
  state.bannerPrice[2].price = catalogStore.getPriceById(49);
  //Эскизный ландшафтный проект
  state.bannerPrice[3].price = catalogStore.getPriceById(50);
  //Полный ландшафтный проект
  state.bannerPrice[4].price = catalogStore.getPriceById(51);
  //Вместе будет дешевле
  state.bannerPrice[5].price = catalogStore.getPriceById(52);
  //</Банер>===============================================================================
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
      url: "/images/topographyPage/banner-1.webp",
      price: "",
      name: "Топографическая съемка",
    },
    {
      url: "/images/topographyPage/banner-2.jpeg",
      price: "",
      name: "Вынос границ земельного участка",
    },
    {
      url: "/images/topographyPage/banner-3.webp",
      price: "",
      name: "Проектирование и ландшафтный дизайн",
    },
    {
      url: "/images/topographyPage/banner-4.webp",
      price: "",
      name: "Эскизный ландшафтный проект",
    },
    {
      url: "/images/topographyPage/banner-5.jpeg",
      price: "",
      name: "Полный ландшафтный проект",
    },
    {
      url: "/images/topographyPage/banner-6.webp",
      price: "",
      name: "Вместе будет дешевле",
    },
  ];
}
function initializeServicesStructure() {
  return [
    [
      [
        {
          class: "services__row-item-big",
          title: "Вынос в натуру границ земельного участка",
          price: "",
          pathImg: img_service_1,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Полный ландшафтный проект",
          price: "",
          pathImg: img_service_3,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
    ],
    [
      [
        {
          class: "services__row-item-big",
          title: "Эскизный проект",
          price: "",
          pathImg: img_service_2,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
      [
        {
          class: "services__row-item-big",
          title: "Топографическая съемка",
          price: "",
          pathImg: img_service_4,
          hoverColors: "rgb(255, 229, 204)",
        },
      ],
    ],
  ];
}

//<Импорт картинок блок наши услуги>================================================================================
import img_service_1 from "../assets/images/topographyPage/services-1.webp";
import img_service_2 from "../assets/images/topographyPage/services-2.webp";
import img_service_3 from "../assets/images/topographyPage/services-3.webp";
import img_service_4 from "../assets/images/topographyPage/services-4.webp";
//</Импорт картинок>===============================================================================

const dataServices = [
  [
    [
      {
        class: "services__row-item-big",
        title: "Вынос в натуру границ земельного участка",
        price: "от 6 000 руб.",
        pathImg: img_service_1,
        hoverColors: "rgb(255, 229, 204)",
      },
    ],
    [
      {
        class: "services__row-item-big",
        title: "Полный ландшафтный проект",
        price: "от 65 000 руб.",
        pathImg: img_service_3,
        hoverColors: "rgb(255, 229, 204)",
      },
      // {
      //   class: "services__row-item-sm",
      //   title: "Эскизный проект",
      //   price: "",
      //   pathImg: "",
      //   hoverColors: "rgb(255, 229, 204)",
      // },
    ],
  ],
  [
    [
      {
        class: "services__row-item-big",
        title: "Эскизный проект",
        price: "от 22 000 руб.",
        pathImg: img_service_2,
        hoverColors: "rgb(255, 229, 204)",
      },
    ],
    [
      {
        class: "services__row-item-big",
        title: "Топографическая съемка",
        price: "от 12 000 руб.",
        pathImg: img_service_4,
        hoverColors: "rgb(255, 229, 204)",
      },
    ],
  ],
];
const servicePrice = [
  { urlImg: "url(/images/fence/dop-1.png)", price: "от 60 000 руб.", name: "Установка автоматики" },
  { urlImg: "url(/images/fence/dop-2.png", price: "от 10 000 руб.", name: "Освещение участка" },
  { urlImg: "url(/images/fence/dop-3+.png)", price: "", name: "Организация парковки и заеда" },
  { urlImg: "url(/images/fence/dop-5+.png)", price: "", name: "Откатные ворота" },
  { urlImg: "url(/images/fence/dop-4+.png)", price: "", name: "Распашные ворота" },
  { urlImg: "url(/images/fence/dop-6.png", price: "", name: "Дополнительные услуги" },
  // { urlImg: "url(/images/fence/services-6.png)", price: "от 6000 м.пог", name: "Забор и оргаждения из бруска" },
];
const dataOrder = [
  {
    urlImg: "/icons/workOrder/bubbles4.svg",
    title: "Заявка",
    text: "Вы оставляете заявку или звоните в БИС, обсуждаем работы и согласовываем время выезда на участок.",
  },
  {
    urlImg: "/icons/topographyPage/pencil2.svg",
    title: "Документы",
    text: "Инженеры готовят и проверяют документы, заказывают выписку из Росреестра.",
  },
  {
    urlImg: "/icons/workOrder/automobile.svg",
    title: "Разметка",
    text: "Инженеры выезжают к вам и размечают сертифицированным оборудованием границы участка по координатам из выписки ЕГРН.",
  },
  {
    urlImg: "/icons/workOrder/clipboard.svg",
    title: "Акт",
    text: "Вы получаете акт выноса границ участка и оплачиваете услуги.*",
  },
];
const desctription = [
  {
    title: `Топографическая съемка
        и проектирование`,
    text: `Топографическая съемка обязательна для сложного рельефа `,
  },
  {
    title: `Вынос в натуру границ
        земельного участка`,
    text: `Поиск и закрепление границ вашего участка по координатам Росреестра. Определение границ заказывают перед установкой нового забора, покупкой участка и при спорах с соседями о текущем положении границы.
        Стоимость услуги - менее 1% от цены участка или стоимости установки забора, но сэкономит нервы и возможные затраты, связанные с переносом забора.
        Важно провести работы официально, чтобы избежать возможных споров с соседями.`,
  },
  {
    title: `Проектирование
        и ландшафтный дизайн`,
    text: `Мы занимаемся всеми видами проектных работ, от проведения предварительных изысканий и разработки концепции дизайна, до составления пакета дизайнерских и практических документов для вынесения проекта на местность.
        Для чего нужен проект ландшафта: наглядность - Вы сможете увидеть участок Вашей мечты до того как начнёте вкладывать деньги, а также
        избежать ошибки и предусмотреть максимум Ваших потребностей.`,
  },
  {
    title: `Эскизный
        ландшафтный проект`,
    text: `Эскизный ландшафтный проект отражает общую концепцию дизайна участка, расположение растений и элементов дизайна, позволяет рассчитать стоимость проведения благоустройства. Содержит комплект проектной документации для проведения ландшафтных работ на небольших участках с ровным рельефом.`,
  },
  {
    title: `Полный
        ландшафтный проект`,
    text: `Полный ландшафтный проект содержит полный комплект проектной документации, необходимой для дальнейшего проведения работ по благоустройству на участках любой площадью, и с любым рельефом, позволяет подробно рассчитать стоимость планируемых работ и необходимых материалов.`,
  },
  {
    title: `Вместе
        будет дешевле`,
    text: `Выезд можно объединить с другими работами:
        - размещение дома на участке и пробное бурение
        - топосъемка
        - выезд для замеров для проектирования инженерных сетей
        Также данная услуга может быть заказана с другими работами из каталога (уточняйте при обращении).`,
  },
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

const feedBackData = ["Эскизный проект", "Ландшафтный проект", "Полный проект", "Выезд специалиста", "Вынос границ", "Топосъемка"];
</script>

<template>
  <div>
    <DialogFeedBack @isVisible="visibleForm()" v-if="feedbackForm.active" :services="feedBackData" />
    <banner
      style="white-space: pre-line"
      bannerText="Топографическая съемка и проектирование"
      bannerDescription="Поиск и закрепление границ вашего участка по координатам Росреестра. Определение границ заказывают перед установкой нового забора, покупкой участка и при спорах с соседями о текущем положении границы."
      :bannerPrice="state.bannerPrice"
      :desctiption="desctription"
      @isVisible="visibleForm()"
    />
    <OurServices @isVisible="visibleForm()" :dataServices="state.dataServices" title="Наши услуги" />
    <PriceList />
    <PopularServices title="Популярные услуги" />
    <FeedBackForm title="Оставьте заявку" id="GlobalForm" />
  </div>
</template>

<style lang="scss" scoped></style>
