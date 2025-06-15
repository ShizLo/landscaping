<!-- <template>
  <div class="gallery-container _container">

    <div class="swiper main-gallery" ref="mainSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in items" :key="index">
          <v-card class="gallery-item" @click="openLightbox(index)">
            <v-img :src="item.image" :alt="item.title" cover class="gallery-image" />
            <v-card-title class="gallery-title">{{ item.title }}</v-card-title>
          </v-card>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <v-dialog v-model="lightbox" fullscreen transition="dialog-bottom-transition">
      <v-card color="black">
        <v-toolbar dark color="black">
          <v-btn icon dark @click="lightbox = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ currentItem.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{ currentIndex + 1 }} / {{ items.length }}</v-toolbar-title>
        </v-toolbar>

        <div class="lightbox-content">
          <div class="swiper lightbox-gallery" ref="lightboxSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                <div class="lightbox-image-container">
                  <v-img :src="item.image" :alt="item.title" contain class="lightbox-image" />
                </div>
                <div class="lightbox-caption pa-4">
                  <h2 class="text-h5 mb-2">{{ item.title }}</h2>
                  <p v-if="item.description">{{ item.description }}</p>
                </div>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  name: "WorkGallery",
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) => {
        return value.every((item) => item.image && item.title);
      },
    },
  },
  setup(props) {
    const lightbox = ref(false);
    const currentIndex = ref(0);
    const currentItem = ref({});
    const mainSwiper = ref(null);
    const lightboxSwiper = ref(null);
    let mainSwiperInstance = null;
    let lightboxSwiperInstance = null;

    const breakpoints = {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    };

    const initMainSwiper = () => {
      if (mainSwiperInstance) mainSwiperInstance.destroy();

      mainSwiperInstance = new Swiper(mainSwiper.value, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: breakpoints,
      });
    };

    const initLightboxSwiper = () => {
      if (lightboxSwiperInstance) lightboxSwiperInstance.destroy();

      lightboxSwiperInstance = new Swiper(lightboxSwiper.value, {
        initialSlide: currentIndex.value,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".lightbox-gallery .swiper-button-next",
          prevEl: ".lightbox-gallery .swiper-button-prev",
        },
        on: {
          slideChange: (swiper) => {
            currentIndex.value = swiper.activeIndex;
            currentItem.value = props.items[swiper.activeIndex];
          },
        },
      });
    };

    const openLightbox = (index) => {
      currentIndex.value = index;
      currentItem.value = props.items[index];
      lightbox.value = true;

      // Инициализируем lightbox swiper после открытия модального окна
      setTimeout(() => {
        initLightboxSwiper();
        if (lightboxSwiperInstance) {
          lightboxSwiperInstance.slideTo(index);
        }
      }, 50);
    };

    onMounted(() => {
      initMainSwiper();
    });

    onBeforeUnmount(() => {
      if (mainSwiperInstance) mainSwiperInstance.destroy();
      if (lightboxSwiperInstance) lightboxSwiperInstance.destroy();
    });

    watch(lightbox, (newVal) => {
      if (newVal) {
        // Даем время для отрисовки модального окна
        setTimeout(initLightboxSwiper, 50);
      } else {
        if (lightboxSwiperInstance) {
          lightboxSwiperInstance.destroy();
          lightboxSwiperInstance = null;
        }
      }
    });

    return {
      lightbox,
      currentIndex,
      currentItem,
      mainSwiper,
      lightboxSwiper,
      openLightbox,
    };
  },
};
</script>

<style scoped>
.gallery-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
}

.main-gallery {
  /* padding: 20px; */
}

.gallery-item {
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 100%;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-image {
  height: 300px;
}

.gallery-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
}

