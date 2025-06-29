<template>
  <div>
    <DialogFeedBack @isVisible="visibleForm()" v-if="feedbackForm.active" :services="feedBackData" />
    <section class="septic-services">
      <div class="_container">
        <div class="service-card main-service" @mouseover="hoverEffect" @mouseleave="leaveHover">
          <div class="service-content">
            <h1 class="service-title">Профессиональный монтаж септика (ЛОС) под ключ</h1>

            <div class="price-container">
              <p class="service-price">Стоимость проекта</p>
              <p class="price-value">от 180 000 ₽</p>
              <p class="price-note">*окончательная цена после осмотра объекта</p>
            </div>
            <button class="btn primary-btn" @click="visibleForm()">
              Обсудить задачу
              <svg class="icon-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div class="service-image-wrapper">
            <img
              src="/media/images/content/septik/septik-baner-01.jpg"
              alt="Профессиональный монтаж септика"
              class="service-image"
              loading="lazy"
            />
          </div>
        </div>
        <section class="description-section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="title-text">Локальные очистные станции</span>
              <span class="title-decoration"></span>
            </h2>
          </div>

          <div class="tabs">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              :class="['tab-button', { active: activeTab === index }]"
            >
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 0" class="tab-pane">
              <p class="description-text">
                Мы специализируемся на монтаже локальных очистных станций (ЛОС) ведущих брендов <strong>ЮНИЛОС АСТРА</strong> и
                <strong>ЕВРОБИОН</strong>. Эти системы - золотой стандарт в области автономной канализации.
              </p>
              <div v-if="!mobile" class="specs-grid">
                <div class="spec-item">
                  <svg class="spec-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3>Сертификация</h3>
                    <p>Все станции имеют необходимые сертификаты и соответствуют нормам очистки СанПиН</p>
                  </div>
                </div>
                <div class="spec-item">
                  <svg class="spec-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3>Автономность</h3>
                    <p>Полностью автоматизированные системы с интеллектуальным управлением</p>
                  </div>
                </div>

                <div class="spec-item">
                  <svg class="spec-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3>Производительность</h3>
                    <p>Модельный ряд от 1 до 15 человек (200 л/чел в сутки)</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 1" class="tab-pane">
              <h3 class="comparison-title">Сравнение моделей</h3>
              <div class="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Модификация</th>
                      <th>Производительность</th>
                      <th>Параметры</th>
                      <th>Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(model, index) in models" :key="index">
                      <td>{{ model.name }}</td>
                      <td>{{ model.capacity }}</td>
                      <td>{{ model.dimensions }}</td>
                      <td>{{ model.price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="gallery">
            <div class="gallery-item" v-for="(image, index) in galleryImages" :key="index">
              <img :src="image.src" :alt="image.alt" loading="lazy" />
              <div class="gallery-caption">{{ image.caption }}</div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <WorkOrder :data="dataOrder" title="Как мы работаем" />
    <FeedBackForm title="Оставьте заявку" id="GlobalForm" />
  </div>
</template>
<script setup>
import { useHead } from "#app";
useHead({
  title: "Установка септиков под ключ | Монтаж и обслуживание",
  titleTemplate: "%s %separator %siteName",
  meta: [
    {
      name: "description",
      content:
        "Профессиональный монтаж септиков под ключ от компании «БИС». Автономные канализации для частных домов с гарантией 5 лет. Подбор, установка и обслуживание современных очистных систем по доступным ценам.",
    },
    {
      name: "keywords",
      content:
        "септик под ключ, автономная канализация, установка септика, монтаж септика, очистные сооружения, септик цена, септик для дачи, септик для частного дома, Топас, Юнилос, Евробион",
    },
    {
      property: "og:title",
      content: "Установка септиков под ключ | Современные решения для канализации",
    },
    {
      property: "og:description",
      content: "Комплексные решения по организации автономной канализации. От проекта до ввода в эксплуатацию за 1 день!",
    },
  ],
});

import { useDisplay } from "vuetify";
const { mobile } = useDisplay();

const feedbackForm = reactive({
  active: false, // Открыта ли форма обратной связи
});
function visibleForm() {
  if (!feedbackForm.active) {
    feedbackForm.active = true;
    // toggleBodyScroll(true);
  } else {
    feedbackForm.active = false;
    // toggleBodyScroll(false);
  }
}

const feedBackData = ["Монтаж септика", "Аварийный выезд", "Сервис", "Нет в списке"];
const activeTab = ref(0);
const tabs = [{ title: "Описание" }, { title: "Характеристики" }];
const dataOrder = [
  {
    urlImg: "mdi-truck-delivery-outline",
    title: "Выезд",
    text: "Наш специалист приедет на ваш участок, чтобы оценить условия монтажа, тип грунта, уровень грунтовых вод и другие важные параметры.",
  },
  {
    urlImg: "mdi-filter-cog-outline",
    title: "Подбор оборудования",
    text: "Рекомендуем станцию с учетом количества пользователей, особенностей участка и бюджета. Подберем модель с оптимальной производительностью и энергоэффективностью.",
  },
  {
    urlImg: "mdi:certificate-outline",
    title: "Выбор производителя",
    text: "Работаем с проверенными брендами — ЮНИЛОС АСТРА и ЕВРОБИОН. Их станции сертифицированы, надежны и соответствуют нормам очистки стоков.",
  },
  {
    urlImg: "mdi-check-decagram-outline",
    title: "Проектирование и согласование",
    text: "Разрабатываем проект с учетом СНиП и СанПиН, помогаем согласовать документацию. Это исключает проблемы с контролирующими органами.",
  },
];
const models = [
  { name: "ЮНИЛОС АСТРА 3", capacity: "600 л/сут", dimensions: "1120х940х2030", price: "180 000 - 210 000 ₽" },
  { name: "ЮНИЛОС АСТРА 5", capacity: "1000 л/сут", dimensions: "1030х1120х2360", price: "210 000 - 250 000 ₽" },
  { name: "ЕВРОБИОН 5", capacity: "1000 л/сут", dimensions: "1000x1000x2380", price: "230 000 - 270 000 ₽" },
  { name: "ЕВРОБИОН 8", capacity: "1600 л/сут", dimensions: "1330x1330x2510", price: "290 000 - 330 000 ₽" },
];

const galleryImages = [
  {
    src: "/media/images/content/septik/septik-installation-01.jpg",
    alt: "Монтаж септика",
    caption: "Профессиональный монтаж",
  },
  { src: "/media/images/content/septik/septik-install-01.jpg", alt: "Готовая станция", caption: "Готовая станция" },
  { src: "/media/images/content/septik/septik-service-01.jpg", alt: "Сервисное обслуживание", caption: "Техническое обслуживание" },
];

function goToDiscussion() {
  console.log("Переход к обсуждению");
}
function submitApplication() {
  console.log("Оставить заявку");
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");

.septic-services {
  padding-top: 80px;
  font-family: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  color: #2d3748;

  @media (max-width: $md4) {
    padding-top: 20px;
  }
}

.service-card {
  display: flex;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin-bottom: 80px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
  @media (max-width: $md4) {
    margin: 0px 0px 40px 0px;
  }

  .service-content {
    flex: 1;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      padding: 20px 20px;
      text-align: center;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 240, 0.9) 100%);
      z-index: -1;
    }

    .service-title {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 24px;
      color: #1a202c;
      line-height: 1.2;
      // background: linear-gradient(90deg, #ff7b00, #b35e00);
      background: linear-gradient(90deg, #2c3e50, #1a1a1a);

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      display: inline-block;

      @media (max-width: 768px) {
        font-size: 1.9rem;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 4px;
        // background: linear-gradient(90deg, #ff7b00, #ff9a00);
        background: linear-gradient(90deg, #2c3e50, #1a1a1a);
        border-radius: 2px;

        @media (max-width: 768px) {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }

  .price-container {
    margin-bottom: 40px;

    .service-price {
      font-size: 1.1rem;
      color: #718096;
      margin-bottom: 8px;
    }

    .price-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1a202c;
      margin-bottom: 4px;
      background: linear-gradient(90deg, #ff7b00, #b35e00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .price-note {
      font-size: 0.9rem;
      color: #a0aec0;
      font-style: italic;
    }
  }

  .service-image-wrapper {
    flex: 1;
    min-width: 400px;
    overflow: hidden;
    position: relative;

    @media (max-width: 768px) {
      min-width: 100%;
      height: 300px;
    }

    .service-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }
}

.btn {
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: fit-content;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
}

.primary-btn {
  background: linear-gradient(90deg, #ff7b00, #ff9a00);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4));
    transition: all 0.4s ease;
  }

  &:hover {
    box-shadow: 0 8px 25px rgba(255, 123, 0, 0.4);

    &::before {
      left: 100%;
    }
  }
}

.icon-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.btn:hover .icon-arrow {
  transform: translateX(4px);
}

.section-header {
  margin-bottom: 20px;
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
    font-size: 1.8rem;

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

.description-section {
  background: white;
  padding: 60px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 20px 0px 20px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #ff7b00, #ff9a00);
  }
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 40px;
  gap: 10px;
}

.tab-button {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #718096;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &.active {
    color: #ff7b00;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #ff7b00, #ff9a00);
      border-radius: 3px 3px 0 0;
    }
  }

  &:hover:not(.active) {
    color: #4a5568;
  }
}

.tab-content {
  margin-bottom: 50px;
}

.tab-pane {
  animation: fadeIn 0.5s ease;

  .description-text {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #4a5568;
    margin-bottom: 30px;

    strong {
      color: #ff7b00;
      font-weight: 700;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.spec-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  transition: all 0.3s ease;
  border: 1px solid #edf2f7;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-color: #e2e8f0;
  }

  .spec-icon {
    width: 28px;
    height: 28px;
    color: #ff7b00;
    flex-shrink: 0;
    margin-top: 4px;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    color: #718096;
    line-height: 1.6;
  }
}

.comparison-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 30px;
  text-align: center;
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 40px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 16px 20px;
      text-align: left;
      border-bottom: 1px solid #edf2f7;
    }

    th {
      background: #f8fafc;
      font-weight: 700;
      color: #4a5568;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.5px;
    }

    td {
      color: #4a5568;
    }

    tr:hover {
      background: #f8fafc;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 50px 0;

  .gallery-item {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }

    .gallery-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 12px;
      font-size: 0.95rem;
      text-align: center;
    }
  }
}
</style>
