<!-- <script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Navigation, EffectCoverflow } from "swiper/modules";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const popup = reactive({
  index: 0,
  visibility: false,
});

const swiperInstance = ref(null);

function clickSlide(ind) {
  toggleBodyScroll(true);
  setIndexSlide(ind);
  toggleVisibilityPopup();
}

function setIndexSlide(ind) {
  popup.index = ind;
}

function toggleVisibilityPopup() {
  popup.visibility = !popup.visibility;
}

function closePopup() {
  toggleVisibilityPopup(false);
  toggleBodyScroll(false);
}

function toggleBodyScroll(lock) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
}

onMounted(() => {
  swiperInstance.value = new Swiper(".portfolio-swiper", {
    modules: [Navigation, EffectCoverflow],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    initialSlide: Math.floor(props.data.length / 2),
    coverflowEffect: {
      rotate: 0,
      stretch: -40,
      depth: 120,
      modifier: 1.5,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".portfolio-nav-next",
      prevEl: ".portfolio-nav-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.01,
        spaceBetween: 16,
        coverflowEffect: {
          stretch: 0,
          depth: 50,
          modifier: 1,
        },
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 24,
        coverflowEffect: {
          stretch: -40,
          depth: 120,
          modifier: 1.5,
        },
      },
    },
  });
});

onUnmounted(() => {
  if (swiperInstance.value) swiperInstance.value.destroy();
});
</script>

<template>
  <PopupSlider @someEvent="closePopup" v-if="popup.visibility" :data="data[popup.index].work"></PopupSlider>

  <section class="portfolio-section">
    <div class="_container">
      <div class="section-header">
        <h2 class="portfolio-title">
          <span class="title-text">НАШИ РАБОТЫ</span>
          <span class="title-decoration"></span>
        </h2>
        <p class="section-subtitle">Реализованные работы с безупречным качеством исполнения</p>
      </div>

      <div class="portfolio-swiper-container">
        <div class="portfolio-swiper swiper">
          <div class="swiper-wrapper">
            <div v-for="(item, index) in data" :key="index" class="swiper-slide portfolio-slide" @click="clickSlide(index)">
              <div class="portfolio-card">
                <div class="card-image">
                  <NuxtImg :src="item.url" :alt="item.title" class="portfolio-image" loading="lazy" />
                  <div class="image-overlay"></div>

                  <div class="portfolio-name-wrapper">
                    <h3 class="portfolio-name">{{ item.title }}</h3>
                  </div>

                  <div class="view-button">
                    <span>Смотреть работы</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="portfolio-navigation">
          <button class="portfolio-nav-prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="portfolio-nav-next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";

.portfolio-section {
  padding: 20px 0;
  position: relative;
  overflow: hidden;

  ._container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.portfolio-title {
  font-size: 3rem;
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
    // background: linear-gradient(90deg, black, darken(black, 15%));
    background: linear-gradient(90deg, black, color.adjust(black, $lightness: -15%));
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  &:hover .title-decoration {
    width: 120px;
  }
}

.section-subtitle {
  font-size: 20px;
  color: #4a5568;
  margin: 0 0 25px 0;
  font-family: "Open Sans", sans-serif;
  letter-spacing: 0.3px;
  font-weight: 500;
}

.section-description {
  text-align: center;
  color: #4a5568;
  line-height: 1.7;
  font-size: 17px;
  margin: 0 auto;

  p {
    margin: 0 0 15px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.portfolio-swiper-container {
  position: relative;
  padding: 40px 0;
}

.portfolio-swiper {
  overflow: visible;
  padding: 20px 0;
}

.portfolio-slide {
  width: 500px;
  height: auto;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;

  &.swiper-slide-active {
    transform: scale(1.05);
    z-index: 2;
  }
}

.portfolio-card {
  background: white;
  border-radius: 16px;
  height: 100%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);

    .image-overlay {
      opacity: 0.5;
    }

    .view-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.card-image {
  position: relative;
  padding-top: 70%;
  overflow: hidden;

  .portfolio-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
    opacity: 0.5;
    transition: opacity 0.4s ease;
  }
}

.portfolio-name-wrapper {
  position: absolute;
  bottom: 20px;
  right: 20px;
  max-width: 80%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  border-radius: 8px;
  padding: 12px 20px;
  z-index: 2;
}

.portfolio-name {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1.3;
  letter-spacing: 0.6px;
  text-align: right;
  font-family: "Montserrat", sans-serif;
}

.view-button {
  position: absolute;
  top: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  color: #2b5876;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateY(-10px);
  opacity: 0;
  letter-spacing: 0.3px;
  z-index: 3;
  font-family: "Montserrat", sans-serif;

  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: white;

    svg {
      transform: translateX(4px);
    }
  }

  .portfolio-card:hover & {
    transform: translateY(0);
    opacity: 1;
  }
}

.portfolio-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;

  button {
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

    &:hover {
      background: #667eea;
      color: white;
      transform: scale(1.1);
    }
  }
}

