<!-- <script setup>
const router = useRouter();
function onHover(event, color) {
  event.currentTarget.style.transform = "translateY(-5px)";
  event.currentTarget.style.boxShadow = `0 10px 20px ${color}80`;
}

function leaveHover(event) {
  event.currentTarget.style.transform = "translateY(0)";
  // event.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
}

const show = ref(false);
const isRotated = ref(false);
const visibleItems = ref([]);

const props = defineProps({
  dataServices: {
    typeof: Array,
  },
  title: {
    typeof: String,
  },
  dopServices: {
    typeof: Array,
  },
});

// Анимация появления гарантийных элементов
const animateGaranty = (el) => {
  if (el.garanty) {
    el.garanty.forEach((_, index) => {
      setTimeout(() => {
        visibleItems.value.push(index);
      }, index * 200);
    });
  }
};
const emit = defineEmits(["isVisible"]);
function goTo(path) {
  if (path) {
    // router.push(path);
    return;
  } else {
    emit("isVisible");
  }
}
const showGaranties = reactive({
  value: false,
});

const animationDone = reactive({ value: false });

watch(
  () => props.dataServices,
  (newVal) => {
    if (newVal && newVal.some((col) => col.some((row) => row.some((item) => item.price)))) {
      showGaranties.value = true;
      startGarantyAnimation();
    }
  },
  { deep: true, immediate: true }
);
function startGarantyAnimation() {
  if (animationDone.value) return;

  const garantyItems = document.querySelectorAll(".garanty-item");
  garantyItems.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = `
        opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s,
        transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s
      `;
    }, 50);
  });

  animationDone.value = true;
}

onMounted(() => {
  if (showGaranties.value) {
    startGarantyAnimation();
  }
});
</script>

<template>
  <section class="services">
    <div class="services__container _container">
      <div class="section-header" v-if="title">
        <h2 class="section-title">
          <span class="title-text">{{ title }}</span>
          <span class="title-decoration"></span>
        </h2>
      </div>

      <div class="services__items">
        <div v-for="columns in dataServices" class="services__column">
          <div v-for="rows in columns" class="services__row">
            <div
              v-for="item in rows"
              class="services__item"
              v-on:mouseover="(event) => onHover(event, item.hoverColors)"
              v-on:mouseleave="leaveHover"
              :class="item.class"
            >
              <nuxt-link
                :to="{ name: item.routePath }"
                :style="{ 'background-image': 'url(' + item.pathImg + ')' }"
                class="services__item-link item"
                @click="goTo(item.routePath)"
              >
                <div class="item__description content__description">
                  <div class="item__title title">
                    <span>{{ item.title }}</span>
                  </div>
                  <div v-if="item.price" class="item__price content__price">
                    <span>{{ item.price }}</span>
                  </div>
                  <div class="ml-2 ml-lg-5 mt-2 mt-lg-16" v-if="item.garanty && showGaranties.value">
                    <div
                      class="d-flex align-senter mb-0 mb-lg-1 garanty-item"
                      v-for="(garanty, gIndex) in item.garanty"
                      :key="gIndex"
                      :style="{
                        opacity: animationDone ? 1 : 0,
                        transform: animationDone ? 'translateY(0)' : 'translateY(15px)',
                      }"
                    >
                      <div class="d-flex align-center">
                        <v-icon class="mr-2 text-h6 text-lg-h5">
                          <v-img :src="garanty.icon"></v-img>
                        </v-icon>
                      </div>
                      <div class="text-caption text-lg-subtitle-1">{{ garanty.text }}</div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <v-expand-transition v-if="dopServices">
        <div v-show="show" class="expanded-content">
          <div class="services__items">
            <div v-for="columns in dopServices" class="services__column">
              <div v-for="rows in columns" class="services__row">
                <div
                  v-for="item in rows"
                  class="services__item"
                  v-on:mouseover="(event) => onHover(event, item.hoverColors)"
                  v-on:mouseleave="leaveHover"
                  :class="item.class"
                >
                  <nuxt-link
                    :to="{ name: item.routePath }"
                    :style="{ 'background-image': 'url(' + item.pathImg + ')' }"
                    class="services__item-link item"
                    @click="goTo(item.routePath)"
                  >
                    <div class="item__description content__description">
                      <div class="item__title title">
                        <span>{{ item.title }}</span>
                      </div>
                      <div v-if="item.price" class="item__price content__price">
                        <span>{{ item.price }}</span>
                      </div>
                      <div class="ml-2 ml-lg-5 mt-2 mt-lg-16" v-if="item.garanty">
                        <div
                          class="d-flex align-senter mb-0 mb-lg-1 garanty-item"
                          v-for="garanty in item.garanty"
                          style="opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.5s ease"
                        >
                          <div class="d-flex align-center">
                            <v-icon class="mr-2 text-h6 text-lg-h5">
                              <v-img :src="garanty.icon"></v-img>
                            </v-icon>
                          </div>
                          <div class="text-caption text-lg-subtitle-1">{{ garanty.text }}</div>
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-expand-transition>

      <div v-if="dopServices" class="d-flex justify-center my-6">
        <v-btn @click="(isRotated = !isRotated), (show = !show)" elevation="0">
          {{ show ? "Скрыть" : "Показать еще услуги" }}
          <v-icon :class="{ 'rotate-180': isRotated }" class="ml-2 transition-transform"> mdi-chevron-down </v-icon>
        </v-btn>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");
