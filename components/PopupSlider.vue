<script setup>
import { onMounted, onUnmounted, reactive } from "vue";
import Swiper from "swiper/bundle";
import { swiper_popup_work } from "../assets/js/swiper";
import { toggleBodyScroll } from "../assets/js/utils/toggleBodyScroll";

const swiper_popup = new Swiper(".swiper-popup-work", swiper_popup_work);
const popup = reactive({
  index: 1,
});

function swiperInit() {
  swiper_popup.init();
  listenerTouch();
  swiper_popup.on("slideChange", function () {
    popup.index = swiper_popup.realIndex + 1;
  });
}

// let vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty("--vh", `${vh}px`);

const props = defineProps({
  data: {
    type: Array,
  },
});

const emit = defineEmits(["someEvent"]);

// function listenerTouch() {
//   let startY = 0;
//   let endY = 0;
//   const swiperContainer = document.querySelector(".swiper-popup-work");

//   swiperContainer.addEventListener("touchstart", (e) => {
//     startY = e.touches[0].clientY;
//   });

//   swiperContainer.addEventListener("touchend", (e) => {
//     endY = e.changedTouches[0].clientY;
//     const deltaY = endY - startY;
//     if (deltaY > 100) {
//       // Скролл вниз
//       emit("someEvent");
//     } else if (deltaY < -100) {
//       // Скролл вверх
//       emit("someEvent"); // Закрытие окна при скролле вверх
//     }
//   });
// }
function listenerTouch() {
  let startY = 0;
  let endY = 0;
  let isZooming = false;
  const swiperContainer = document.querySelector(".swiper-popup-work");

  // Слушаем событие zoomChange для определения, когда происходит масштабирование
  swiper_popup.on("zoomChange", () => {
    isZooming = swiper_popup.zoom.scale > 1;
  });

  swiperContainer.addEventListener("touchstart", (e) => {
    // Если уже масштабируем, не начинаем отслеживание свайпа
    if (isZooming) return;
    startY = e.touches[0].clientY;
  });

  swiperContainer.addEventListener("touchend", (e) => {
    // Если масштабируем, игнорируем событие
    if (isZooming) return;

    endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;

    // Увеличиваем порог срабатывания, чтобы уменьшить случайные закрытия
    const threshold = 150;

    if (deltaY > threshold) {
      emit("someEvent");
    } else if (deltaY < -threshold) {
      emit("someEvent");
    }
  });
}
onMounted(() => {
  toggleBodyScroll(true);
  swiperInit();
});
onUnmounted(() => {
  swiper_popup.destroy();
});
</script>
<template>
  <div class="popup-slider__wraper">
    <div class="viewer-header">
      <div class="viewer-author"></div>
      <div class="viewer-title">
        <span class="ui-viewer-title-text">{{ data[0].alt }} {{ popup.index }} из {{ data.length }}</span>
      </div>
      <div class="viewer-action">
        <div @click="emit('someEvent')" class="ui-viewer-close">
          <div class="ui-viewer-close-icon"></div>
        </div>
      </div>
    </div>
    <div class="swiper-container">
      <div class="swiper-popup-work">
        <div class="swiper-wrapper">
          <div v-for="(item, k) in data" class="swiper-slide">
            <div class="swiper-zoom-container">
              <!-- <NuxtImg loading="lazy" :src="item.url" :alt="item.alt" class="swiper__img" /> -->
              <img loading="lazy" :src="item.url" :alt="item.alt" class="swiper__img" />
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
.swiper-zoom-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide {
  position: relative;
  overflow: hidden; /* Добавляем overflow: hidden для корректного отображения zoom */
}
.popup-slider {
  &__wraper {
    position: fixed;
    z-index: 20;
    background-color: rgba(22, 22, 22, 0.925);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }
}
.swiper-container {
  flex: 1;
  max-width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 8px;
  @media (max-width: $md4) {
    max-height: 75dvh;
    margin: 0px 8px;
  }
}
.swiper-popup-work {
  max-width: 100%;
  height: 100%;
  margin: auto;
  // transition: transform 1s ease-in-out;
}
.swiper {
  &__img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    box-shadow: 1px 1px 3px 0px rgba(34, 60, 80, 0.2);
  }
}
.swiper-slide {
  position: relative;
}
.swiper-popup-work > .swiper-button-prev {
  left: 25px;
}
.swiper-popup-work > .swiper-button-next {
  right: 25px;
}
.swiper-popup-work > .swiper-button-prev::after {
  padding: 18px;
  font-size: 32px;
  color: #9d9ea0;
}
.swiper-popup-work > .swiper-button-next::after {
  padding: 18px;
  font-size: 32px;
  color: #9d9ea0;
}
.swiper-popup-work > .swiper-pagination {
  bottom: 20px;
}
.viewer-header {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, #000 0, rgba(0, 0, 0, 0) 100%);
  height: 85px;
}
.viewer-author {
  display: flex;
  align-items: center;
  height: 85px;
  flex: 0.5;
}
.viewer-title {
  display: flex;
  flex-wrap: wrap;
  height: 85px;
  flex: 2;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  white-space: normal;
  @media (max-width: $md4) {
    font-size: 16px;
  }
}
.viewer-action {
  display: flex;
  align-items: center;
  height: 85px;
  flex: 0.5;
  justify-content: end;
}
.ui-viewer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;
  cursor: pointer;
  transition: 0.3s;
  @media (max-width: $md4) {
    justify-content: end;
    padding: 15px;
  }
}
.ui-viewer-close-icon {
  position: relative;
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  opacity: 1;
  transition: 0.3s;
}
.ui-viewer-close-icon:before {
  transform: translateX(-50%) translateY(-50%) rotate(-45deg);
}
.ui-viewer-close-icon:after,
.ui-viewer-close-icon:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  transition: 0.3s;
}
.ui-viewer-close-icon:after {
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
}
</style>