@media (max-width: $md3) {
  .portfolio-section {
    padding: 80px 0;
  }

  .portfolio-title {
    font-size: 42px;

    .title-decoration {
      height: 4px;
      bottom: -10px;
    }
  }

  .portfolio-slide {
    width: 380px;
  }

  .section-subtitle {
    font-size: 18px;
  }

  .portfolio-navigation {
    display: none;
  }
  .portfolio-card {
    &:hover {
      transform: none;
      .view-button {
        opacity: 0;
        transform: none;
      }
    }
  }
}

@media (max-width: $md4) {
  .portfolio-section {
    padding: 20px 0;
  }
  .section-header {
    margin-bottom: 0px;
  }
  .section-subtitle {
    margin-bottom: 0px;
  }
  .portfolio-swiper-container {
    padding: 0px 0px;
  }

  .portfolio-title {
    font-size: 2rem;

    .title-decoration {
      width: 60px;
      height: 3px;
      bottom: -8px;
    }

    &:hover .title-decoration {
      width: 80px;
    }
  }

  .portfolio-slide {
    width: 310px;
  }

  .portfolio-name-wrapper {
    padding: 8px 14px;
  }

  .view-button {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style> -->

<!-- <script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Navigation, EffectCoverflow, Pagination } from "swiper/modules";
const { sm, md, lg, xl } = useDisplay();
const props = defineProps({
  data: {
    type: Array,
    required: true,
    validator: (value) => value.every((item) => item.url && item.title),
  },
  viewMode: {
    type: String,
    default: "carousel", // 'carousel' или 'grid'
    validator: (value) => ["carousel", "grid"].includes(value),
  },
});

const popup = reactive({
  index: 0,
  visibility: false,
});

const swiperInstance = ref(null);
const activeView = ref(props.viewMode);

// Для сетки - вычисляем колонки в зависимости от ширины экрана
const gridColumns = computed(() => {
  if (sm.value) return 1;
  if (md.value) return 2;
  if (lg.value) return 3;
  return 4;
});

function clickSlide(ind) {
  toggleBodyScroll(true);
  setIndexSlide(ind);
  toggleVisibilityPopup();
}

function setIndexSlide(ind) {
  popup.index = ind;
}

function toggleVisibilityPopup() {
  popup.visibility = !popup.visibility;
}

function closePopup() {
  toggleVisibilityPopup(false);
  toggleBodyScroll(false);
}

function toggleBodyScroll(lock) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
}

function toggleViewMode() {
  // activeView.value = activeView.value === "carousel" ? "grid" : "carousel";
  // if (activeView.value === "carousel") {
  //   initSwiper();
  // } else if (swiperInstance.value) {
  //   swiperInstance.value.destroy();
  // }
  activeView.value = activeView.value === "carousel" ? "grid" : "carousel";

  // Используем nextTick, чтобы дождаться обновления DOM
  nextTick(() => {
    if (activeView.value === "carousel") {
      // Сначала уничтожаем старый экземпляр, если он есть
      if (swiperInstance.value) {
        swiperInstance.value.destroy();
        swiperInstance.value = null;
      }
      // Затем инициализируем новый
      initSwiper();
    } else if (swiperInstance.value) {
      swiperInstance.value.destroy();
      swiperInstance.value = null;
    }
  });
}

function initSwiper() {
  swiperInstance.value = new Swiper(".portfolio-swiper", {
    modules: [Navigation, EffectCoverflow, Pagination],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    initialSlide: Math.floor(props.data.length / 2),
    coverflowEffect: {
      rotate: 0,
      stretch: -40,
      depth: 120,
      modifier: 1.5,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".portfolio-nav-next",
      prevEl: ".portfolio-nav-prev",
    },
    pagination: {
      el: ".portfolio-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.01,
        spaceBetween: 16,
        coverflowEffect: {
          stretch: 0,
          depth: 50,
          modifier: 1,
        },
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 24,
        coverflowEffect: {
          stretch: -40,
          depth: 120,
          modifier: 1.5,
        },
      },
    },
  });
}