.services {
  margin-bottom: 15px;
  font-family: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  // padding-top: 40px;
  @media (max-width: $md4) {
    margin: 0px 0px 7px 0px;
  }

  .section-header {
    margin-bottom: 60px;
    line-height: 1.2;
    text-align: center;
    @media (max-width: $md4) {
      margin-bottom: 20px;
    }
  }

  .section-title {
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
      // letter-spacing: -0.03em;
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

    @media (max-width: $md3) {
      font-size: 2rem;
    }

    @media (max-width: $md4) {
      font-size: 2rem;
      margin-bottom: 10px;

      .title-decoration {
        width: 60px;
        height: 3px;
        bottom: -8px;
      }

      &:hover .title-decoration {
        width: 80px;
      }
    }
  }

  &__items {
    display: flex;
    gap: 15px;
    @media (max-width: $md3) {
      flex-wrap: wrap;
    }
    @media (max-width: $md4) {
      gap: 7px;
    }
  }

  &__column {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 50%;
    gap: 15px;
    @media (max-width: $md3) {
      flex: 1 1 100%;
      &:last-child {
        flex-direction: column-reverse;
      }
    }
    @media (max-width: $md4) {
      gap: 7px;
    }
  }

  &__row {
    display: flex;
    width: 100%;
    gap: 15px;
    @media (max-width: $md4) {
      gap: 7px;
    }

    &-item-big {
      width: 100%;
      height: 315px;
      @media (max-width: $md1) {
        height: 320px;
      }
      @media (max-width: $md2) {
        height: 270px;
      }
      @media (max-width: $md3) {
        height: 180px;
      }
      @media (max-width: $md4) {
        height: 170px;
      }

      .title {
        font-weight: 700;
        line-height: 120%;
        color: #102939;
        padding: 25px 0px 0px 25px;
        font-size: 1.4rem;
        @media (max-width: $md4) {
          font-size: 20px;
          padding: 15px 10px 0px 10px;
        }
      }

      .item__price {
        letter-spacing: 0.3px;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.9) !important;
        @media (max-width: $md4) {
          font-size: 12px;
          margin-top: 7px;
          padding: 5px 7px;
          border-radius: 6px;
          letter-spacing: normal;
        }
      }
    }

    &-item-sm {
      width: 50%;
      height: 210px;
      @media (max-width: $md1) {
        height: 200px;
      }
      @media (max-width: $md2) {
        height: 150px;
      }
      @media (max-width: $md3) {
        height: 145px;
      }
      @media (max-width: $md4) {
        height: 135px;
      }

      .title {
        font-weight: 700;
        line-height: 120%;
        font-size: 1.4rem;
        padding: 25px 25px 0px 25px;
        color: #102939;
        @media (max-width: $md4) {
          font-size: 16px;
          padding: 15px 10px 0px 10px;
        }
      }

      .item__price {
        letter-spacing: 0.3px;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.9) !important;
        @media (max-width: $md4) {
          letter-spacing: normal;
          font-size: 12px;
          margin-top: 7px;
          padding: 5px 7px;
          border-radius: 6px;
        }
      }
    }
  }
}

.services__item {
  box-shadow: 1px 1px 3px 0px rgba(34, 60, 80, 0.18);
  display: flex;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: $color-background;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &-link {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    background-size: contain !important;
    background-position: 95% 100% !important;
    background-repeat: no-repeat !important;
    background-size: 100% auto !important;
    cursor: pointer;
    position: relative;
    @media (max-width: $md4) {
      background-size: 90% auto !important;
    }
    @media (max-width: $md3) {
      background-size: 65% auto !important;
    }
    @media (max-width: $md4) {
      background-size: 100% auto !important;
    }
  }
}

.item {
  &__description {
    position: relative;
    z-index: 2;
  }

  &__price {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 6px 10px;
    margin: 10px 0px 0px 18px;
    color: #102938;
    text-align: center;
    border-radius: 4px;
    z-index: 2;
    position: relative;
    @media (max-width: $md4) {
      font-size: 14px;
      margin: 8px 0px 0px 8px;
    }
  }
}

.show-more-btn {
  background: linear-gradient(135deg, #6e8efb, #a777e3) !important;
  color: white !important;
  padding: 12px 28px !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;

    &::before {
      left: 100%;
    }
  }

  @media (max-width: $md4) {
    padding: 10px 20px !important;
    font-size: 14px !important;
  }
}

