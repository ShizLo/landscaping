<script setup>
import { ROUTES_PATHS } from "./assets/constants";
import toggleBodyScroll from "./utils/toggleBodyScroll.js";
import { useDisplay } from "vuetify";
import { CHATS_ID, TOPICS_ID, sendTextMessage } from "./services/botService";

//<Импорт картинок>================================================================================
import fence_automation from "./assets/media/images/fence/fence-automation.jpg";
//</Импорт картинок>===============================================================================

const { mobile } = useDisplay();
const route = useRoute();
const router = useRouter();
const catalogMenu = ref(false);
const mobileMenu = ref(false);
const isScrolled = ref(false);
const activeCategory = ref(0);

const isInitialized = ref(false);

const isActiveRoute = (routePath) => {
  return route.path === routePath || route.name === routePath;
};

watch(mobileMenu, (newValue) => {
  toggleBodyScroll(newValue);
});

watch(mobile, (newValue) => {
  if (!newValue) {
    mobileMenu.value = false;
  }
  isInitialized.value = true;
});

const phone = ref("");
const showSuccessSnackbar = ref(false);
const showErrorSnackbar = ref(false);
const form = ref(null);
const isSubmitted = ref(false);

const isValid = computed(() => {
  return phone.value && phone.value.length == 18;
});

