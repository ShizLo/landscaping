<!-- <script setup>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { ROUTES_PATHS } from "../assets/constants";

const props = defineProps({
  title: {
    typeof: String,
  },
});

const swiper_global = reactive({
  instance: null,
  settings: {
    direction: "horizontal",
    slidesPerView: 3, // колво слайдов на показ
    spaceBetween: 30, // отступ между слайдами
    loop: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   type: "bullets",
    //   clickable: true,
    // },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.1,
        spaceBetween: 7,
      },
      // when window width is >= 480px

      // when window width is >= 640px
      767: {
        slidesPerView: 2.11,
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 4.1,
        spaceBetween: 15,
      },
    },
    navigation: {
      // nextEl: ".s-button-next",
      // prevEl: ".s-button-prev",
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [Navigation],
  },
});
// const swiper_global = new Swiper(".swiper-global-services", swiper_global_setting);

const data = [
  {
    urlImg: "url(/images/globalServices/services-1+.webp)",
    title: "Установка септика",
    price: "Подробнее",
    routePath: "",
  },
  {
    urlImg: "url(/images/fence/services-5+++++.webp)",
    title: "Установка забора",
    price: "Подробнее",
    routePath: ROUTES_PATHS.FENCE,
  },
  {
    urlImg: "url(/images/globalServices/services-5.webp)",
    title: "Фундамент",
    price: "Подробнее",
    routePath: ROUTES_PATHS.FAUNDATION,
  },
  {
    urlImg: "url(/images/globalServices/sticker.png)",
    title: "Кессон 2.0",
    price: "Подробнее",
    routePath: ROUTES_PATHS.WATER,
  },
  {
    urlImg: "url(/images/globalServices/services-5.png)",
    title: "Водоснабжение",
    price: "Подробнее",
    routePath: ROUTES_PATHS.WATER,
  },
  {
    urlImg: "url(/images/globalServices/services-4.png)",
    title: "Благоустройство",
    price: "Подробнее",
    routePath: "",
  },
  {
    urlImg: "url(/images/globalServices/services-8++.webp)",
    title: "Электромонтаж",
    price: "Подробнее",
    routePath: ROUTES_PATHS.ELECTRICITY,
  },
  {
    urlImg: "url(/images/globalServices/services-7.webp)",
    title: "Ливневка",
    price: "Подробнее",
    routePath: "",
  },
];

onMounted(() => {
  swiper_global.instance = new Swiper(".swiper-global-services", swiper_global.settings);
});
onUnmounted(() => {
  if (swiper_banner_setting.instance) {
    swiper_global.instance.destroy();
  }
});
</script>

<template>
  <section class="global-services">
    <div class="global-services__container _container">
      <h2 class="global-services__title">{{ title }}</h2>
      <div class="swiper-container">
        <div class="swiper-global-services">
          <div class="swiper-wrapper">
            <div v-for="item in data" class="swiper-slide swiper-slide__global-services">
              <nuxt-link :style="{ 'background-image': item.urlImg }" class="services__link" :to="{ name: item.routePath }">
                <div class="item__title">{{ item.title }}</div>
                <div class="item__bot">
                  <span class="item__next">Подробнее</span>
                  <img src="/icons/angle-right.svg" alt="" />
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;

.swiper-global-services > .swiper-button-prev {
  left: -50px;
}
.swiper-global-services > .swiper-button-next {
  right: -50px;
}

.swiper-global-services > .swiper-button-prev::after {
  padding: 18px;
  font-size: 32px;
  color: #9d9ea0;
}
.swiper-global-services > .swiper-button-next::after {
  padding: 18px;
  font-size: 32px;
  color: #9d9ea0;
}

.s-button-prev {
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: -18px;
  width: 24px;
  height: 24px;
  padding: 18px;
  border-radius: 50%;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  box-shadow: 0 3px 25px rgba(0, 0, 0, 0.0823529412);
  img {
    max-width: max-content;
    height: 15px;
    width: 15px;
  }
  @media (max-width: $md1) {
    display: none;
  }
}

.s-button-next {
  background-color: #fff;
  position: absolute;
  top: 50%;
  right: -18px;
  width: 24px;
  height: 24px;
  padding: 18px;
  border-radius: 50%;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  box-shadow: 0 3px 25px rgba(0, 0, 0, 0.0823529412);
  img {
    max-width: max-content;
    height: 15px;
    width: 15px;
  }
  @media (max-width: $md1) {
    display: none;
  }
}

.swiper-container {
  position: relative;
  width: 100%;
}
.swiper-wrapper {
  align-items: stretch;
  // overflow: visible;
  // :first-child {
  //   margin: 0px 1px 0px 0px;
  // }
}
.swiper-wrapper > .swiper-slide__global-services:first-child {
  // margin-left: 3px;
}