.expanded-content {
  margin-top: 15px;
}

.rotate-180 {
  transform: rotate(180deg);
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.text-lg-subtitle-1 {
  font-size: 0.9rem !important;
  line-height: 1.7;
  color: #102939;
  z-index: 2;
  position: relative;
}
.text-lg-subtitle-1 {
  transition: color 0.2s ease;
}
.services__item:hover .garanty-item {
  transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.garanty-item {
  will-change: opacity, transform;
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.v-expand-transition-leave-active .garanty-item {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in !important;
}
</style> -->

<!-- <script setup>
const router = useRouter();
function onHover(event, color) {
  event.currentTarget.style.transform = "translateY(-5px)";
  event.currentTarget.style.boxShadow = `0 10px 20px ${color}80`;
}

function leaveHover(event) {
  event.currentTarget.style.transform = "translateY(0)";
}

const show = ref(false);
const isRotated = ref(false);
const visibleItems = ref([]);
const reveal = ref({}); // Объект для хранения состояния раскрытия каждой карточки

const props = defineProps({
  dataServices: {
    typeof: Array,
  },
  title: {
    typeof: String,
  },
  dopServices: {
    typeof: Array,
  },
});

// Инициализация состояний раскрытия для всех карточек
const initRevealStates = () => {
  if (props.dataServices) {
    props.dataServices.forEach((columns, colIndex) => {
      columns.forEach((rows, rowIndex) => {
        rows.forEach((item, itemIndex) => {
          const key = `${colIndex}-${rowIndex}-${itemIndex}`;
          reveal.value[key] = false;
        });
      });
    });
  }
};

// Анимация появления гарантийных элементов
const animateGaranty = (el) => {
  if (el.garanty) {
    el.garanty.forEach((_, index) => {
      setTimeout(() => {
        visibleItems.value.push(index);
      }, index * 200);
    });
  }
};
const emit = defineEmits(["isVisible"]);
function goTo(path, event) {
  if (path) {
    router.push(path);
    return;
  } else {
    event.preventDefault();
    event.stopPropagation();
    emit("isVisible");
  }
}
const showGaranties = reactive({
  value: false,
});

const animationDone = reactive({ value: false });

watch(
  () => props.dataServices,
  (newVal) => {
    if (newVal && newVal.some((col) => col.some((row) => row.some((item) => item.price)))) {
      showGaranties.value = true;
      startGarantyAnimation();
      initRevealStates(); // Инициализируем состояния при получении данных
    }
  },
  { deep: true, immediate: true }
);

function startGarantyAnimation() {
  if (animationDone.value) return;

  const garantyItems = document.querySelectorAll(".garanty-item");
  garantyItems.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = `
        opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s,
        transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s
      `;
    }, 50);
  });

  animationDone.value = true;
}

onMounted(() => {
  if (showGaranties.value) {
    startGarantyAnimation();
  }
  initRevealStates();
});

// Функция для переключения состояния раскрытия карточки
const toggleReveal = (colIndex, rowIndex, itemIndex, event) => {
  event.preventDefault();
  event.stopPropagation();
  const key = `${colIndex}-${rowIndex}-${itemIndex}`;
  reveal.value[key] = !reveal.value[key];
};
</script>