.lightbox-content {
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-gallery {
  width: 100%;
  height: 100%;
}

.lightbox-image-container {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-height: 100%;
  max-width: 100%;
}

.lightbox-caption {
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.swiper-button-next,
.swiper-button-prev {
  color: white !important;
}

.swiper-pagination-bullet-active {
  background: white !important;
}

@media (max-width: 600px) {
  .lightbox-image-container {
    height: 60vh;
  }
}
</style> -->

<!-- <template>
  <div class="gallery-container _container">
    <h2 class="gallery-heading text-h4 text-md-h3 text-center mb-8">Наши работы</h2>

    <div class="swiper main-gallery" ref="mainSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in items" :key="index">
          <v-card class="gallery-item elevation-4" @click="openLightbox(index)" :style="{ '--hover-color': item.color || '#4a148c' }">
            <div class="image-wrapper">
              <v-img :src="item.image" :alt="item.title" cover class="gallery-image" :transition="true" />
              <div class="overlay"></div>
              <v-icon class="zoom-icon" size="48">mdi-magnify-plus-outline</v-icon>
            </div>
            <v-card-title class="gallery-title">{{ item.title }}</v-card-title>
            <v-card-subtitle v-if="item.subtitle" class="gallery-subtitle">{{ item.subtitle }}</v-card-subtitle>
          </v-card>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev custom-prev"></div>
      <div class="swiper-button-next custom-next"></div>
    </div>
    <v-dialog v-model="lightbox" fullscreen transition="dialog-bottom-transition">
      <v-card color="black" class="lightbox-card">
        <v-toolbar dark color="transparent" class="lightbox-toolbar">
          <v-btn icon dark @click="lightbox = false" class="close-btn">
            <v-icon size="32">mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="lightbox-title">{{ currentItem.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title class="lightbox-counter">{{ currentIndex + 1 }} / {{ items.length }}</v-toolbar-title>
        </v-toolbar>

        <div class="lightbox-content">
          <div class="swiper lightbox-gallery" ref="lightboxSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                <div class="lightbox-image-container">
                  <v-img :src="item.image" :alt="item.title" contain class="lightbox-image" />
                </div>
                <div class="lightbox-caption pa-4">
                  <h2 class="text-h4 mb-2">{{ item.title }}</h2>
                  <p v-if="item.description" class="text-body-1">{{ item.description }}</p>
                  <v-chip v-if="item.category" class="mt-2" :color="item.color || 'primary'">
                    {{ item.category }}
                  </v-chip>
                </div>
              </div>
            </div>
            <div class="swiper-button-prev lightbox-prev"></div>
            <div class="swiper-button-next lightbox-next"></div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default {
  name: "WorkGallery",
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) => {
        return value.every((item) => item.image && item.title);
      },
    },
  },
  setup(props) {
    const lightbox = ref(false);
    const currentIndex = ref(0);
    const currentItem = ref({});
    const mainSwiper = ref(null);
    const lightboxSwiper = ref(null);
    let mainSwiperInstance = null;
    let lightboxSwiperInstance = null;

    const breakpoints = {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    };

    const initMainSwiper = () => {
      if (mainSwiperInstance) mainSwiperInstance.destroy();

      mainSwiperInstance = new Swiper(mainSwiper.value, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        breakpoints: breakpoints,
      });
    };

    const initLightboxSwiper = () => {
      if (lightboxSwiperInstance) lightboxSwiperInstance.destroy();

      lightboxSwiperInstance = new Swiper(lightboxSwiper.value, {
        modules: [Navigation],
        initialSlide: currentIndex.value,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".lightbox-next",
          prevEl: ".lightbox-prev",
        },
        on: {
          slideChange: (swiper) => {
            currentIndex.value = swiper.activeIndex;
            currentItem.value = props.items[swiper.activeIndex];
          },
        },
      });
    };

    const openLightbox = (index) => {
      currentIndex.value = index;
      currentItem.value = props.items[index];
      lightbox.value = true;

      setTimeout(() => {
        initLightboxSwiper();
        if (lightboxSwiperInstance) {
          lightboxSwiperInstance.slideTo(index);
        }
      }, 50);
    };

    onMounted(() => {
      initMainSwiper();
    });

    onBeforeUnmount(() => {
      if (mainSwiperInstance) mainSwiperInstance.destroy();
      if (lightboxSwiperInstance) lightboxSwiperInstance.destroy();
    });

    watch(lightbox, (newVal) => {
      if (newVal) {
        setTimeout(initLightboxSwiper, 50);
      } else {
        if (lightboxSwiperInstance) {
          lightboxSwiperInstance.destroy();
          lightboxSwiperInstance = null;
        }
      }
    });

    return {
      lightbox,
      currentIndex,
      currentItem,
      mainSwiper,
      lightboxSwiper,
      openLightbox,
    };
  },
};
</script>