.swiper-global-services {
  overflow: hidden;
  padding-bottom: 3px;
  @media (max-width: $md4) {
    // overflow-x: visible;
    // overflow-y: visible;
    overflow: visible;
  }
}

.swiper-slide__global-services {
  background-color: $color-background;
  border-radius: 8px;
  height: auto;
  padding: 15px 0px 0px 15px;
  box-shadow: 1px 1px 3px 0px rgba(34, 60, 80, 0.2);
  @media (max-width: $md4) {
    padding: 10px 0px 0px 12px;
  }
}

.services {
  &__link {
    display: block;
    height: 140px;
    background-position: 95% 100%;
    background-repeat: no-repeat;
    background-size: 100% auto;
    line-height: 1;
    @media (max-width: $md4) {
      height: 95px;
      background-size: contain;
    }
  }
}

.global-services {
  overflow: hidden;
  margin: 0px 0px 25px 0px;
  &__title {
    // margin-top: 10px;
    margin-bottom: 10px;
    font-size: 26px;
    font-weight: 600;
    background: #fff;
    display: inline-block;
    border-radius: 32px;
    padding: 3px 10px;
    color: $color-title;
  }
}
.item {
  &__header {
    display: flex;
    align-items: center;
    margin: 0px 0px 10px 0px;
  }
  &__icon {
    padding: 10px 10px;
    margin: 0px 10px 0px 0px;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0px 1px 3px 0px rgba(34, 60, 80, 0.18);
    -moz-box-shadow: 0px 1px 3px 0px rgba(34, 60, 80, 0.18);
    box-shadow: 0px 1px 3px 0px rgba(34, 60, 80, 0.18);
    @media (max-width: $md4) {
      margin-left: 5px;
    }
    img {
      @media (max-width: $md4) {
        height: 22px;
        width: 22px;
      }
    }
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
    margin: 0px 0px 8px 0px;
    @media (max-width: $md4) {
      margin: 0px 0px 5px 0px;
      font-size: 15px;
    }
  }
  &__bot {
    display: flex;
    @media (max-width: $md4) {
      align-items: center;
    }
    img {
      height: 14px;
      width: 14px;
      margin-top: 0.5px;
      @media (max-width: $md4) {
        height: 9px;
        width: 8px;
        margin-top: -0.2px;
      }
    }
  }
  &__next {
    font-size: 14px;
    font-weight: 500;
    @media (max-width: $md4) {
      font-size: 10px;
      margin-right: 1px;
    }
  }
  &__icon {
    // height: ;
  }
  &__text {
    color: $color-text;
    line-height: 1.3;
    font-weight: 400;
    font-size: 15px;
  }
  &__foot {
    background: #fff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    color: #102938;
    text-align: center;
    border-radius: 4px;
    font-weight: 500;
    box-shadow: 0px 1px 2px 0px rgba(34, 60, 80, 0.18);
    margin: 0px 0px 0px -3px;
    @media (max-width: $md2) {
      font-size: 14px;
      // margin: 0px 0px 0px -5px;
      // padding: 7px 10px;
      padding: 7px 7px;
      // width: 45%;
    }
    @media (max-width: $md3) {
      font-size: 12px;
      // margin: 0px 0px 0px -5px;
      // padding: 7px 10px;
      padding: 7px 7px;
      // width: 50%;
    }
    @media (max-width: $md4) {
      font-size: 12px;
      margin: 0px 0px 0px -2px;
      // padding: 7px 10px;
      padding: 3px 6px;
      // width: 60%;
    }
  }
}
</style> -->

<script setup>
import { onMounted, onUnmounted, reactive } from "vue";
import Swiper from "swiper/bundle";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { ROUTES_PATHS } from "../assets/constants";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const swiperOptions = {
  modules: [Navigation, Autoplay],
  slidesPerView: "auto",
  spaceBetween: 24,
  centeredSlides: false,
  loop: true,
  centeredSlides: true,
  navigation: {
    nextEl: ".global-services-nav-next",
    prevEl: ".global-services-nav-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 7,
    },
    767: {
      slidesPerView: 2.11,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4.1,
      spaceBetween: 15,
    },
  },
};