<template>
  <section class="services">
    <div class="services__container _container">
      <div class="section-header" v-if="title">
        <h2 class="section-title">
          <span class="title-text">{{ title }}</span>
          <span class="title-decoration"></span>
        </h2>
      </div>

      <div class="services__items">
        <div v-for="(columns, colIndex) in dataServices" class="services__column">
          <div v-for="(rows, rowIndex) in columns" class="services__row">
            <div
              v-for="(item, itemIndex) in rows"
              class="services__item"
              v-on:mouseover="(event) => onHover(event, item.hoverColors)"
              v-on:mouseleave="leaveHover"
              :class="item.class"
            >
              <nuxt-link
                :to="item.routePath ? { name: item.routePath } : undefined"
                :style="{ 'background-image': 'url(' + item.pathImg + ')' }"
                class="services__item-link item"
                @click="(e) => goTo(item.routePath, e)"
              >

                <v-btn
                  v-if="item.description"
                  icon
                  small
                  class="more-info-btn"
                  @click.stop.prevent="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)"
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>

                <div class="item__description content__description">
                  <div class="item__title title">
                    <span>{{ item.title }}</span>
                  </div>
                  <div v-if="item.price" class="item__price content__price">
                    <span>{{ item.price }}</span>
                  </div>
                  <div class="ml-2 ml-lg-5 mt-2 mt-lg-16" v-if="item.garanty && showGaranties.value">
                    <div
                      class="d-flex align-senter mb-0 mb-lg-1 garanty-item"
                      v-for="(garanty, gIndex) in item.garanty"
                      :key="gIndex"
                      :style="{
                        opacity: animationDone ? 1 : 0,
                        transform: animationDone ? 'translateY(0)' : 'translateY(15px)',
                      }"
                    >
                      <div class="d-flex align-center">
                        <v-icon class="mr-2 text-h6 text-lg-h5">
                          <v-img :src="garanty.icon"></v-img>
                        </v-icon>
                      </div>
                      <div class="text-caption text-lg-subtitle-1">{{ garanty.text }}</div>
                    </div>
                  </div>
                </div>
                <v-expand-transition>
                  <div v-if="item.description && reveal[`${colIndex}-${rowIndex}-${itemIndex}`]" class="description-panel" @click.stop>
                    <div class="description-content">
                      <p class="text-medium-emphasis">{{ item.description }}</p>
                      <v-btn
                        color="primary"
                        variant="text"
                        size="small"
                        @click.stop="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)"
                        class="mt-2"
                      >
                        Скрыть
                      </v-btn>
                    </div>
                  </div>
                </v-expand-transition>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <v-expand-transition v-if="dopServices">
        <div v-show="show" class="expanded-content">
          <div class="services__items">
            <div v-for="(columns, colIndex) in dopServices" class="services__column">
              <div v-for="(rows, rowIndex) in columns" class="services__row">
                <div
                  v-for="(item, itemIndex) in rows"
                  class="services__item"
                  v-on:mouseover="(event) => onHover(event, item.hoverColors)"
                  v-on:mouseleave="leaveHover"
                  :class="item.class"
                >
                  <nuxt-link
                    :to="item.routePath ? { name: item.routePath } : undefined"
                    :style="{ 'background-image': 'url(' + item.pathImg + ')' }"
                    class="services__item-link item"
                    @click="(e) => goTo(item.routePath, e)"
                  >
                    <v-btn
                      v-if="item.description"
                      icon
                      small
                      class="more-info-btn"
                      @click.stop.prevent="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)"
                    >
                      <v-icon>mdi-information-outline</v-icon>
                    </v-btn>

                    <div class="item__description content__description">
                      <div class="item__title title">
                        <span>{{ item.title }}</span>
                      </div>
                      <div v-if="item.price" class="item__price content__price">
                        <span>{{ item.price }}</span>
                      </div>
                      <div class="ml-2 ml-lg-5 mt-2 mt-lg-16" v-if="item.garanty">
                        <div
                          class="d-flex align-senter mb-0 mb-lg-1 garanty-item"
                          v-for="garanty in item.garanty"
                          style="opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.5s ease"
                        >
                          <div class="d-flex align-center">
                            <v-icon class="mr-2 text-h6 text-lg-h5">
                              <v-img :src="garanty.icon"></v-img>
                            </v-icon>
                          </div>
                          <div class="text-caption text-lg-subtitle-1">{{ garanty.text }}</div>
                        </div>
                      </div>
                    </div>
                    <v-expand-transition>
                      <div v-if="item.description && reveal[`${colIndex}-${rowIndex}-${itemIndex}`]" class="description-panel" @click.stop>
                        <div class="description-content">
                          <p class="text-medium-emphasis">{{ item.description }}</p>
                          <v-btn
                            color="primary"
                            variant="text"
                            size="small"
                            @click.stop="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)"
                            class="mt-2"
                          >
                            Скрыть
                          </v-btn>
                        </div>
                      </div>
                    </v-expand-transition>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-expand-transition>

      <div v-if="dopServices" class="d-flex justify-center my-6">
        <v-btn @click="(isRotated = !isRotated), (show = !show)" elevation="0">
          {{ show ? "Скрыть" : "Показать еще услуги" }}
          <v-icon :class="{ 'rotate-180': isRotated }" class="ml-2 transition-transform"> mdi-chevron-down </v-icon>
        </v-btn>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");