onMounted(() => {
  if (activeView.value === "carousel") {
    initSwiper();
  }

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (swiperInstance.value) swiperInstance.value.destroy();
  window.removeEventListener("resize", handleResize);
});

function handleResize() {
  // Обновляем сетку при изменении размера
  if (activeView.value === "grid") {
    gridColumns.value = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : window.innerWidth < 1440 ? 3 : 4;
  }
}
</script>

<template>
  <PopupSlider @someEvent="closePopup" v-if="popup.visibility" :data="data[popup.index].work"></PopupSlider>

  <section class="portfolio-section">
    <div class="_container">
      <div class="section-header">
        <h2 class="portfolio-title">
          <span class="title-text">НАШИ РАБОТЫ</span>
          <span class="title-decoration"></span>
        </h2>
        <p class="section-subtitle">Реализованные работы с безупречным качеством исполнения</p>

        <div class="view-toggle">
          <button :class="{ active: activeView === 'carousel' }" @click="toggleViewMode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 18V6C8 4.89543 8.89543 4 10 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H10C8.89543 20 8 19.1046 8 18Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M2 18V6C2 4.89543 2.89543 4 4 4H6C7.10457 4 8 4.89543 8 6V18C8 19.1046 7.10457 20 6 20H4C2.89543 20 2 19.1046 2 18Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Карусель
          </button>
          <button :class="{ active: activeView === 'grid' }" @click="toggleViewMode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 4H4C2.89543 4 2 4.89543 2 6V10C2 11.1046 2.89543 12 4 12H10C11.1046 12 12 11.1046 12 10V6C12 4.89543 11.1046 4 10 4Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M20 4H14C12.8954 4 12 4.89543 12 6V10C12 11.1046 12.8954 12 14 12H20C21.1046 12 22 11.1046 22 10V6C22 4.89543 21.1046 4 20 4Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M10 14H4C2.89543 14 2 14.8954 2 16V20C2 21.1046 2.89543 22 4 22H10C11.1046 22 12 21.1046 12 20V16C12 14.8954 11.1046 14 10 14Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M20 14H14C12.8954 14 12 14.8954 12 16V20C12 21.1046 12.8954 22 14 22H20C21.1046 22 22 21.1046 22 20V16C22 14.8954 21.1046 14 20 14Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Сетка
          </button>
        </div>
      </div>

      <div v-if="activeView === 'carousel'" class="portfolio-swiper-container">
        <div class="portfolio-swiper swiper">
          <div class="swiper-wrapper">
            <div v-for="(item, index) in data" :key="index" class="swiper-slide portfolio-slide" @click="clickSlide(index)">
              <div class="portfolio-card">
                <div class="card-image">
                  <NuxtImg :src="item.url" :alt="item.title" class="portfolio-image" loading="lazy" />
                  <div class="image-overlay"></div>

                  <div class="portfolio-name-wrapper">
                    <h3 class="portfolio-name">{{ item.title }}</h3>
                  </div>

                  <div class="view-button">
                    <span>Смотреть работы</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="portfolio-navigation">
          <button class="portfolio-nav-prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="portfolio-nav-next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div v-else class="portfolio-grid">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="portfolio-grid-item"
          :style="{ '--columns': gridColumns }"
          @click="clickSlide(index)"
        >
          <div class="portfolio-card">
            <div class="card-image">
              <NuxtImg :src="item.url" :alt="item.title" class="portfolio-image" loading="lazy" />
              <div class="image-overlay"></div>

              <div class="portfolio-name-wrapper">
                <h3 class="portfolio-name">{{ item.title }}</h3>
              </div>

              <div class="view-button">
                <span>Смотреть работы</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.portfolio-section {
  padding: 80px 0;
  position: relative;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);

  ._container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.portfolio-title {
  font-size: 3.5rem;
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
    background: linear-gradient(90deg, #4a148c, #7b1fa2);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  &:hover .title-decoration {
    width: 120px;
  }
}

.section-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  margin: 0 0 25px 0;
  font-family: "Open Sans", sans-serif;
  letter-spacing: 0.3px;
  font-weight: 500;
}

.view-toggle {
  display: inline-flex;
  background: #f3f4f6;
  border-radius: 50px;
  padding: 4px;
  margin-top: 20px;

  button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 50px;

    svg {
      transition: all 0.3s ease;
    }

    &.active {
      background: white;
      color: #4a148c;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      svg {
        color: #7b1fa2;
      }
    }

    &:hover:not(.active) {
      color: #4b5563;
    }
  }
}

