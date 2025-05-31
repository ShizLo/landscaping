<script setup>
import logo from "./assets/icons/logo-foot.svg";
import { ROUTES_PATHS } from "./assets/constants";
import toggleBodyScroll from "./utils/toggleBodyScroll.js";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const route = useRoute();
const router = useRouter();
const catalogMenu = ref(false);
const mobileMenu = ref(false);
const isScrolled = ref(false);

const isInitialized = ref(false);

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

const phoneRules = [
  (v) => !!v || "Телефон обязателен",
  (v) => /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(v) || "Введите корректный номер телефона",
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  if (catalogMenu.value) {
    catalogMenu.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // Устанавливаем флаг инициализации после монтирования
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
    route: ROUTES_PATHS.DEVELOP,
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
    route: ROUTES_PATHS.DEVELOP,
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

async function submit() {
  const { valid } = await form.value.validate();

  if (!valid) {
    showErrorSnackbar.value = true;
    return;
  }

  try {
    await sendTextMessage(message.value);
    showSuccessSnackbar.value = true;
    phone.value = "";
    form.value.reset();
  } catch (error) {
    console.error("Ошибка отправки:", error);
    showErrorSnackbar.value = true;
  }
}

const serviceItems = [
  "Обслуживание ЛОС",
  "Обслуживание бойлеров",
  "Обслуживание системы водоочистки",
  "Обслуживание системы водоподготовки",
  "Обслуживание электросетей",
  "ТО и сервис генераторов",
  "Разморозка водопровода",
];
</script>

<template>
  <v-app>
    <v-app-bar
      color="white"
      elevation="2"
      height="100"
      :class="{ 'app-bar--hidden': isScrolled }"
      class="border-b-2 border-orange-darken-2 fixed-header"
      hide-on-scroll
      scroll-threshold="100"
    >
      <v-container class="d-flex align-center _container px-md-0">
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="mobileMenu = !mobileMenu" size="x-large" />
        <!-- <v-img :src="logo" alt="Благоустройство и инженерные сети" max-width="200" class="mx-auto mx-md-0" contain /> -->
        <icon class="mx-auto mx-md-0" style="width: 200px; height: 200px" name="bis:logo"></icon>
        <v-menu v-model="catalogMenu" :close-on-content-click="false" transition="slide-y-transition" offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="flat" color="orange-darken-2" class="ml-12 hidden-sm-and-down catalog-btn" size="x-large">
              <template #prepend>
                <!-- <v-icon icon="mdi-menu" size="x-large" /> -->
                <icon name="mdi-menu" size="x-large" />
              </template>
              Каталог
              <icon name="mdi-chevron-down" class="ml-2" />
            </v-btn>
          </template>

          <v-card width="600" class="pa-4 mt-3">
            <v-list lines="two">
              <v-list-subheader class="text-h6 font-weight-bold text-orange-darken-2"> Все услуги </v-list-subheader>

              <v-list-item
                v-for="(service, index) in services"
                :key="index"
                :value="service"
                :to="service.route"
                active-class="bg-grey-lighten-4"
                @click="catalogMenu = false"
              >
                <template #prepend>
                  <v-icon :icon="service.icon" size="32" class="mr-4 text-orange-darken-2" />
                </template>

                <v-list-item-title class="font-weight-medium">
                  {{ service.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <div class="ml-auto d-flex align-center gap-3">
          <v-btn
            color="orange-darken-2"
            variant="text"
            size="x-large"
            class="hidden-sm-and-down mr-4"
            href="https://wa.me/79112775607"
            target="_blank"
          >
            <icon name="mdi-whatsapp" size="36"></icon>
          </v-btn>
          <v-btn v-if="!mobile" variant="flat" color="orange-darken-2" href="tel:+79112775607">
            <template v-slot:prepend><icon name="mdi-phone"></icon></template>
            +7 911 277-56-07
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isInitialized"
      v-model="mobileMenu"
      temporary
      location="left"
      width="320"
      class="mobile-menu"
      :style="{ top: mobile ? '100px' : '0', height: mobile ? 'calc(100% - 100px)' : '100%' }"
    >
      <v-list density="compact">
        <v-list-item class="px-2 pt-3">
          <template #append>
            <v-btn icon="mdi-close" variant="text" @click="mobileMenu = false" class="ml-auto" size="x-large" />
          </template>
        </v-list-item>

        <v-list-group value="mobile-services">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-tools" title="Каталог" class="font-weight-bold text-subtitle-1" />
          </template>

          <v-list-item v-for="(service, index) in services" :to="service.route" :key="index" @click="mobileMenu = false" class="pl-8">
            <template #prepend>
              <v-icon :icon="service.icon" size="24" class="mr-0 text-orange-darken-2" />
            </template>
            <span class="text-body-2">{{ service.title }}</span>
          </v-list-item>
        </v-list-group>

        <v-divider class="my-4" />
      </v-list>

      <v-card variant="outlined" class="ma-2 pa-4">
        <v-form ref="form" @submit.prevent="submit">
          <v-text-field
            v-model="phone"
            label="Ваш телефон"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-phone"
            :rules="phoneRules"
            required
          />

          <v-btn
            block
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

      <v-card variant="outlined" class="ma-2 pa-4">
        <div class="text-body-1 font-weight-bold mb-2">Контакты</div>

        <div class="d-flex align-center justify-space-between gap-2">
          <div class="text-caption text-grey">
            г. Санкт-Петербург<br />
            Ежедневно с 9 до 18 часов
          </div>
          <v-btn icon="mdi-whatsapp" color="green" href="https://wa.me/79112775607" target="_blank" />
        </div>
      </v-card>
    </v-navigation-drawer>

    <v-main style="padding-top: 100px">
      <div><NuxtPage /></div>
    </v-main>
    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
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

  .mobile-menu {
    top: 100px !important;
    height: calc(100% - 100px) !important;
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
.mobile-menu {
  transition: opacity 0.2s ease;

  &:not(.v-navigation-drawer--active) {
    opacity: 0;
  }

  &.v-navigation-drawer--active {
    opacity: 1;
  }
}
</style>