.services {
  margin-bottom: 15px;
  font-family: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  @media (max-width: $md4) {
    margin: 0px 0px 7px 0px;
  }

  .section-header {
    margin-bottom: 60px;
    line-height: 1.2;
    text-align: center;
    @media (max-width: $md4) {
      margin-bottom: 20px;
    }
  }

  .section-title {
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

    @media (max-width: $md3) {
      font-size: 2rem;
    }

    @media (max-width: $md4) {
      font-size: 2rem;
      margin-bottom: 10px;

      .title-decoration {
        width: 60px;
        height: 3px;
        bottom: -8px;
      }

      &:hover .title-decoration {
        width: 80px;
      }
    }
  }

  &__items {
    display: flex;
    gap: 15px;
    @media (max-width: $md3) {
      flex-wrap: wrap;
    }
    @media (max-width: $md4) {
      gap: 7px;
    }
  }

  &__column {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 50%;
    gap: 15px;
    @media (max-width: $md3) {
      flex: 1 1 100%;
      &:last-child {
        flex-direction: column-reverse;
      }
    }
    @media (max-width: $md4) {
      gap: 7px;
    }
  }

  &__row {
    display: flex;
    width: 100%;
    gap: 15px;
    @media (max-width: $md4) {
      gap: 7px;
    }

    &-item-big {
      width: 100%;
      height: 315px;
      @media (max-width: $md1) {
        height: 320px;
      }
      @media (max-width: $md2) {
        height: 270px;
      }
      @media (max-width: $md3) {
        height: 180px;
      }
      @media (max-width: $md4) {
        height: 170px;
      }

      .title {
        font-weight: 700;
        line-height: 120%;
        color: #102939;
        padding: 25px 0px 0px 25px;
        font-size: 1.4rem;
        @media (max-width: $md4) {
          font-size: 20px;
          padding: 15px 10px 0px 10px;
        }
      }

      .item__price {
        letter-spacing: 0.3px;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.9) !important;
        @media (max-width: $md4) {
          font-size: 12px;
          margin-top: 7px;
          padding: 5px 7px;
          border-radius: 6px;
          letter-spacing: normal;
        }
      }
    }

    &-item-sm {
      width: 50%;
      height: 210px;
      @media (max-width: $md1) {
        height: 200px;
      }
      @media (max-width: $md2) {
        height: 150px;
      }
      @media (max-width: $md3) {
        height: 145px;
      }
      @media (max-width: $md4) {
        height: 135px;
      }

      .title {
        font-weight: 700;
        line-height: 120%;
        font-size: 1.4rem;
        padding: 25px 25px 0px 25px;
        color: #102939;
        @media (max-width: $md4) {
          font-size: 16px;
          padding: 15px 10px 0px 10px;
        }
      }

      .item__price {
        letter-spacing: 0.3px;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.9) !important;
        @media (max-width: $md4) {
          letter-spacing: normal;
          font-size: 12px;
          margin-top: 7px;
          padding: 5px 7px;
          border-radius: 6px;
        }
      }
    }
  }
}

.services__item {
  box-shadow: 1px 1px 3px 0px rgba(34, 60, 80, 0.18);
  display: flex;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: $color-background;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;

  &-link {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    background-size: contain !important;
    background-position: 95% 100% !important;
    background-repeat: no-repeat !important;
    background-size: 100% auto !important;
    cursor: pointer;
    position: relative;
    @media (max-width: $md4) {
      background-size: 90% auto !important;
    }
    @media (max-width: $md3) {
      background-size: 65% auto !important;
    }
    @media (max-width: $md4) {
      background-size: 100% auto !important;
    }
  }
}

.item {
  &__description {
    position: relative;
    z-index: 2;
  }

  &__price {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 6px 10px;
    margin: 10px 0px 0px 18px;
    color: #102938;
    text-align: center;
    border-radius: 4px;
    z-index: 2;
    position: relative;
    @media (max-width: $md4) {
      font-size: 14px;
      margin: 8px 0px 0px 8px;
    }
  }
}

.show-more-btn {
  background: linear-gradient(135deg, #6e8efb, #a777e3) !important;
  color: white !important;
  padding: 12px 28px !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;

    &::before {
      left: 100%;
    }
  }

  @media (max-width: $md4) {
    padding: 10px 20px !important;
    font-size: 14px !important;
  }
}

.expanded-content {
  margin-top: 15px;
}

.rotate-180 {
  transform: rotate(180deg);
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.text-lg-subtitle-1 {
  font-size: 0.9rem !important;
  line-height: 1.7;
  color: #102939;
  z-index: 2;
  position: relative;
}
.text-lg-subtitle-1 {
  transition: color 0.2s ease;
}
.services__item:hover .garanty-item {
  transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.garanty-item {
  will-change: opacity, transform;
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.v-expand-transition-leave-active .garanty-item {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in !important;
}

/* Стили для панели описания */
.description-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  padding: 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 3;
  max-height: 70%;
  overflow-y: auto;

  .description-content {
    padding: 8px;

    .text-medium-emphasis {
      color: #102939;
      font-size: 0.875rem;
      line-height: 1.6;
      margin-bottom: 12px;
    }
  }
}

/* Стили для кнопки "Подробнее" */
.more-info-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
  background: rgba(255, 255, 255, 0.8) !important;
  color: #102939 !important;
  width: 24px !important;
  height: 24px !important;
  min-width: unset !important;

  .v-icon {
    font-size: 18px !important;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.9) !important;
  }
}

/* Адаптивные стили для панели описания */
@media (max-width: $md3) {
  .description-panel {
    padding: 12px;
    max-height: 60%;

    .description-content {
      .text-medium-emphasis {
        font-size: 0.8125rem;
      }
    }
  }

  .more-info-btn {
    top: 8px;
    right: 8px;
    width: 24px !important;
    height: 24px !important;

    .v-icon {
      font-size: 16px !important;
    }
  }
}