.portfolio-swiper-container {
  position: relative;
  padding: 40px 0;
}

.portfolio-swiper {
  overflow: visible;
  padding: 20px 0;
}

.portfolio-slide {
  width: 500px;
  height: auto;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;

  &.swiper-slide-active {
    transform: scale(1.05);
    z-index: 2;
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 24px;
  padding: 20px 0;

  @media (max-width: 1024px) {
    gap: 16px;
  }
}

.portfolio-grid-item {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);

    .portfolio-card {
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    }

    .image-overlay {
      opacity: 0.5;
    }

    .view-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.portfolio-card {
  background: white;
  border-radius: 16px;
  height: 100%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.card-image {
  position: relative;
  padding-top: 70%;
  overflow: hidden;

  .portfolio-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
    opacity: 0.5;
    transition: opacity 0.4s ease;
  }
}

.portfolio-name-wrapper {
  position: absolute;
  bottom: 20px;
  right: 20px;
  max-width: 80%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  border-radius: 8px;
  padding: 12px 20px;
  z-index: 2;
}

.portfolio-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1.3;
  letter-spacing: 0.6px;
  text-align: right;
  font-family: "Montserrat", sans-serif;
}

.view-button {
  position: absolute;
  top: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  color: #2b5876;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateY(-10px);
  opacity: 0;
  letter-spacing: 0.3px;
  z-index: 3;
  font-family: "Montserrat", sans-serif;

  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: white;

    svg {
      transform: translateX(4px);
    }
  }
}

.portfolio-pagination {
  position: relative;
  margin-top: 30px;

  // :deep(.swiper-pagination-bullet) {
  //   width: 12px;
  //   height: 12px;
  //   background: #d1d5db;
  //   opacity: 1;
  //   transition: all 0.3s ease;
  //   margin: 0 6px !important;

  //   &-active {
  //     background: linear-gradient(45deg, #4a148c, #7b1fa2);
  //     transform: scale(1.2);
  //   }
  // }
}

.portfolio-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;

  button {
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

    &:hover {
      background: #7b1fa2;
      color: white;
      transform: scale(1.1);
    }
  }
}