const phoneRules = [(v) => !!v || "Телефон обязателен"];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  if (catalogMenu.value) {
    catalogMenu.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setTimeout(() => {
    isInitialized.value = true;
  }, 100);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const services = [
  {
    title: "Главная",
    route: ROUTES_PATHS.HOME,
    icon: "mdi-home",
  },
  {
    title: "Проект участка и топографическая съемка",
    route: ROUTES_PATHS.TOPOGRAPHY,
    icon: "mdi-map-marker-path",
  },
  {
    title: "Свайный фундамент",
    route: ROUTES_PATHS.FAUNDATION,
    icon: "mdi-home-group",
  },
  {
    title: "Септик под ключ",
    route: ROUTES_PATHS.SEPTIC,
    icon: "mdi-pipe",
  },
  {
    title: "Водоподготовка и система очистки воды",
    route: ROUTES_PATHS.WATER,
    icon: "mdi-water",
  },
  {
    title: "Дренаж и ливневая канализация",
    route: ROUTES_PATHS.DRAINAGE,
    icon: "mdi-hydro-power",
  },
  {
    title: "Электромонтаж и освещение участка",
    route: ROUTES_PATHS.ELECTRICITY,
    icon: "mdi-flash",
  },
  {
    title: "Благоустройство",
    route: ROUTES_PATHS.IMPROVEMENT,
    icon: "mdi-tree",
  },
  {
    title: "Установка заборов",
    route: ROUTES_PATHS.FENCE,
    icon: "mdi-gate",
  },
  {
    title: "БИС Сервис",
    route: ROUTES_PATHS.SERVICE,
    icon: "mdi-cog",
  },
];

const allProducts = [
  {
    name: "Кессон 2.0",
    price: "850",
    image: "/media/images/content/water/water-cusson-02.jpg",
    isExpanded: false,
    description:
      "Мы специально разработали проект 'Кессон 2.0', который подойдёт для заказчиков модульных домов, где не предусмотрено техническое помещение для размещения оборудования водоподготовки и очистки воды. Кессон сделан на базе кессонов БИО-С и имеет 4 типа размеров, что позволяет поставить любую вариативность оборудования и решить практически любые задачи.",
  },
  {
    name: "Малые архитектурные формы",
    price: "850",
    image: "/media/images/content/landscaping/landscaping-garden-furniture-01.webp",
    isExpanded: false,
    description: `Превратите ваш участок в уютное и функциональное пространство с помощью малых архитектурных форм! Мы проектируем и изготавливаем: беседки и перголы, садовые скамейки и арки, декоративные ограждения и бордюры, монгальные зоны и многое другое.`,
  },
  {
    name: "Автоматика для откатных ворот",
    price: "850",
    image: fence_automation,
    isExpanded: false,
  },
];

const categories = reactive([
  {
    title: "Проект и топосъемка",
    route: ROUTES_PATHS.TOPOGRAPHY,
    icon: "mdi-map-marker-path",
    services: [
      { name: "Вынос границ земельного участка", price: "15 000" },
      { name: "Эскизный проект", price: "15 000" },
      { name: "Полный ландшафтный проект", price: "15 000" },
      { name: "Топографическая съемка", price: "15 000" },
    ],
    products: allProducts,
  },
  {
    title: "Свайный фундамент",
    route: ROUTES_PATHS.FAUNDATION,
    icon: "mdi-home-group",
    services: [
      { name: "Расчистка участка", price: "15 000" },
      { name: "Пробное бурение", price: "15 000" },
      { name: "Фундамент под дом", price: "15 000" },
      { name: "Деревянная обвязка", price: "15 000" },
      { name: "Обвязка уголком", price: "15 000" },
      { name: "Обвязка профтрубой", price: "15 000" },
      { name: "Обвязка швеллером", price: "15 000" },
    ],
    products: allProducts,
  },
  {
    title: "Септик под ключ",
    route: ROUTES_PATHS.SEPTIC,
    icon: "mdi-pipe",
    services: [{ name: "Септик под ключ", price: "15 000" }],
    products: allProducts,
  },
  {
    title: "Водоподготовка",
    route: ROUTES_PATHS.WATER,
    icon: "mdi-water-check-outline",
    services: [
      { name: "Бурение скважин", price: "15 000" },
      { name: "Обвязка скважины", price: "15 000" },
      { name: "Водоподготовка", price: "15 000" },
      { name: "Монтаж автоматики", price: "15 000" },
      { name: "Обустройство колодца", price: "15 000" },
    ],
    products: allProducts,
  },
  {
    title: "Дренаж и ливневка",
    route: ROUTES_PATHS.DRAINAGE,
    icon: "mdi-hydro-power",
    services: [
      { name: "Обустройство дренажа", price: "15 000" },
      { name: "Ливневая канализация", price: "15 000" },
      { name: "Монтаж дренажных насосов", price: "15 000" },
      { name: "Видеоинспекция ливневой канализации", price: "15 000" },
      { name: "Прочистка дренажа, ливневой канализации", price: "15 000" },
      { name: "Дождеприемники", price: "15 000" },
    ],
    products: allProducts,
  },
  {
    title: "Электромонтаж",
    route: ROUTES_PATHS.ELECTRICITY,
    icon: "mdi-flash-outline",
    services: [
      { name: "Проектирование электросетей", price: "15 000" },
      { name: "Монтаж щита и воздушной линии", price: "15 000" },
      { name: "Монтаж опоры трубостойки", price: "15 000" },
      { name: "Установка стабилизаторов", price: "15 000" },
      { name: "Монтаж уличного освещения", price: "15 000" },
      { name: "Монтаж приборов", price: "15 000" },
    ],
    products: allProducts,
  },
  {
    title: "Благоустройство",
    route: ROUTES_PATHS.IMPROVEMENT,
    icon: "mdi-tree-outline",
    services: [
      { name: "Расчистка и уборка участка", price: "15 000" },
      { name: "Отмостка вокруг дома", price: "2 500" },
      { name: "Укладка дорожек", price: "3 000" },
      { name: "Озеленение", price: "1 800" },
      { name: "Освещение участка", price: "4 200" },
      { name: "Парковка на участке", price: "2 800" },
      { name: "Система автополива", price: "2 800" },
      { name: "Демонтаж и снос", price: "2 800" },
    ],
    products: allProducts,
  },
  {
    title: "Установка заборов",
    route: ROUTES_PATHS.FENCE,
    icon: "mdi-gate",
    services: [
      { name: "Забор из металлического штакетника", price: "15 000" },
      { name: "Забор из сетки гиттер (3D сетка)", price: "15 000" },
      { name: "Забор из профлиста", price: "15 000" },
      { name: "Забор из деревянного штакетника", price: "15 000" },
      { name: "Забор из сетки рабица", price: "15 000" },
      { name: "Забор и ограждения из бруска", price: "15 000" },
    ],
    products: allProducts,
  },
  {
    title: "БИС Сервис",
    route: ROUTES_PATHS.SERVICE,
    icon: "mdi-cog-clockwise",
    services: [
      { name: "Обслуживание и ремонт ЛОС", price: "15 000" },
      { name: "Система водоочистки и водоподготовки", price: "15 000" },
      { name: "Система водоснабжения", price: "15 000" },
      { name: "Система электроснабжения", price: "15 000" },
      { name: "Сезонная консервация ЛОС", price: "15 000" },
    ],
    products: allProducts,
  },
]);

async function submit() {
  const { valid } = await form.value.validate();

  if (!valid) {
    showErrorSnackbar.value = true;
    return;
  }

  try {
    const message = {};
    message.topic_id = TOPICS_ID.SERVICES;
    message.chat_id = CHATS_ID.BASE;
    message.text = `👨🏻 Заказ звонка\nКонтакт: ${phone.value}`;
    await sendTextMessage(message);
    isSubmitted.value = true;
    showSuccessSnackbar.value = true;
    phone.value = "";
    form.value.reset();
  } catch (error) {
    console.error("Ошибка отправки:", error);
    showErrorSnackbar.value = true;
  }
}

const navigateToService = (service) => {
  catalogMenu.value = false;
  // router.push(service.route);
  router.push(services[service + 1].route || ROUTES_PATHS.HOME);
};

const navigateToProduct = (product) => {
  catalogMenu.value = false;
};

watch(mobileMenu, (newValue) => {
  toggleBodyScroll(newValue);
  if (newValue) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
  }
});