@media (max-width: $md4) {
  .description-panel {
    padding: 8px;
    max-height: 50%;

    .description-content {
      .text-medium-emphasis {
        font-size: 0.75rem;
      }
    }
  }
}
</style> -->

<script setup>
const router = useRouter();
function onHover(event, color) {
  // event.currentTarget.style.transform = "translateY(-5px)";
  // event.currentTarget.style.boxShadow = `0 10px 20px ${color}80`;
  event.currentTarget.style.backgroundColor = color;
}

function leaveHover(event) {
  event.currentTarget.style.transform = "translateY(0)";
  event.currentTarget.style.backgroundColor = "#f0f1f2ec";
  // event.currentTarget.style.boxShadow = `0 0 0 0`;
}

const show = ref(false);
const isRotated = ref(false);
const visibleItems = ref([]);
const reveal = ref({});

const props = defineProps({
  dataServices: {
    typeof: Array,
  },
  title: {
    typeof: String,
  },
  dopServices: {
    typeof: Array,
  },
});

const initRevealStates = () => {
  if (props.dataServices) {
    props.dataServices.forEach((columns, colIndex) => {
      columns.forEach((rows, rowIndex) => {
        rows.forEach((item, itemIndex) => {
          const key = `${colIndex}-${rowIndex}-${itemIndex}`;
          reveal.value[key] = false;
        });
      });
    });
  }
};

const animateGaranty = (el) => {
  if (el.garanty) {
    el.garanty.forEach((_, index) => {
      setTimeout(() => {
        visibleItems.value.push(index);
      }, index * 200);
    });
  }
};

const emit = defineEmits(["isVisible"]);
function goTo(path, event) {
  if (path) {
    router.push(path);
    return;
  } else {
    event.preventDefault();
    event.stopPropagation();
    emit("isVisible");
  }
}

const showGaranties = reactive({
  value: false,
});

const animationDone = reactive({ value: false });

watch(
  () => props.dataServices,
  (newVal) => {
    if (newVal && newVal.some((col) => col.some((row) => row.some((item) => item.price)))) {
      showGaranties.value = true;
      startGarantyAnimation();
      initRevealStates();
    }
  },
  { deep: true, immediate: true }
);

function startGarantyAnimation() {
  if (animationDone.value) return;

  const garantyItems = document.querySelectorAll(".garanty-item");
  garantyItems.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = `
        opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s,
        transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s
      `;
    }, 50);
  });

  animationDone.value = true;
}

onMounted(() => {
  if (showGaranties.value) {
    startGarantyAnimation();
  }
  initRevealStates();
});

const toggleReveal = (colIndex, rowIndex, itemIndex, event) => {
  event.preventDefault();
  event.stopPropagation();
  const key = `${colIndex}-${rowIndex}-${itemIndex}`;
  reveal.value[key] = !reveal.value[key];
};
</script>