@media (max-width: 1024px) {
  .portfolio-section {
    padding: 60px 0;
  }

  .portfolio-title {
    font-size: 2.5rem;
  }

  .portfolio-slide {
    width: 380px;
  }

  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .portfolio-section {
    padding: 40px 0;
  }

  .portfolio-title {
    font-size: 2rem;

    .title-decoration {
      height: 4px;
      bottom: -10px;
    }
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .portfolio-navigation {
    display: none;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-slide {
    width: 320px;
  }
}

@media (max-width: 480px) {
  .portfolio-title {
    font-size: 1.75rem;

    .title-decoration {
      width: 60px;
      height: 3px;
      bottom: -8px;
    }

    &:hover .title-decoration {
      width: 80px;
    }
  }

  .view-toggle {
    button {
      padding: 6px 12px;
      font-size: 13px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .portfolio-name-wrapper {
    padding: 8px 14px;
  }

  .view-button {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style> -->

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { useDisplay } from "vuetify";

const { sm, md, lg, xl } = useDisplay();

const props = defineProps({
  data: {
    type: Array,
    required: true,
    validator: (value) => value.every((item) => item.url && item.title),
  },
  viewMode: {
    type: String,
    default: "carousel", // 'carousel' или 'grid'
    validator: (value) => ["carousel", "grid"].includes(value),
  },
});

const popup = reactive({
  index: 0,
  visibility: false,
});

const swiperInstance = ref(null);
const activeView = ref(props.viewMode);

// Для сетки - используем breakpoints Vuetify
const gridCols = computed(() => {
  if (xl.value) return 4;
  if (lg.value) return 3;
  if (md.value) return 2;
  return 1;
});

function clickSlide(ind) {
  toggleBodyScroll(true);
  setIndexSlide(ind);
  toggleVisibilityPopup();
}

function setIndexSlide(ind) {
  popup.index = ind;
}

function toggleVisibilityPopup() {
  popup.visibility = !popup.visibility;
}

function closePopup() {
  toggleVisibilityPopup(false);
  toggleBodyScroll(false);
}

function toggleBodyScroll(lock) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
}

function toggleViewMode() {
  activeView.value = activeView.value === "carousel" ? "grid" : "carousel";

  nextTick(() => {
    if (activeView.value === "carousel") {
      if (swiperInstance.value) {
        swiperInstance.value.destroy();
        swiperInstance.value = null;
      }
      initSwiper();
    } else if (swiperInstance.value) {
      swiperInstance.value.destroy();
      swiperInstance.value = null;
    }
  });
}

function initSwiper() {
  swiperInstance.value = new Swiper(".portfolio-swiper", {
    modules: [Navigation, EffectCoverflow, Pagination],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    initialSlide: Math.floor(props.data.length / 2),
    coverflowEffect: {
      rotate: 0,
      stretch: -40,
      depth: 120,
      modifier: 1.5,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".portfolio-nav-next",
      prevEl: ".portfolio-nav-prev",
    },
    pagination: {
      el: ".portfolio-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.01,
        spaceBetween: 16,
        coverflowEffect: {
          stretch: 0,
          depth: 50,
          modifier: 1,
        },
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 24,
        coverflowEffect: {
          stretch: -40,
          depth: 120,
          modifier: 1.5,
        },
      },
    },
  });
}

onMounted(() => {
  if (activeView.value === "carousel") {
    initSwiper();
  }
});

onUnmounted(() => {
  if (swiperInstance.value) swiperInstance.value.destroy();
});
</script>

<template>
  <PopupSlider @someEvent="closePopup" v-if="popup.visibility" :data="data[popup.index].work"></PopupSlider>

  <section class="portfolio-section">
    <div class="_container">
      <div class="section-header">
        <h2 class="portfolio-title">
          <span class="title-text">НАШИ РАБОТЫ</span>
          <span class="title-decoration"></span>
        </h2>
        <p class="section-subtitle">Реализованные работы с безупречным качеством исполнения</p>

        <div class="view-toggle">
          <button :class="{ active: activeView === 'carousel' }" @click="toggleViewMode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 18V6C8 4.89543 8.89543 4 10 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H10C8.89543 20 8 19.1046 8 18Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M2 18V6C2 4.89543 2.89543 4 4 4H6C7.10457 4 8 4.89543 8 6V18C8 19.1046 7.10457 20 6 20H4C2.89543 20 2 19.1046 2 18Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Карусель
          </button>
          <button :class="{ active: activeView === 'grid' }" @click="toggleViewMode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 4H4C2.89543 4 2 4.89543 2 6V10C2 11.1046 2.89543 12 4 12H10C11.1046 12 12 11.1046 12 10V6C12 4.89543 11.1046 4 10 4Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M20 4H14C12.8954 4 12 4.89543 12 6V10C12 11.1046 12.8954 12 14 12H20C21.1046 12 22 11.1046 22 10V6C22 4.89543 21.1046 4 20 4Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M10 14H4C2.89543 14 2 14.8954 2 16V20C2 21.1046 2.89543 22 4 22H10C11.1046 22 12 21.1046 12 20V16C12 14.8954 11.1046 14 10 14Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M20 14H14C12.8954 14 12 14.8954 12 16V20C12 21.1046 12.8954 22 14 22H20C21.1046 22 22 21.1046 22 20V16C22 14.8954 21.1046 14 20 14Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Сетка
          </button>
        </div>
      </div>

      <div v-if="activeView === 'carousel'" class="portfolio-swiper-container">
        <div class="portfolio-swiper swiper">
          <div class="swiper-wrapper">
            <div v-for="(item, index) in data" :key="index" class="swiper-slide portfolio-slide" @click="clickSlide(index)">
              <div class="portfolio-card">
                <div class="card-image">
                  <NuxtImg :src="item.url" :alt="item.title" class="portfolio-image" loading="lazy" />
                  <div class="image-overlay"></div>

                  <div v-if="item.title" class="portfolio-name-wrapper">
                    <h3 class="portfolio-name">{{ item.title }}</h3>
                  </div>

                  <div class="view-button">
                    <span>Смотреть работы</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="portfolio-navigation">
          <button class="portfolio-nav-prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="portfolio-nav-next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <v-container v-else class="portfolio-grid-container">
        <v-row dense>
          <v-col
            v-for="(item, index) in data"
            :key="index"
            cols="12"
            :sm="gridCols >= 2 ? 6 : 12"
            :md="gridCols >= 3 ? 4 : gridCols >= 2 ? 6 : 12"
            :lg="gridCols >= 4 ? 3 : gridCols >= 3 ? 4 : gridCols >= 2 ? 6 : 12"
            @click="clickSlide(index)"
          >
            <div class="portfolio-card">
              <div class="card-image">
                <NuxtImg :src="item.url" :alt="item.title" class="portfolio-image" loading="lazy" />
                <div class="image-overlay"></div>

                <div class="portfolio-name-wrapper">
                  <h3 class="portfolio-name">{{ item.title }}</h3>
                </div>

                <div class="view-button">
                  <span>Смотреть работы</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
.portfolio-section {
  padding: 80px 0;
  position: relative;
  // background: linear-gradient(to bottom, #f9fafb, #ffffff);
  overflow: hidden;

  ._container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.section-header {
  text-align: center;
  // margin-bottom: 40px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  @media (max-width: $md4) {
    margin: 0px 0px 10px 0px;
  }
}

.portfolio-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 30px 0;
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
    background: linear-gradient(90deg, #2c3e50, #1a1a1a);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  &:hover .title-decoration {
    width: 120px;
  }
}

.section-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  margin: 0 0 25px 0;
  font-family: "Open Sans", sans-serif;
  letter-spacing: 0.3px;
  font-weight: 500;
}

.view-toggle {
  display: inline-flex;
  background: #f3f4f6;
  border-radius: 50px;
  padding: 4px;
  margin-top: 20px;

  button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 50px;

    svg {
      transition: all 0.3s ease;
    }

    &.active {
      background: white;
      color: #ea5b0c;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      svg {
        color: #ea5b0c;
      }
    }

    &:hover:not(.active) {
      color: #4b5563;
    }
  }
}