const feedBackData = ["Кессон 2.0", "Малые архитектурные формы", "Автоматика для откатных ворот", "Нет в списке"];

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

function toggleExpand(clickedProduct) {
  categories[activeCategory.value].products.forEach((product) => {
    product.isExpanded = product === clickedProduct ? !product.isExpanded : false;
  });
}
</script>

<template>
  <v-app>
    <DialogFeedBack @isVisible="visibleForm()" v-if="feedbackForm.active" :services="feedBackData" />
    <v-app-bar
      color="white"
      elevation="2"
      height="100"
      :class="{ 'app-bar--hidden': isScrolled }"
      class="border-b-2 border-orange-darken-2 fixed-header"
      hide-on-scroll
      scroll-threshold="100"
    >
      <div class="d-flex align-center _container">
        <v-btn
          v-if="mobile"
          variant="flat"
          class="hidden-md-and-up"
          color="orange-darken-2"
          icon="mdi-menu"
          @click="mobileMenu = !mobileMenu"
        >
        </v-btn>
        <!-- <v-app-bar-nav-icon class="hidden-md-and-up" @click="mobileMenu = !mobileMenu" size="x-large" /> -->
        <icon
          @click="router.push(ROUTES_PATHS.HOME)"
          class="mx-auto mx-md-0 icon-logo"
          style="width: 200px; height: 200px"
          name="bis:logo"
        ></icon>

        <v-menu
          location="bottom"
          v-model="catalogMenu"
          :close-on-content-click="false"
          transition="slide-y-transition"
          offset-y
          width="1920"
          height="800"
          content-class="fullscreen-menu"
        >
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="flat" color="orange-darken-2" class="ml-12 hidden-sm-and-down catalog-btn" size="x-large">
              <template #prepend>
                <icon name="mdi-menu" size="x-large" />
              </template>
              Каталог
              <icon name="mdi-chevron-down" class="ml-2" />
            </v-btn>
          </template>

          <v-card class="fullscreen-card">
            <v-container class="pa-0 h-100" fluid>
              <v-row no-gutters class="h-100">
                <v-col cols="12" md="3" class="main-menu-column">
                  <v-list lines="two" class="h-100">
                    <!-- <v-list-subheader class="text-h5 font-weight-bold text-orange-darken-2 pa-4"> Категории </v-list-subheader> -->
                    <h2 class="text-h5 mb-6 px-8 pt-6 d-flex align-center">
                      <v-icon size="40" class="mr-4 text-blue-grey-darken-2">mdi-bookmark-box-multiple</v-icon>
                      Каталог
                    </h2>
                    <v-list-item
                      v-for="(category, index) in categories"
                      :key="index"
                      :value="category"
                      @mouseenter="activeCategory = index"
                      :to="category.route"
                      :class="{
                        'active-nav-item': isActiveRoute(category.route),
                        'hovered-item': activeCategory === index,
                      }"
                      class="pl-5 py-3"
                      @click="catalogMenu = false"
                    >
                      <v-list-item-title class="font-weight-medium text-h6">
                        <v-icon :icon="category.icon" size="24" class="mr-3 ml-2 text-orange-darken-2" />
                        {{ category.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="12" md="5" class="services-column" v-if="activeCategory !== null">
                  <div class="submenu-content">
                    <h2 class="text-h5 mb-6 px-6 pt-6 d-flex align-center">
                      <v-icon :icon="categories[activeCategory].icon" size="40" class="mr-4 text-blue-grey-darken-2" />
                      {{ categories[activeCategory].title }} - Услуги
                    </h2>

                    <v-row class="px-6">
                      <v-col
                        class="py-2"
                        cols="12"
                        sm="12"
                        v-for="(service, serviceIndex) in categories[activeCategory].services"
                        :key="serviceIndex"
                      >
                        <v-card variant="text" class="px-4 py-3 submenu-item" @click="navigateToService(activeCategory)">
                          <v-icon icon="mdi-arrow-right" size="24" class="mr-3 text-orange-darken-2" />
                          <span class="text-h6">{{ service.name }}</span>
                          <!-- <v-chip v-if="service.price" small class="ml-2" color="orange-lighten-4"> от {{ service.price }} ₽ </v-chip> -->
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>

                <v-col cols="12" md="4" class="products-column" v-if="activeCategory !== null && categories[activeCategory].products">
                  <div class="submenu-content">
                    <h2 class="text-h5 mb-6 px-6 pt-6 d-flex align-center">
                      <v-icon icon="mdi-package-variant" size="40" class="mr-4 text-blue-grey-darken-2" />
                      Товары
                    </h2>

                    <v-row class="px-6">
                      <v-col cols="12" v-for="(product, productIndex) in categories[activeCategory].products" :key="productIndex">
                        <v-card>
                          <v-img
                            :src="product.image"
                            class="align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            cover
                          >
                            <v-card-title class="text-white">{{ product.name }}</v-card-title>
                          </v-img>

                          <v-card-actions>
                            <!-- <v-rating :model-value="5" color="amber" density="compact" size="small" half-increments readonly></v-rating> -->
                            <v-btn @click="visibleForm" color="medium-emphasis" size="small"> Заказать</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                              v-if="product.description"
                              :icon="product.isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                              @click="toggleExpand(product)"
                            ></v-btn>
                            <!-- <v-btn color="medium-emphasis" icon="mdi-share-variant" size="small"></v-btn>
                            <v-btn color="medium-emphasis" icon="mdi-tag-outline" size="small"></v-btn> -->
                          </v-card-actions>
                          <v-expand-transition>
                            <div v-show="product.isExpanded">
                              <v-divider></v-divider>

                              <v-card-text>
                                {{ product.description }}
                              </v-card-text>
                            </div>
                          </v-expand-transition>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>

                <v-col cols="12" md="6" class="empty-state" v-else>
                  <div class="d-flex flex-column align-center justify-center h-100">
                    <v-icon icon="mdi-hand-pointing-left" size="64" class="mb-4 text-orange-darken-2" />
                    <h3 class="text-h5">Выберите категорию для просмотра услуг и товаров</h3>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-menu>

        <div v-if="!mobile" class="ml-auto d-flex align-center gap-3">
          <v-menu open-on-hover offset-y>
            <template #activator="{ props }">
              <v-btn v-bind="props" color="orange-darken-2" variant="text" size="x-large" class="hidden-sm-and-down social-btn">
                <template #prepend>
                  <icon class="text-blue-grey-darken-2" name="mdi-play-box-multiple-outline" size="36"></icon>
                </template>
                <span class="text-blue-grey-darken-2">Медиа</span>
                <icon name="mdi-chevron-down" class="ml-2 text-blue-grey-darken-2" />
              </v-btn>
            </template>

            <v-list class="social-menu">
              <!-- <v-list-subheader class="text-subtitle-1 pt-3 mb-2 justify-center">Наши соцсети </v-list-subheader> -->
              <v-list-item title="Наши соцсети"> </v-list-item>
              <v-divider />
              <v-list-item color="orange-darken-2" href="https://t.me/BISlandscaping" target="_blank" value="telegram">
                <template v-slot:title> <div class="pr-3">Телеграм-канал</div> </template>
                <template v-slot:prepend> <icon name="mdi-telegram" size="34" class="mr-3 text-orange-darken-2"> </icon> </template
              ></v-list-item>
              <v-list-item href="https://vkvideo.ru/@bislandscaping" target="_blank" value="vk">
                <template v-slot:title> <div class="pr-3">VK Видео</div> </template>
                <template v-slot:prepend> <icon name="mdi-vk" size="34" class="mr-3 text-orange-darken-2"> </icon> </template
              ></v-list-item>
            </v-list>
          </v-menu>
          <v-divider v-if="!mobile" class="mx-4" vertical></v-divider>
          <v-btn
            color="orange-darken-2"
            variant="text"
            size="x-large"
            class="hidden-sm-and-down mr-4 social-btn"
            href="https://wa.me/79112775607"
            target="_blank"
          >
            <icon class="text-orange-darken-2" name="mdi-whatsapp" size="36"></icon>
          </v-btn>
          <v-btn variant="flat" color="orange-darken-2" href="tel:+79112775607">
            <!-- <template v-slot:prepend>
              <icon name="mdi-phone"></icon>
            </template> -->
            +7 911 277-56-07
          </v-btn>
        </div>
        <v-btn v-if="mobile" class="hidden-md-and-up" variant="flat" color="orange-darken-2" icon="mdi-phone" href="tel:+79112775607">
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="mobileMenu"
      temporary
      location="left"
      width="700"
      class="mobile-menu"
      style="top: 0 !important; height: 100% !important; z-index: 1200"
    >
      <v-card class="d-flex flex-column h-100">
        <v-card-title class="mobile-menu-header py-3 px-2 d-flex align-center">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn v-bind="props" color="orange-darken-4" variant="text" size="large" class="social-btn">
                <template #prepend>
                  <icon name="mdi-play-box-multiple-outline" size="32"></icon>
                </template>
                Медиа
                <icon name="mdi-chevron-down" class="ml-2" />
              </v-btn>
            </template>

            <v-list class="social-menu">
              <v-list-subheader>Наши соцсети</v-list-subheader>
              <v-list-item color="orange-darken-2" href="https://t.me/BISlandscaping" target="_blank" value="telegram">
                <template v-slot:title> <div class="pr-3 text-body-2">Телеграм-канал</div> </template>
                <template v-slot:prepend> <icon name="mdi-telegram" size="28" class="mr-3 text-orange-darken-2"> </icon> </template
              ></v-list-item>
              <v-list-item href="https://vkvideo.ru/@bislandscaping" target="_blank" value="vk">
                <template v-slot:title> <div class="pr-3 text-body-2">VK Видео</div> </template>
                <template v-slot:prepend> <icon name="mdi-vk" size="28" class="mr-3 text-orange-darken-2"> </icon> </template
              ></v-list-item>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn
            :ripple="false"
            color="orange-darken-4"
            icon="mdi-close-circle-outline"
            variant="text"
            @click="mobileMenu = false"
            size="x-large"
          />
        </v-card-title>
        <v-card-text class="mobile-menu-content flex-grow-1 pa-0 overflow-y-auto">
          <v-list>
            <v-list-group value="mobile-services">
              <template #activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-tools" title="Каталог" class="font-weight-bold text-subtitle-1" />
              </template>

              <v-list-item
                v-for="(service, index) in services"
                :to="service.route"
                :key="index"
                @click="mobileMenu = false"
                :class="{ 'active-nav-item-mobile': isActiveRoute(service.route) }"
                class="pl-8"
              >
                <template #prepend>
                  <v-icon :icon="service.icon" size="28" class="mr-0 text-orange-darken-2" />
                </template>
                <span class="text-body-2 nav-link-mobile">
                  {{ service.title }}
                </span>
              </v-list-item>
            </v-list-group>
            <v-divider class="my-4" />

            <template v-if="!isSubmitted">
              <v-card variant="outlined" class="ma-2 pa-4 mb-4">
                <v-form ref="form" @submit.prevent="submit">
                  <v-text-field
                    v-model="phone"
                    label="Ваш телефон"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-phone"
                    :rules="phoneRules"
                    required
                    class="mb-2"
                    v-maska="'+7 (###) ###-##-##'"
                    placeholder="+7 (___) ___-__-__"
                  />

                  <v-btn
                    block
                    :disabled="!isValid"
                    style="background: linear-gradient(90deg, #ea5b0c, #ff8c42)"
                    color="orange-darken-2"
                    size="large"
                    prepend-icon="mdi-arrow-right"
                    type="submit"
                  >
                    Заказать звонок
                  </v-btn>

                  <div class="text-caption text-grey mt-2">
                    Нажимая кнопку, вы соглашаетесь с
                    <nuxt-link :to="{ name: ROUTES_PATHS.POLICY }" class="text-orange-darken-2"> политикой конфиденциальности </nuxt-link>
                  </div>
                </v-form>
              </v-card>
            </template>

            <template v-else>
              <v-card variant="outlined" class="ma-2 pa-4 success-message">
                <v-icon color="success" size="64">mdi-check-circle</v-icon>
                <h2 class="success-title mt-4">Заявка успешно отправлена!</h2>
                <p class="success-subtitle mb-4">Мы свяжемся с Вами в ближайшее время</p>
                <v-btn color="orange-darken-2" size="large" @click="isSubmitted = false" class="new-request-btn" block>
                  Отправить новую заявку
                </v-btn>
              </v-card>
            </template>
            <v-row class="px-2 mb-2">
              <v-col cols="12" class="pb-0">
                <v-btn block variant="flat" size="large" color="orange-darken-2" href="tel:+79112775607">
                  <template v-slot:prepend>
                    <icon size="22" name="mdi-phone"></icon>
                  </template>
                  +7 911 277-56-07
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block variant="flat" size="large" color="orange-darken-2" href="https://t.me/@lllaleksll" target="_blank">
                  <template v-slot:prepend>
                    <icon size="22" name="mdi-telegram"></icon>
                  </template>
                  telegram
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block variant="flat" size="large" color="orange-darken-2" href="https://wa.me/79112775607" target="_blank">
                  <template v-slot:prepend>
                    <icon size="22" name="mdi-whatsapp"></icon>
                  </template>
                  whatsapp
                </v-btn>
              </v-col>
            </v-row>

            <div class="d-flex align-center justify-center gap-2 mb-2">
              <icon class="mr-1" name="mdi-map-marker"></icon>
              <div class="text-caption">г. Санкт-Петербург, пн-сб с 9 до 19 часов</div>
            </div>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>

    <v-main style="padding-top: 100px" :class="{ 'overflow-hidden': mobileMenu }">
      <div><NuxtPage /></div>
    </v-main>

    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
.fullscreen-menu {
  // padding: 10px 0px 0px 0px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: calc(100vh - 100px);
  top: 100px !important;
  left: 0 !important;
  right: 0 !important;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
}

.fullscreen-card {
  height: 100%;
  background-color: #fff;
  margin-top: 10px;

  .main-menu-column {
    background-color: #f8f8f8;
    border-right: 1px solid #e0e0e0;
    height: 100%;
    overflow-y: auto;
  }

  .services-column {
    background-color: #ffffff;
    border-right: 1px solid #e0e0e0;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .products-column {
    background-color: #fafafa;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fefefe;
  }
}

.active-nav-item {
  background-color: rgba(234, 91, 12, 0.1);
  border-left: 4px solid #ea5b0c;
}

.hovered-item {
  background-color: rgba(234, 91, 12, 0.05);
}

.submenu-item {
  transition: all 0.2s ease;
  cursor: pointer;
  border-left: 2px solid transparent;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(234, 91, 12, 0.05);
    border-left: 2px solid #ea5b0c;
    transform: translateX(4px);
  }
}

.submenu-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 960px) {
  .fullscreen-menu {
    height: calc(100vh - 80px);
    top: 80px !important;
    max-width: 100%;
    border-radius: 0;
  }

  .main-menu-column,
  .services-column,
  .products-column {
    width: 100% !important;
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }

  .empty-state {
    display: none !important;
  }

  .submenu-item {
    padding: 12px !important;
  }
}