<template>
  <section class="services">
    <div class="services__container _container">
      <div class="section-header" v-if="title">
        <h2 class="section-title">
          <span class="title-text">{{ title }}</span>
          <span class="title-decoration"></span>
        </h2>
      </div>

      <div class="services__items">
        <div v-for="(columns, colIndex) in dataServices" class="services__column">
          <div v-for="(rows, rowIndex) in columns" class="services__row">
            <div
              v-for="(item, itemIndex) in rows"
              class="services__item"
              v-on:mouseover="(event) => onHover(event, item.hoverColors)"
              v-on:mouseleave="leaveHover"
              :class="[{ 'description-open': reveal[`${colIndex}-${rowIndex}-${itemIndex}`] }, item.class]"
            >
              <nuxt-link
                :to="item.routePath ? { name: item.routePath } : undefined"
                :style="{ 'background-image': 'url(' + item.pathImg + ')' }"
                class="services__item-link item"
                @click="(e) => goTo(item.routePath, e)"
              >
                <v-btn
                  v-if="item.description"
                  icon
                  small
                  class="more-info-btn"
                  @click.stop.prevent="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)"
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>

                <div class="item__description content__description">
                  <div class="item__title title">
                    <span>{{ item.title }}</span>
                  </div>
                  <div v-if="item.price" class="item__price content__price">
                    <span>{{ item.price }}</span>
                  </div>
                  <div class="ml-2 ml-lg-5 mt-2 mt-lg-16" v-if="item.garanty && showGaranties.value">
                    <div
                      class="d-flex align-senter mb-0 mb-lg-1 garanty-item"
                      v-for="(garanty, gIndex) in item.garanty"
                      :key="gIndex"
                      :style="{
                        opacity: animationDone ? 1 : 0,
                        transform: animationDone ? 'translateY(0)' : 'translateY(15px)',
                      }"
                    >
                      <div class="d-flex align-center">
                        <v-icon class="mr-2 text-h6 text-lg-h5">
                          <v-img :src="garanty.icon"></v-img>
                        </v-icon>
                      </div>
                      <div class="text-caption text-lg-subtitle-1">{{ garanty.text }}</div>
                    </div>
                  </div>
                </div>

                <v-expand-transition>
                  <div v-if="item.description && reveal[`${colIndex}-${rowIndex}-${itemIndex}`]" class="description-panel" @click.stop>
                    <v-btn icon small class="close-btn" @click.stop="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <div class="description-content">
                      <p class="text-medium-emphasis">{{ item.description }}</p>
                    </div>
                  </div>
                </v-expand-transition>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <v-expand-transition v-if="dopServices">
        <div v-show="show" class="expanded-content">
          <div class="services__items">
            <div v-for="(columns, colIndex) in dopServices" class="services__column">
              <div v-for="(rows, rowIndex) in columns" class="services__row">
                <div
                  v-for="(item, itemIndex) in rows"
                  class="services__item"
                  v-on:mouseover="(event) => onHover(event, item.hoverColors)"
                  v-on:mouseleave="leaveHover"
                  :class="[{ 'description-open': reveal[`${colIndex}-${rowIndex}-${itemIndex}`] }, item.class]"
                >
                  <nuxt-link
                    :to="item.routePath ? { name: item.routePath } : undefined"
                    :style="{ 'background-image': 'url(' + item.pathImg + ')' }"
                    class="services__item-link item"
                    @click="(e) => goTo(item.routePath, e)"
                  >
                    <v-btn
                      v-if="item.description"
                      icon
                      small
                      class="more-info-btn"
                      @click.stop.prevent="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)"
                    >
                      <v-icon>mdi-information-outline</v-icon>
                    </v-btn>

                    <div class="item__description content__description">
                      <div class="item__title title">
                        <span>{{ item.title }}</span>
                      </div>
                      <div v-if="item.price" class="item__price content__price">
                        <span>{{ item.price }}</span>
                      </div>
                      <div class="ml-2 ml-lg-5 mt-2 mt-lg-16" v-if="item.garanty">
                        <div
                          class="d-flex align-senter mb-0 mb-lg-1 garanty-item"
                          v-for="garanty in item.garanty"
                          style="opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.5s ease"
                        >
                          <div class="d-flex align-center">
                            <v-icon class="mr-2 text-h6 text-lg-h5">
                              <v-img :src="garanty.icon"></v-img>
                            </v-icon>
                          </div>
                          <div class="text-caption text-lg-subtitle-1">{{ garanty.text }}</div>
                        </div>
                      </div>
                    </div>

                    <v-expand-transition>
                      <div v-if="item.description && reveal[`${colIndex}-${rowIndex}-${itemIndex}`]" class="description-panel" @click.stop>
                        <v-btn icon small class="close-btn" @click.stop="(e) => toggleReveal(colIndex, rowIndex, itemIndex, e)">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>

                        <div class="description-content">
                          <p class="text-medium-emphasis">{{ item.description }}</p>
                        </div>
                      </div>
                    </v-expand-transition>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-expand-transition>

      <div v-if="dopServices" class="d-flex justify-center my-6">
        <v-btn @click="(isRotated = !isRotated), (show = !show)" class="font-weight-bold" elevation="0">
          {{ show ? "Скрыть" : "Показать еще услуги" }}
          <v-icon :class="{ 'rotate-180': isRotated }" class="ml-2 transition-transform"> mdi-chevron-down </v-icon>
        </v-btn>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");