.portfolio-swiper-container {
  position: relative;
  padding: 40px 0;
  @media (max-width: $md4) {
    padding: 0;
  }
}

.portfolio-swiper {
  overflow: visible;
  padding: 20px 0;
}

.portfolio-slide {
  width: 500px;
  height: auto;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;

  &.swiper-slide-active {
    transform: scale(1.05);
    z-index: 2;
  }
}

.portfolio-grid-container {
  padding: 20px 0 !important;
}

.portfolio-card {
  background: white;
  border-radius: 16px;
  height: 100%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid rgba(0, 0, 0, 0.03);
  // margin-bottom: 16px;

  &:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px);

    .image-overlay {
      opacity: 0.5;
    }

    .view-button {
      opacity: 1;
      transform: translateY(0);
    }
    @media (max-width: $md4) {
      transform: none;
      .view-button {
        opacity: 0;
        transform: none;
      }
    }
  }
}

.card-image {
  position: relative;
  padding-top: 70%;
  overflow: hidden;

  .portfolio-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
    opacity: 0.5;
    transition: opacity 0.4s ease;
  }
}

.portfolio-name-wrapper {
  position: absolute;
  bottom: 20px;
  right: 20px;
  max-width: 80%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  border-radius: 8px;
  padding: 12px 20px;
  z-index: 2;
}

.portfolio-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1.3;
  letter-spacing: 0.6px;
  text-align: right;
  font-family: "Montserrat", sans-serif;
}

.view-button {
  position: absolute;
  top: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  color: #2b5876;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateY(-10px);
  opacity: 0;
  letter-spacing: 0.3px;
  z-index: 3;
  font-family: "Montserrat", sans-serif;

  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: white;

    svg {
      transform: translateX(4px);
    }
  }
}

.portfolio-pagination {
  position: relative;
  margin-top: 30px;
}

.portfolio-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;

  button {
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

    &:hover {
      background: #ea5b0c;
      color: white;
      transform: scale(1.1);
    }
  }
}

@media (max-width: 1024px) {
  .portfolio-section {
    padding: 60px 0;
  }

  .portfolio-title {
    font-size: 2.5rem;
  }

  .portfolio-slide {
    width: 380px;
  }
}

@media (max-width: 768px) {
  .portfolio-section {
    padding: 40px 0;
  }

  .portfolio-title {
    font-size: 2rem;

    .title-decoration {
      height: 4px;
      bottom: -10px;
    }
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .portfolio-navigation {
    display: none;
  }

  .portfolio-slide {
    width: 320px;
  }
}

@media (max-width: 480px) {
  .portfolio-title {
    font-size: 1.75rem;

    .title-decoration {
      width: 60px;
      height: 3px;
      bottom: -8px;
    }

    &:hover .title-decoration {
      width: 80px;
    }
  }

  .view-toggle {
    margin-top: 0;
    button {
      padding: 6px 12px;
      font-size: 13px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .portfolio-name-wrapper {
    padding: 8px 14px;
  }

  .view-button {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>