<style scoped lang="scss">
.gallery-container {
  width: 100%;
  margin: 0 auto;
  padding: 60px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 50%, rgba(74, 20, 140, 0.1) 0%, rgba(0, 0, 0, 0) 50%);
    pointer-events: none;
    z-index: -1;
  }
}

.gallery-heading {
  font-weight: 700;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #4a148c, #7b1fa2, #4a148c);
    border-radius: 3px;
  }
}

.main-gallery {
  padding: 20px 40px;
  position: relative;

  .swiper-wrapper {
    padding-bottom: 20px;
  }
}

.gallery-item {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  border-radius: 12px !important;
  overflow: hidden;
  background: transparent !important;
  border: none;
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2) !important;

    .overlay {
      opacity: 0.7;
    }

    .zoom-icon {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.gallery-image {
  height: 280px;
  transition: transform 0.5s ease;
  will-change: transform;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--hover-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.zoom-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
}

.gallery-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 16px;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.gallery-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  padding-left: 16px;
  padding-bottom: 8px;
}

.swiper-pagination {
  bottom: 0 !important;

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: white;
    opacity: 0.5;
    transition: all 0.3s ease;
    margin: 0 6px !important;

    &-active {
      opacity: 1;
      background: linear-gradient(45deg, #4a148c, #7b1fa2);
      transform: scale(1.2);
    }
  }
}

.custom-next,
.custom-prev {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  color: #4a148c !important;
  top: 50%;
  transform: translateY(-50%);

  &::after {
    font-size: 24px;
    font-weight: bold;
  }

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }
}

.custom-next {
  right: 10px;
}

.custom-prev {
  left: 10px;
}

/* Лайтбокс стили */
.lightbox-card {
  background: linear-gradient(135deg, #121212, #1e1e1e) !important;
}

.lightbox-toolbar {
  padding: 0 24px;
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(10px);
}

.close-btn {
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(90deg);
    color: #ff5252 !important;
  }
}

.lightbox-title {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.lightbox-counter {
  font-weight: 500;
  opacity: 0.8;
}

.lightbox-content {
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-gallery {
  width: 100%;
  height: 100%;
  max-width: 1400px;
}

.lightbox-image-container {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lightbox-image {
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.lightbox-caption {
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.lightbox-prev,
.lightbox-next {
  color: white !important;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &::after {
    font-size: 28px;
    font-weight: bold;
  }
}

@media (max-width: 960px) {
  .gallery-container {
    padding: 40px 0;
  }

  .gallery-heading {
    font-size: 2rem !important;
  }

  .main-gallery {
    padding: 20px;
  }

  .lightbox-image-container {
    height: 50vh;
    padding: 20px;
  }

  .lightbox-caption {
    padding: 16px;
  }
}

@media (max-width: 600px) {
  .gallery-heading {
    font-size: 1.75rem !important;
  }

  .gallery-image {
    height: 220px;
  }

  .lightbox-image-container {
    height: 40vh;
    padding: 10px;
  }

  .lightbox-caption {
    h2 {
      font-size: 1.25rem !important;
    }
    p {
      font-size: 0.875rem !important;
    }
  }
}
</style> -->