.services {
  margin-bottom: 15px;
  font-family: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  @media (max-width: $md4) {
    margin: 0px 0px 7px 0px;
  }

  .section-header {
    margin-bottom: 60px;
    line-height: 1.2;
    text-align: center;
    @media (max-width: $md4) {
      margin-bottom: 20px;
    }
  }

  .section-title {
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

    @media (max-width: $md3) {
      font-size: 2rem;
    }

    @media (max-width: $md4) {
      font-size: 2rem;
      margin-bottom: 10px;

      .title-decoration {
        width: 60px;
        height: 3px;
        bottom: -8px;
      }

      &:hover .title-decoration {
        width: 80px;
      }
    }
  }

  &__items {
    display: flex;
    gap: 15px;
    @media (max-width: $md3) {
      flex-wrap: wrap;
    }
    @media (max-width: $md4) {
      gap: 7px;
    }
  }

  &__column {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 50%;
    gap: 15px;
    @media (max-width: $md3) {
      flex: 1 1 100%;
      &:last-child {
        flex-direction: column-reverse;
      }
    }
    @media (max-width: $md4) {
      gap: 7px;
    }
  }

  &__row {
    display: flex;
    width: 100%;
    gap: 15px;
    @media (max-width: $md4) {
      gap: 7px;
    }

    &-item-big {
      width: 100%;
      height: 315px;
      @media (max-width: $md1) {
        height: 320px;
      }
      @media (max-width: $md2) {
        height: 270px;
      }
      @media (max-width: $md3) {
        height: 180px;
      }
      @media (max-width: $md4) {
        height: 170px;
      }

      .title {
        font-weight: 700;
        line-height: 120%;
        color: #102939;
        padding: 25px 0px 0px 25px;
        font-size: 1.4rem;
        @media (max-width: $md4) {
          font-size: 20px;
          padding: 15px 10px 0px 10px;
        }
      }

      .item__price {
        letter-spacing: 0.3px;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.9) !important;
        @media (max-width: $md4) {
          font-size: 12px;
          margin-top: 7px;
          padding: 5px 7px;
          border-radius: 6px;
          letter-spacing: normal;
        }
      }
    }

    &-item-sm {
      width: 50%;
      height: 210px;
      @media (max-width: $md1) {
        height: 200px;
      }
      @media (max-width: $md2) {
        height: 150px;
      }
      @media (max-width: $md3) {
        height: 145px;
      }
      @media (max-width: $md4) {
        height: 135px;
      }

      .title {
        font-weight: 700;
        line-height: 120%;
        font-size: 1.4rem;
        padding: 25px 25px 0px 25px;
        color: #102939;
        @media (max-width: $md4) {
          font-size: 16px;
          padding: 15px 10px 0px 10px;
        }
      }

      .item__price {
        letter-spacing: 0.3px;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.9) !important;
        @media (max-width: $md4) {
          letter-spacing: normal;
          font-size: 12px;
          margin-top: 7px;
          padding: 5px 7px;
          border-radius: 6px;
        }
      }
    }
  }
}

.services__item {
  box-shadow: 1px 1px 3px 0px rgba(34, 60, 80, 0.18);
  display: flex;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: $color-background;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;

  &.description-open {
    z-index: 10;
  }

  &-link {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    background-size: contain !important;
    background-position: 95% 100% !important;
    background-repeat: no-repeat !important;
    background-size: 100% auto !important;
    cursor: pointer;
    position: relative;
    @media (max-width: $md4) {
      background-size: 90% auto !important;
    }
    @media (max-width: $md3) {
      background-size: 65% auto !important;
    }
    @media (max-width: $md4) {
      background-size: 100% auto !important;
    }
  }
}

.item {
  &__description {
    position: relative;
    z-index: 2;
  }

  &__price {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 6px 10px;
    margin: 10px 0px 0px 18px;
    color: #102938;
    text-align: center;
    border-radius: 4px;
    z-index: 2;
    position: relative;
    @media (max-width: $md4) {
      font-size: 14px;
      margin: 8px 0px 0px 8px;
    }
  }
}

.show-more-btn {
  background: linear-gradient(135deg, #6e8efb, #a777e3) !important;
  color: white !important;
  padding: 12px 28px !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;

    &::before {
      left: 100%;
    }
  }

  @media (max-width: $md4) {
    padding: 10px 20px !important;
    font-size: 14px !important;
  }
}

.expanded-content {
  margin-top: 15px;
}

.rotate-180 {
  transform: rotate(180deg);
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.text-lg-subtitle-1 {
  font-size: 0.9rem !important;
  line-height: 1.7;
  color: #102939;
  z-index: 2;
  position: relative;
}
.text-lg-subtitle-1 {
  transition: color 0.2s ease;
}
.services__item:hover .garanty-item {
  transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.garanty-item {
  will-change: opacity, transform;
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.v-expand-transition-leave-active .garanty-item {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in !important;
}

/* Стили для панели описания */
.description-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(5px);
  padding: 16px;
  z-index: 3;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .description-content {
    padding: 8px;
    margin-top: 24px;
    flex-grow: 1;

    .text-medium-emphasis {
      color: #102939;
      font-size: 0.875rem;
      line-height: 1.6;
    }
  }
}

/* Стили для кнопки "Подробнее" */
.more-info-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.8) !important;
  color: #102939 !important;
  width: 24px !important;
  height: 24px !important;
  min-width: unset !important;

  .v-icon {
    font-size: 18px !important;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.9) !important;
  }
}

/* Стили для кнопки закрытия */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.1) !important;
  color: #102939 !important;
  width: 24px !important;
  height: 24px !important;
  min-width: unset !important;

  .v-icon {
    font-size: 18px !important;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2) !important;
  }
}

/* Адаптивные стили */
@media (max-width: $md3) {
  .description-panel {
    padding: 12px;

    .description-content {
      .text-medium-emphasis {
        font-size: 0.8125rem;
      }
    }
  }

  .more-info-btn,
  .close-btn {
    top: 8px;
    right: 8px;
    width: 20px !important;
    height: 20px !important;

    .v-icon {
      font-size: 16px !important;
    }
  }
}

@media (max-width: $md4) {
  .description-panel {
    padding: 8px;

    .description-content {
      .text-medium-emphasis {
        font-size: 0.75rem;
      }
    }
  }
}
</style>