const data = [
  {
    urlImg: "url(/images/globalServices/services-1+.webp)",
    title: "Установка септика",
    price: "Подробнее",
    routePath: ROUTES_PATHS.DEVELOP,
  },
  {
    urlImg: "url(/images/fence/services-5+++++.webp)",
    title: "Установка забора",
    price: "Подробнее",
    routePath: ROUTES_PATHS.FENCE,
  },
  {
    urlImg: "url(/images/globalServices/services-5.webp)",
    title: "Фундамент",
    price: "Подробнее",
    routePath: ROUTES_PATHS.FAUNDATION,
  },
  {
    urlImg: "url(/images/globalServices/services-7.webp)",
    title: "Ливневка",
    price: "Подробнее",
    routePath: ROUTES_PATHS.DRAINAGE,
  },
  {
    urlImg: "url(/images/globalServices/services-5.png)",
    title: "Водоснабжение",
    price: "Подробнее",
    routePath: ROUTES_PATHS.WATER,
  },
  {
    urlImg: "url(/images/globalServices/services-4.png)",
    title: "Благоустройство",
    price: "Подробнее",
    routePath: ROUTES_PATHS.DEVELOP,
  },
  {
    urlImg: "url(/images/globalServices/services-8++.webp)",
    title: "Электромонтаж",
    price: "Подробнее",
    routePath: ROUTES_PATHS.ELECTRICITY,
  },

  {
    urlImg: "url(/images/globalServices/sticker.png)",
    title: "Кессон 2.0",
    price: "Подробнее",
    routePath: ROUTES_PATHS.WATER,
  },
];

let swiperInstance = null;

onMounted(() => {
  swiperInstance = new Swiper(".global-services-swiper", swiperOptions);
});

onUnmounted(() => {
  if (swiperInstance) {
    swiperInstance.destroy();
  }
});
</script>

<template>
  <section class="global-services">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-text">{{ title }}</span>
          <span class="title-decoration"></span>
        </h2>
      </div>

      <div class="swiper-container">
        <div class="global-services-swiper swiper">
          <div class="swiper-wrapper">
            <div v-for="(item, index) in data" :key="index" class="swiper-slide">
              <nuxt-link :to="{ name: item.routePath }" class="service-card" :style="{ 'background-image': item.urlImg }">
                <div class="card-content">
                  <h3 class="service-title">{{ item.title }}</h3>

                  <div class="service-hover">
                    <span class="details-button">Подробнее</span>
                    <icon name="mdi:chevron-right" class="arrow-icon" />
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="swiper-navigation">
          <button class="global-services-nav-prev swiper-button">
            <v-icon>mdi-chevron-left</v-icon>
          </button>
          <button class="global-services-nav-next swiper-button">
            <v-icon>mdi-chevron-right</v-icon>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";

.global-services {
  padding: 60px 0;
  position: relative;
  overflow: hidden;
  // background: linear-gradient(to bottom, #f9fafc 0%, #f0f4f9 100%);

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.section-header {
  margin-bottom: 40px;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 15px 0;
  position: relative;
  display: inline-block;
  font-family: "Montserrat", sans-serif;

  .title-text {
    background: linear-gradient(90deg, #2c3e50, #1a1a1a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    z-index: 2;
    letter-spacing: -0.03em;
    text-transform: uppercase;
  }

  .title-decoration {
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 5px;
    background: linear-gradient(90deg, black, color.adjust(black, $lightness: -15%));
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  &:hover .title-decoration {
    width: 120px;
  }
}

.swiper-container {
  position: relative;
  padding: 20px 0;
}

.global-services-swiper {
  overflow: visible;
  padding: 15px 0;
}

.swiper-slide {
  background-color: $color-background;
  width: 320px;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 1px 1px 3px 0px rgba(34, 60, 80, 0.18);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);

    .service-hover {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.service-card {
  display: block;
  height: 100%;
  width: 100%;
  position: relative;
  color: $text;
  text-decoration: none;
  transition: all 0.3s ease;
  background-size: contain !important;
  background-position: 95% 100% !important;
  background-repeat: no-repeat !important;
  background-size: 150% auto !important;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
}

.service-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.3;
  font-family: "Montserrat", sans-serif;
}

.service-hover {
  margin-top: auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details-button {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  // color: #fff;
}

.arrow-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.service-card:hover .arrow-icon {
  transform: translateX(5px);
}

.swiper-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
}

.swiper-button {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
  border: none;
  color: #4a5568;
  position: relative;
  z-index: 2;

  &:hover {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
}

@media (max-width: $md3) {
  .global-services {
    padding: 40px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .swiper-slide {
    width: 280px;
    height: 240px;
  }

  .service-title {
    font-size: 20px;
  }
}

@media (max-width: $md4) {
  .global-services {
    padding: 30px 0;
  }

  .section-title {
    font-size: 1.8rem;

    .title-decoration {
      width: 60px;
      height: 3px;
      bottom: -8px;
    }
  }

  .swiper-slide {
    width: 260px;
    height: 220px;
  }

  .service-title {
    font-size: 18px;
  }

  .details-button {
    font-size: 14px;
  }

  .swiper-button {
    width: 48px;
    height: 48px;

    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
