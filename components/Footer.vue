<script setup>
import { ROUTES_PATHS } from "../assets/constants";

const isMobile = ref(false);
const menuStates = ref({});
const isLoaded = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth < 992;
}

function toggleMenu(menuId) {
  if (!isMobile.value) return;
  menuStates.value[menuId] = !menuStates.value[menuId];
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  // Инициализируем состояния меню
  menuStates.value = {
    services: false,
    service: false,
    contacts: false,
  };
  setTimeout(() => {
    isLoaded.value = true;
  }, 3000);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<template>
  <footer v-if="isLoaded" class="footer">
    <div class="footer__container _container">
      <!-- Контактная информация -->
      <div class="footer__contacts">
        <div class="footer__logo-container">
          <nuxt-link to="/" class="footer__logo">
            <img src="../assets/icons/footer-logo.svg" alt="BIS: Благоустройство и инженерные сети" class="logo__img" />
          </nuxt-link>
        </div>

        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon-wrapper">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#FFF"
                  d="M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5M19,12H22A10,10 0 0,0 12,2V5A7,7 0 0,1 19,12M17,12H20A5,5 0 0,0 15,7V10A2,2 0 0,1 17,12Z"
                />
              </svg>
            </div>
            <div class="contact-text">
              <a href="tel:+79112775607" class="contact-link">+7 911 277-56-07</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon-wrapper">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#FFF"
                  d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
                />
              </svg>
            </div>
            <div class="contact-text">г. Санкт-Петербург</div>
          </div>

          <div class="contact-item">
            <div class="contact-icon-wrapper">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#FFF"
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                />
              </svg>
            </div>
            <div class="contact-text">9:00 - 19:00 (ежедневно)</div>
          </div>
        </div>
      </div>

      <!-- Основное содержимое -->
      <div class="footer__main">
        <!-- О компании -->
        <div class="footer__column">
          <h3 class="footer__title">БИС: Благоустройство и инженерные сети</h3>
          <p class="footer__description">Профессиональные решения для загородных домов и участков в Санкт-Петербурге и ЛО</p>
          <!-- <div class="menu__items">
            <h3 class="menu__header">Медиа</h3>
            <a href="https://vkvideo.ru/@bislandscaping" class="menu__item contact-link">
              <icon name="mdi-vk" size="36" class="contact-icon" />
              <span>VK видео</span>
            </a>
            <a href="https://t.me/BISlandscaping" class="menu__item contact-link">
              <icon name="mdi-telegram" size="36" class="contact-icon" />
              <span>Телеграм-канал</span>
            </a>
          </div> -->
          <div class="media-block">
            <h3 class="media-header">Медиа</h3>
            <div class="media-items">
              <a href="https://vkvideo.ru/@bislandscaping" class="media-item contact-link">
                <icon name="mdi-vk" size="36" class="contact-icon" />
                <span>VK Видео</span>
              </a>
              <a href="https://t.me/BISlandscaping" class="media-item contact-link">
                <icon name="mdi-telegram" size="36" class="contact-icon" />
                <span>Телеграм-канал</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Услуги -->
        <div class="footer__column">
          <div class="footer__menu menu">
            <h3 class="menu__header" @click="toggleMenu('services')" :class="{ active: menuStates.services }">
              Услуги
              <svg class="menu__icon" width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </h3>
            <div class="menu__items" :class="{ visible: !isMobile || menuStates.services }">
              <nuxt-link :to="{ name: ROUTES_PATHS.TOPOGRAPHY }" class="menu__item">Проект и топографическая съемка</nuxt-link>
              <nuxt-link :to="{ name: ROUTES_PATHS.FAUNDATION }" class="menu__item">Свайный фундамент</nuxt-link>
              <nuxt-link :to="{ name: ROUTES_PATHS.SEPTIC }" class="menu__item">Септик под ключ</nuxt-link>
              <nuxt-link :to="{ name: ROUTES_PATHS.WATER }" class="menu__item">Водоподготовка и система очистки воды</nuxt-link>
              <nuxt-link :to="{ name: ROUTES_PATHS.DRAINAGE }" class="menu__item">Дренаж и ливневая канализация</nuxt-link>
              <nuxt-link :to="{ name: ROUTES_PATHS.ELECTRICITY }" class="menu__item">Электромонтажные работы</nuxt-link>
              <nuxt-link :to="{ name: ROUTES_PATHS.IMPROVEMENT }" class="menu__item">Благоустройство</nuxt-link>
              <nuxt-link :to="{ name: ROUTES_PATHS.FENCE }" class="menu__item">Установка заборов</nuxt-link>
            </div>
          </div>
        </div>

        <!-- Сервис -->
        <div class="footer__column">
          <div class="footer__menu menu">
            <h3 class="menu__header" @click="toggleMenu('service')" :class="{ active: menuStates.service }">
              Сервис
              <svg class="menu__icon" width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </h3>
            <div class="menu__items" :class="{ visible: !isMobile || menuStates.service }">
              <a href="#" class="menu__item">Обслуживание ЛОС</a>
              <a href="#" class="menu__item">Обсуживание бойлеров</a>
              <a href="#" class="menu__item">Система водоочистки</a>
              <a href="#" class="menu__item">Система водоподготовки</a>
              <a href="#" class="menu__item">Система водоснабжения</a>
              <a href="#" class="menu__item">Уборка участка</a>
            </div>
          </div>
        </div>

        <!-- Контакты -->
        <div class="footer__column">
          <div class="footer__menu menu">
            <h3 class="menu__header" @click="toggleMenu('contacts')" :class="{ active: menuStates.contacts }">
              Контакты
              <svg class="menu__icon" width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </h3>
            <div class="menu__items" :class="{ visible: !isMobile || menuStates.contacts }">
              <a href="https://t.me/@lllaleksll" class="menu__item contact-link">
                <!-- <img src="../assets/media/icons/common/social/telegram.svg" alt="Telegram" class="contact-icon" /> -->
                <icon name="mdi-telegram" size="36" alt="Telegram" class="contact-icon" />
                <span>Telegram</span>
              </a>
              <a href="https://wa.me/79112775607" class="menu__item contact-link">
                <!-- <img src="../assets/icons/footer-whatsapp.svg" alt="WhatsApp" class="contact-icon" /> -->
                <icon name="mdi-whatsapp" size="36" alt="WhatsApp" class="contact-icon" />
                <span>WhatsApp</span>
              </a>
              <a href="mailto:info@bis-spb.ru" class="menu__item contact-link">
                <!-- <img src="../assets/icons/footer-email.svg" alt="Email" class="contact-icon" /> -->
                <icon name="mdi-at" size="36" alt="Email" class="contact-icon" />
                <span>info@bis-spb.ru</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Нижняя часть -->
      <div class="footer__bottom">
        <div class="footer__copyright">© {{ new Date().getFullYear() }} БИС: Благоустройство и инженерные сети. Все права защищены.</div>

        <div class="footer__links">
          <nuxt-link :to="{ name: ROUTES_PATHS.POLICY }" class="footer__link">Политика конфиденциальности</nuxt-link>
          <nuxt-link :to="{ name: ROUTES_PATHS.USERAGREEMENT }" class="footer__link">Пользовательское соглашение</nuxt-link>
          <a href="/sitemap.xml" class="footer__link">Карта сайта</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(to bottom, #ff6600 0%, #e65c00 100%);
  color: #ffffff;
  padding-top: 40px;
  margin-top: 50px;
  font-family: "Roboto", sans-serif;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding-bottom: 40px;

    @media (min-width: 992px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__logo-container {
    display: flex;
    align-items: center;
  }

  &__logo {
    width: 250px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    .logo__img {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    @media (min-width: 576px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (min-width: 768px) {
      // justify-content: space-between;
      // max-width: 800px;
    }
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    padding: 15px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 250px;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }
  }

  .contact-icon-wrapper {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .contact-icon {
    width: 20px;
    height: 20px;
  }

  .contact-text {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .contact-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #f0f0f0;
    }
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #ffffff;
    position: relative;
    padding-bottom: 10px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background: #fff;
      border-radius: 3px;
    }
  }

  &__description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    line-height: 1.6;
  }

  .menu {
    display: flex;
    flex-direction: column;
    // gap: 15px;

    &__header {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      padding: 10px 0;
      position: relative;
      cursor: pointer;

      @media (min-width: 992px) {
        cursor: default;
      }
    }

    &__icon {
      transition: transform 0.3s ease;
      flex-shrink: 0;
      margin-left: 10px;

      @media (min-width: 992px) {
        display: none;
      }
    }

    &__header.active &__icon {
      transform: rotate(180deg);
    }

    &__items {
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      @media (max-width: 991px) {
        max-height: 0;
        opacity: 0;
        &.visible {
          max-height: 1000px;
          opacity: 1;
          padding-top: 10px;
        }
      }
    }

    &__item {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-size: 14px;
      transition: all 0.3s ease;
      line-height: 1.5;
      padding: 5px 0;
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: #fff;
        transition: width 0.3s ease;
      }

      &:hover {
        color: #fff;
        transform: translateX(5px);

        &::before {
          width: 30px;
        }
      }
    }

    @media (max-width: 767px) {
      &__header {
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        padding: 10px 15px;
      }

      &__items {
        margin: 0 10px;
      }

      &__item {
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        &::before {
          display: none;
        }
      }
    }
  }

  &__bottom {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    text-align: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__copyright {
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  &__link {
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
}

.media-block {
  margin-top: 20px;

  .media-header {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 15px;
    position: relative;
  }

  .media-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .media-item {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    line-height: 1.5;
    padding: 5px 0;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      color: #fff;
      transform: translateX(5px);
    }

    .contact-icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