.main-menu-column::-webkit-scrollbar,
.services-column::-webkit-scrollbar,
.products-column::-webkit-scrollbar {
  width: 6px;
}

.main-menu-column::-webkit-scrollbar-thumb,
.services-column::-webkit-scrollbar-thumb,
.products-column::-webkit-scrollbar-thumb {
  background-color: rgba(234, 91, 12, 0.3);
  border-radius: 3px;
}

.icon-logo {
  cursor: pointer;
}

.mobile-menu {
  &-header {
    position: sticky;
    top: 0;
    z-index: 2;
    background: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  &-content {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  }
}

.v-list {
  padding-top: 0 !important;
}

.v-list-group__items .v-list-item {
  padding-inline-start: 32px !important;
}

.social-menu {
  .v-list-subheader {
    font-weight: 600;
    color: #ea5b0c;
  }

  .v-list-item {
    min-height: 48px;
    padding: 0 16px;

    &:hover {
      background-color: rgba(234, 91, 12, 0.05);
    }

    .v-icon {
      color: #ea5b0c;
      margin-right: 12px;
    }
  }
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #102938;
  margin-bottom: 8px;
}

.success-subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 24px;
}

.new-request-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  color: white;
  background: linear-gradient(90deg, #ea5b0c, #ff8c42);
  box-shadow: 0 4px 6px rgba(234, 91, 12, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(234, 91, 12, 0.2);
  }
}

