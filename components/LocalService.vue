<script setup>
import { onMounted, onUnmounted, reactive } from "vue";

const props = defineProps({
  serviceTitle: {
    typeof: String,
  },
  servicePrice: {
    typeof: Array,
  },
});

onMounted(() => {});
onUnmounted(() => {});
</script>

<template>
  <section class="services">
    <div class="services__container _container">
      <div class="section-header" v-if="serviceTitle">
        <h2 class="section-title">
          <span class="title-text">{{ serviceTitle }}</span>
          <span class="title-decoration"></span>
        </h2>
      </div>
      <ul class="services__items">
        <li v-for="item in servicePrice" class="services__item item">
          <a :style="{ 'background-image': 'url(' + item.urlImg + ')' }" class="services__link">
            <div class="item__title">{{ item.name }}</div>
            <div v-if="item.price" class="item__foot">
              <span>{{ item.price }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";
.services {
  margin: 0px 0px 25px 0px;
  .section-header {
    margin-bottom: 60px;
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
  &__title {
    margin-bottom: 10px;
    font-size: 26px;
    font-weight: 600;
    background: #fff;
    display: inline-block;
    border-radius: 32px;
    padding: 3px 10px;
    color: #102938;
  }
  &__items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    // grid-template-rows: 1fr 1fr;
    gap: 15px;
    @media (max-width: $md2) {
      grid-template-columns: 1fr 1fr;
      // grid-template-rows: 1fr 1fr 1fr;
    }
    @media (max-width: $md3) {
      gap: 15px;
    }
    @media (max-width: $md4) {
      grid-template-columns: 1fr 1fr;
      // grid-template-rows: 1fr 1fr 1fr;
      gap: 7px;
    }
  }
  &__item {
    width: 100%;
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: $color-background;
    @media (min-width: $md1) {
      &:hover {
        // background-color: v-bind(hoverColor);
        background-color: rgb(255, 229, 204);
      }
    }
  }
  &__link {
    padding: 20px 20px;
    display: block;
    // Изменения
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    height: 100%;
    //background
    background-position: 95% 100%;
    background-repeat: no-repeat;
    background-size: 100% auto;
    @media (max-width: $md4) {
      padding: 15px 10px 10px 10px;
      background-size: 120% auto;
    }
  }
}
.item {
  position: relative;
  height: 190px;
  box-shadow: 1px 1px 3px 0px rgba(34, 60, 80, 0.18);
  @media (max-width: $md3) {
    height: 170px;
  }
  @media (max-width: $md4) {
    height: 120px;
  }
  &__wrapper {
    // background: #405460;
    top: 0;
    height: 100%;
    position: absolute;
    width: 100%;
    left: 0;
    img {
      object-fit: cover;
      // object-fit: contain;
      top: 0;
      height: 100%;
      position: absolute;
      width: 100%;
      left: 0;
      @media (max-width: $md4) {
      }
    }
  }
  // background: ;
  &__title {
    font-weight: 500;
    line-height: 120%;
    font-size: 1.4rem;
    color: #102938;
    margin: 0px 0px 10px 0px;
    @media (max-width: $md3) {
      font-size: 15px;
      margin: 0px 0px 7px 0px;
    }
  }
  &__foot {
    // background: #fff;
    // display: inline-flex;
    // justify-content: center;
    // align-items: center;
    // padding: 10px 10px;
    // color: #102938;
    // text-align: center;
    // border-radius: 4px;
    // font-size: 15px;
    // width: 33%;
    // font-weight: 500;
    // border-radius: 8px;

    background: #fff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    color: #102938;
    text-align: center;
    border-radius: 4px;
    font-weight: 500;
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
      margin: 0px 0px 0px -3px;
      // padding: 7px 10px;
      padding: 5px 5px;
      // width: 60%;
    }
  }
}
</style>