.nav-underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #102938;
  transition: width 0.3s ease;

  &.active {
    width: 50px;
  }
}

.nav-link {
  position: relative;
  color: #102938;
  transition: all 0.3s ease;
  font-size: 1.08rem;

  &:hover {
    .nav-underline {
      width: 40px;
      background: #ea5b0c;
    }
  }
}

.active-nav-item {
  .nav-link {
    color: black !important;

    .nav-underline {
      width: 50px;
    }
  }
}

.nav-link-mobile {
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #ea5b0c;

    .nav-underline {
      width: 30px;
    }
  }
}

.active-nav-item-mobile {
  .nav-link-mobile {
    color: #ea5b0c !important;

    .nav-underline {
      width: 30px;
    }
  }
}

:deep(.v-list-item--variant-text .v-list-item__overlay) {
  background: linear-gradient(90deg, #ea5b0c, #ff8c42);
}

.overflow-hidden {
  overflow: hidden !important;
  height: 100vh !important;
}
._container {
  width: 100%;
  margin: 0 auto;
}

.social-btn {
  min-width: 36px;
  padding: 0 12px;
}

.v-list-group__items .v-list-item {
  padding-inline-start: 24px !important;
}

.app-bar--hidden {
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-app-bar {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, box-shadow 0.3s ease;

  &.v-toolbar--prominent {
    height: 100px !important;
  }
}

.catalog-btn {
  background: linear-gradient(90deg, #ea5b0c, #ff8c42);
  letter-spacing: 0.5px;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(234, 91, 12, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(234, 91, 12, 0.2);
  }

  .v-icon {
    transition: transform 0.3s ease;
  }

  &[aria-expanded="true"] .v-icon {
    transform: rotate(180deg);
  }
}

.mobile-menu {
  position: fixed !important;
  .v-list-item__prepend {
    margin-inline-end: 12px;
  }

  .v-list-group__items .v-list-item {
    min-height: 48px;
  }

  .v-list-item--active {
    background: rgba(234, 91, 12, 0.05);
    border-left: 3px solid #ea5b0c;
  }

  transition: transform 0.3s ease, opacity 0.2s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  &:not(.v-navigation-drawer--active) {
    transform: translateX(-100%);
    opacity: 0;
  }

  &.v-navigation-drawer--active {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 960px) {
  .v-app-bar {
    height: 100px !important;

    .v-toolbar__content {
      padding: 0 16px !important;
    }

    .v-img {
      max-width: 190px !important;
    }

    .v-btn--icon {
      width: 44px;
      height: 44px;
    }
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.app-bar--hidden {
  transform: translateY(-100%) !important;
}
</style>
