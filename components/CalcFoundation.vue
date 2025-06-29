<template>
  <v-container class="yp-4 py-md-8">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-text">Калькулятор</span>
        <span class="title-decoration"></span>
      </h2>
    </div>
    <v-card class="mt-8 mx-auto" max-width="1000" elevation="1">
      <v-stepper editable v-model="currentStep">
        <v-stepper-header>
          <v-stepper-item complete color="orange-darken-2" value="0">1. Строение</v-stepper-item>
          <v-stepper-item complete color="orange-darken-2" value="1">2. Характеристики</v-stepper-item>
          <v-stepper-item complete color="orange-darken-2" @click="calculate()" value="2">3. Стоимость</v-stepper-item>
        </v-stepper-header>
        <v-stepper-window>
          <v-stepper-window-item value="0">
            <v-card variant="text" class="pa-4 pa-md-6">
              <v-form class="pt-4" v-model="isStep1Valid" @submit.prevent="nextStep">
                <!-- <h3 class="text-h6 mb-4">Параметры строения</h3> -->
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="buildingType"
                      :items="buildingTypes"
                      label="Тип строения"
                      item-title="name"
                      item-value="value"
                      variant="outlined"
                      density="comfortable"
                      hide-details
                      @update:modelValue="updateRecommendedParams"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="material"
                      :items="materials"
                      label="Материал"
                      item-title="name"
                      item-value="value"
                      variant="outlined"
                      density="comfortable"
                      hide-details
                      @update:modelValue="updateRecommendedParams"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" class="py-0">
                    <v-radio-group color="orange-darken-2" v-model="inputMode" inline>
                      <v-radio label="Указать размеры строения" value="dimensions"></v-radio>
                      <v-radio label="Указать количество свай" value="piles"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <template v-if="inputMode === 'dimensions'">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model.number="width"
                        label="Ширина строения (м)"
                        hide-details
                        type="number"
                        min="1"
                        step="0.1"
                        variant="outlined"
                        density="comfortable"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model.number="length"
                        label="Длина строения (м)"
                        hide-details
                        type="number"
                        min="1"
                        step="0.1"
                        variant="outlined"
                        density="comfortable"
                      ></v-text-field>
                    </v-col>
                  </template>

                  <template v-else>
                    <v-col cols="12">
                      <v-text-field
                        v-model.number="pileCount"
                        label="Количество свай"
                        type="number"
                        min="4"
                        step="1"
                        variant="outlined"
                        density="comfortable"
                      ></v-text-field>
                    </v-col>
                  </template>
                </v-row>
              </v-form>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="1">
            <v-card variant="text" class="pa-4 pa-md-6">
              <v-form class="pt-4" v-model="isStep1Valid" @submit.prevent="nextStep">
                <h3 class="text-h6 pl-4 pb-8">Рекомендуемые параметры</h3>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="pileDiameter"
                      :items="availableDiameters"
                      label="Диаметр сваи (мм)"
                      item-title="text"
                      item-value="value"
                      variant="outlined"
                      hide-details
                      density="comfortable"
                      @update:modelValue="updateAvailableOptions"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="wallThickness"
                      :items="availableWallThicknesses"
                      hide-details
                      label="Толщина стенки (мм)"
                      item-title="text"
                      item-value="value"
                      variant="outlined"
                      density="comfortable"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="pileLength"
                      :items="availableLengths"
                      hide-details
                      label="Длина сваи (м)"
                      item-title="text"
                      item-value="value"
                      variant="outlined"
                      density="comfortable"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6" v-if="inputMode === 'dimensions'">
                    <v-text-field
                      v-model.number="customStep"
                      label="Шаг между сваями (м)"
                      type="number"
                      min="0.5"
                      max="5"
                      step="0.1"
                      variant="outlined"
                      density="comfortable"
                      :hint="`Рекомендуемый шаг: ${recommendedStep} м`"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- <h3 class="text-h6 mb-4 mt-6">Дополнительные услуги</h3> -->
                <v-row class="mb-4">
                  <v-col cols="12" class="py-0">
                    <v-checkbox
                      color="orange-darken-2"
                      v-model="includeHeads"
                      label="Требуются оголовки для свай"
                      density="comfortable"
                      hide-details
                    ></v-checkbox>
                  </v-col>

                  <v-col cols="12" class="py-0">
                    <v-checkbox
                      color="orange-darken-2"
                      v-model="includeInstallation"
                      label="Требуются монтажные работы"
                      density="comfortable"
                      hide-details
                    ></v-checkbox
                  ></v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-stepper-window-item>
          <v-stepper-window-item value="2">
            <v-card variant="text" class="pa-4 mb-4">
              <!-- <h3 class="text-h6 mb-4">Результат расчета:</h3> -->

              <v-table density="compact" class="mb-4">
                <tbody>
                  <tr>
                    <td>Постройка:</td>
                    <td class="text-right pr-1">{{ buildingTypeLabel }}</td>
                  </tr>
                  <tr>
                    <td>Материал:</td>
                    <td class="text-right pr-1">{{ materialLabel }}</td>
                  </tr>
                  <tr v-if="inputMode === 'dimensions'">
                    <td>Размеры:</td>
                    <td class="text-right pr-1">{{ width }}м × {{ length }}м</td>
                  </tr>
                  <tr>
                    <td>Сваи:</td>
                    <!-- <td class="text-right">{{ pileCount }} шт. ({{ pileDiameter }}мм × {{ pileLength }}м, стенка {{ wallThickness }}мм)</td> -->
                    <td class="text-right px-1">{{ pileCount }} шт. ({{ pileDiameter }}мм × {{ pileLength }}м x {{ wallThickness }}мм)</td>
                  </tr>
                  <tr v-if="inputMode === 'dimensions'">
                    <td>Шаг:</td>
                    <td class="text-right pr-1">{{ usedStep }} м {{ isCustomStep ? "(ручной ввод)" : "(рекомендуемый)" }}</td>
                  </tr>
                  <tr>
                    <td>Оголовки:</td>
                    <td class="text-right pr-1">{{ includeHeads ? "Да" : "Нет" }}</td>
                  </tr>
                  <tr>
                    <td>Монтаж:</td>
                    <td class="text-right pr-1">{{ includeInstallation ? "Да" : "Нет" }}</td>
                  </tr>
                  <tr class="font-weight-bold">
                    <td>Итого:</td>
                    <td class="text-right pr-1">{{ formatCurrency(totalCost) }}</td>
                  </tr>
                </tbody>
              </v-table>

              <v-alert type="info" variant="tonal" class="mb-4">
                Расчет носит ознакомительный характер, стоимость без учета аренды спецтехники и доставки. Для точного расчета оставьте
                заявку.
              </v-alert>
              <v-row>
                <v-col cols="12" md="6"
                  ><v-text-field
                    v-model="customer.name"
                    prepend-inner-icon="mdi-account-outline"
                    label="Ваше имя"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-2"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="6"
                  ><v-text-field
                    v-model="customer.phone"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone-outline"
                    :rules="[rules.required, rules.phone]"
                    v-maska="'+7 (###) ###-##-##'"
                    placeholder="+7 (___) ___-__-__"
                    label="Телефон"
                    density="comfortable"
                    hide-details
                    color="text"
                    @focus="moveCursorToFirstHash"
                    @blur="onBlur"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="6"
                  ><v-text-field
                    v-model="customer.address"
                    label="Адрес объекта"
                    prepend-inner-icon="mdi-map-marker-outline"
                    variant="outlined"
                    hide-details
                    density="comfortable"
                    class="mb-2"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="6"
                  ><v-btn
                    @click="sendOrder"
                    block
                    type="submit"
                    :size="mobile ? 'large' : 'x-large'"
                    class="submit-btn"
                    :disabled="sendingStatus.isSending || customer.phone.length != 18"
                    :loading="sendingStatus.isSending"
                  >
                    <template v-slot:loader>
                      <v-progress-circular indeterminate color="white" size="24" width="3"></v-progress-circular>
                      <span class="ml-2">Отправка...</span>
                    </template>
                    Отправить заявку
                  </v-btn></v-col
                >
              </v-row>

              <v-col cols="12" class="text-center mt-2">
                <p class="text-caption text-medium-emphasis">
                  Нажимая кнопку, вы соглашаетесь с
                  <nuxt-link :to="{ name: ROUTES_PATHS.POLICY }" class="text-primary text-decoration-none"
                    >политикой конфиденциальности</nuxt-link
                  >
                </p>
              </v-col>
            </v-card>
          </v-stepper-window-item>
        </v-stepper-window>
        <v-stepper-actions v-if="currentStep != 2" class="pb-8">
          <template #prev>
            <v-btn
              @click="prevStep"
              :size="mobile ? 'large' : 'x-large'"
              type="submit"
              class="submit-btn"
              :prepend-icon="mobile ? '' : 'mdi-arrow-left'"
            >
              Назад
            </v-btn>
          </template>
          <template #next>
            <v-btn
              @click="nextStep"
              :size="mobile ? 'large' : 'x-large'"
              type="submit"
              class="submit-btn"
              :append-icon="mobile ? '' : 'mdi-arrow-right'"
            >
              Далее
            </v-btn>
          </template>
        </v-stepper-actions>
      </v-stepper>
    </v-card>

    <v-dialog v-model="successDialog.value" max-width="400">
      <v-card>
        <v-card-title class="text-h5 bg-success text-white">Заявка отправлена</v-card-title>
        <v-card-text class="pa-4"
          >Ваша заявка на расчет свайного фундамента успешно отправлена. Мы свяжемся с вами в ближайшее время.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" variant="text" @click="successDialog.value = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="sendingStatus.error" color="error" timeout="5000" location="bottom right">
      {{ sendingStatus.error }}
      <template v-slot:actions>
        <v-btn variant="text" @click="sendingStatus.error = null"> Закрыть </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { sendMessageTG, CHATS_ID, TOPICS_ID } from "../services/botService";
import { ROUTES_PATHS } from "~/assets/constants";

// useHead({
//   title: "Калькулятор фундамента",
//   titleTemplate: "%s %separator %siteName",
// });

const { mobile } = useDisplay();

// Состояния формы
const currentStep = ref(0);
const isStep1Valid = ref(false);
const successDialog = reactive({
  value: false,
});
const sendingStatus = reactive({
  isSending: false,
  isSuccess: false,
  error: null,
});

const rules = {
  required: (value) => !!value || "Обязательное поле",
  phone: (value) => value.length === 18 || "Введите корректный телефон",
};

// Данные клиента
const customer = reactive({
  name: "",
  phone: "",
  address: "",
});

// Режим ввода
const inputMode = ref("dimensions"); // 'dimensions' или 'piles'

// Типы строений
const buildingTypes = [
  { name: "Дом", value: "house" },
  { name: "Баня", value: "bath" },
  { name: "Гараж", value: "garage" },
  { name: "Беседка", value: "gazebo" },
];

// Материалы
const materials = [
  { name: "Каркас", value: "frame" },
  { name: "Брус", value: "timber" },
  { name: "Газобетон", value: "aerated_concrete" },
  { name: "Кирпич", value: "brick" },
];

// Рекомендуемые шаги между сваями (в метрах)
const recommendedSteps = {
  house: { 57: 1.2, 76: 1.5, 89: 1.8, 108: 2.0, 133: 2.5 },
  bath: { 57: 1.5, 76: 1.8, 89: 2.0, 108: 2.2, 133: 2.5 },
  garage: { 57: 1.8, 76: 2.0, 89: 2.2, 108: 2.5, 133: 3.0 },
  gazebo: { 57: 2.0, 76: 2.2, 89: 2.5, 108: 3.0, 133: 3.5 },
};

// Данные из таблицы
const pileData = [
  { diameter: 57, wallThickness: 3.5, length: 1.5, price: 2600, headPrice: 200 },
  { diameter: 57, wallThickness: 3.5, length: 1.8, price: 2650, headPrice: 200 },
  { diameter: 57, wallThickness: 3.5, length: 2.0, price: 2700, headPrice: 200 },
  { diameter: 57, wallThickness: 3.5, length: 2.5, price: 2800, headPrice: 200 },
  { diameter: 57, wallThickness: 3.5, length: 3.0, price: 3000, headPrice: 200 },
  { diameter: 57, wallThickness: 3.5, length: 3.5, price: 3250, headPrice: 200 },
  { diameter: 57, wallThickness: 3.5, length: 4.0, price: 3400, headPrice: 200 },

  { diameter: 76, wallThickness: 3.5, length: 1.5, price: 2800, headPrice: 200 },
  { diameter: 76, wallThickness: 3.5, length: 1.8, price: 2850, headPrice: 200 },
  { diameter: 76, wallThickness: 3.5, length: 2.0, price: 2950, headPrice: 200 },
  { diameter: 76, wallThickness: 3.5, length: 2.5, price: 3100, headPrice: 200 },
  { diameter: 76, wallThickness: 3.5, length: 3.0, price: 3300, headPrice: 200 },
  { diameter: 76, wallThickness: 3.5, length: 3.5, price: 3600, headPrice: 200 },
  { diameter: 76, wallThickness: 3.5, length: 4.0, price: 3800, headPrice: 200 },

  { diameter: 89, wallThickness: 3.5, length: 1.5, price: 2950, headPrice: 200 },
  { diameter: 89, wallThickness: 3.5, length: 1.8, price: 3000, headPrice: 200 },
  { diameter: 89, wallThickness: 3.5, length: 2.0, price: 3100, headPrice: 200 },
  { diameter: 89, wallThickness: 3.5, length: 2.5, price: 3300, headPrice: 200 },
  { diameter: 89, wallThickness: 3.5, length: 3.0, price: 3550, headPrice: 200 },
  { diameter: 89, wallThickness: 3.5, length: 3.5, price: 4100, headPrice: 200 },
  { diameter: 89, wallThickness: 3.5, length: 4.0, price: 4300, headPrice: 200 },

  { diameter: 108, wallThickness: 3.5, length: 1.5, price: 3150, headPrice: 200 },
  { diameter: 108, wallThickness: 3.5, length: 1.8, price: 3250, headPrice: 200 },
  { diameter: 108, wallThickness: 3.5, length: 2.0, price: 3350, headPrice: 200 },
  { diameter: 108, wallThickness: 3.5, length: 2.5, price: 3500, headPrice: 200 },
  { diameter: 108, wallThickness: 3.5, length: 3.0, price: 3850, headPrice: 200 },
  { diameter: 108, wallThickness: 3.5, length: 3.5, price: 4500, headPrice: 200 },
  { diameter: 108, wallThickness: 3.5, length: 4.0, price: 4700, headPrice: 200 },

  { diameter: 108, wallThickness: 4, length: 1.5, price: 3300, headPrice: 200 },
  { diameter: 108, wallThickness: 4, length: 1.8, price: 3400, headPrice: 200 },
  { diameter: 108, wallThickness: 4, length: 2.0, price: 3600, headPrice: 200 },
  { diameter: 108, wallThickness: 4, length: 2.5, price: 3950, headPrice: 0 },
  { diameter: 108, wallThickness: 4, length: 3.0, price: 4300, headPrice: 0 },
  { diameter: 108, wallThickness: 4, length: 3.5, price: 4950, headPrice: 0 },
  { diameter: 108, wallThickness: 4, length: 4.0, price: 5050, headPrice: 200 },
  { diameter: 108, wallThickness: 4, length: 4.5, price: 5800, headPrice: 200 },
  { diameter: 108, wallThickness: 4, length: 5.0, price: 6200, headPrice: 200 },

  { diameter: 133, wallThickness: 4, length: 2.0, price: 4750, headPrice: 350 },
  { diameter: 133, wallThickness: 4, length: 2.5, price: 5050, headPrice: 350 },
  { diameter: 133, wallThickness: 4, length: 3.0, price: 5850, headPrice: 350 },
  { diameter: 133, wallThickness: 4, length: 3.5, price: 6350, headPrice: 350 },
  { diameter: 133, wallThickness: 4, length: 4.0, price: 6950, headPrice: 350 },
];

// Доступные диаметры свай (мм)
const availableDiameters = [
  { text: "57 мм", value: 57 },
  { text: "76 мм", value: 76 },
  { text: "89 мм", value: 89 },
  { text: "108 мм", value: 108 },
  { text: "133 мм", value: 133 },
];

// Доступные параметры
const availableWallThicknesses = ref([]);
const availableLengths = ref([]);

// Параметры формы
const buildingType = ref("house");
const material = ref("frame");
const width = ref(6);
const length = ref(6);
const pileDiameter = ref(108);
const wallThickness = ref(3.5);
const pileLength = ref(2.5);
const customStep = ref(null);
const includeHeads = ref(true);
const includeInstallation = ref(true);
const pileCount = ref(0);

// Результаты расчета
const totalCost = ref(0);
const recommendedStep = ref(2.0);
const usedStep = computed(() => customStep.value ?? recommendedStep.value);
const isCustomStep = computed(() => customStep.value !== null);

// Метки для отображения
const buildingTypeLabel = computed(() => {
  return buildingTypes.find((item) => item.value === buildingType.value)?.name || "";
});

const materialLabel = computed(() => {
  return materials.find((item) => item.value === material.value)?.name || "";
});

// Навигация по шагам
function prevStep() {
  console.log(currentStep.value);
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function nextStep() {
  if (currentStep.value < 2) {
    currentStep.value++;
    calculate();
  }
}

// Форматирование валюты
const formatCurrency = (value) => {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
};

// Обновление доступных параметров
const updateAvailableOptions = () => {
  const thicknesses = pileData
    .filter((item) => item.diameter === pileDiameter.value)
    .map((item) => item.wallThickness)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  availableWallThicknesses.value = thicknesses.map((thickness) => ({
    text: `${thickness} мм`,
    value: thickness,
  }));

  if (availableWallThicknesses.value.length > 0) {
    wallThickness.value = availableWallThicknesses.value[0].value;
  }

  updateRecommendedStep();
  updateAvailableLengths();
};

const updateRecommendedStep = () => {
  recommendedStep.value = recommendedSteps[buildingType.value][pileDiameter.value];
  if (customStep.value === null) {
    usedStep.value = recommendedStep.value;
  }
};

const updateAvailableLengths = () => {
  const lengths = pileData
    .filter((item) => item.diameter === pileDiameter.value && item.wallThickness === wallThickness.value)
    .map((item) => item.length)
    .sort((a, b) => a - b);

  availableLengths.value = lengths.map((length) => ({
    text: `${length} м`,
    value: length,
  }));

  if (availableLengths.value.length > 0) {
    pileLength.value = availableLengths.value[3]?.value || availableLengths.value[0].value;
  }
};

// Получение цен
const getPilePrice = (diameter, wallThickness, length) => {
  const item = pileData.find((item) => item.diameter === diameter && item.wallThickness === wallThickness && item.length === length);
  return item ? item.price : 0;
};

const getHeadPrice = (diameter, wallThickness, length) => {
  const item = pileData.find((item) => item.diameter === diameter && item.wallThickness === wallThickness && item.length === length);
  return item ? item.headPrice : 0;
};

const getInstallationPrice = (diameter) => {
  if (diameter <= 57) return 800;
  if (diameter <= 76) return 900;
  if (diameter <= 108) return 1200;
  return 1500;
};

// Рекомендуемые параметры
const updateRecommendedParams = () => {
  if (buildingType.value === "house" && ["aerated_concrete", "brick"].includes(material.value)) {
    pileDiameter.value = 133;
  } else if (buildingType.value === "house" || buildingType.value === "bath") {
    pileDiameter.value = 108;
  } else {
    pileDiameter.value = 76;
  }
  updateAvailableOptions();
};

// Расчет количества свай
const calculatePileCount = () => {
  if (inputMode.value === "piles") {
    return pileCount.value;
  }

  const widthMeters = width.value;
  const lengthMeters = length.value;
  const maxStep = usedStep.value;

  const additionalWidthPiles = Math.max(0, Math.ceil(widthMeters / maxStep) - 1);
  const additionalLengthPiles = Math.max(0, Math.ceil(lengthMeters / maxStep) - 1);

  const perimeterPiles = 4 + 2 * additionalWidthPiles + 2 * additionalLengthPiles;
  const internalPiles = Math.max(0, additionalWidthPiles * additionalLengthPiles);

  let totalPiles = perimeterPiles + internalPiles;
  const minPiles = buildingType.value === "house" ? 6 : 4;
  return Math.max(minPiles, totalPiles);
};

// Расчет стоимости
const calculate = () => {
  if (inputMode.value === "dimensions") {
    pileCount.value = calculatePileCount();
  }

  const pilePrice = getPilePrice(pileDiameter.value, wallThickness.value, pileLength.value);
  const pilesCost = pilePrice * pileCount.value;

  const headPrice = getHeadPrice(pileDiameter.value, wallThickness.value, pileLength.value);
  const headsCost = includeHeads.value ? headPrice * pileCount.value : 0;

  const installationPrice = getInstallationPrice(pileDiameter.value);
  const installationCost = includeInstallation.value ? installationPrice * pileCount.value : 0;

  totalCost.value = pilesCost + headsCost + installationCost;
};

// Отправка в Telegram
const sendOrder = async () => {
  sendingStatus.isSending = true;
  sendingStatus.error = null;

  try {
    const message = {
      file_name: customer.name || "Заявка на сваи",
      chat_id: CHATS_ID.BASE,
      topic_id: TOPICS_ID.FOUNDATION,
      text: formatTelegramMessage(),
    };

    const response = await sendMessageTG(message);
    if (response && response.ok) {
      sendingStatus.isSuccess = true;
      successDialog.value = true;
    } else {
      sendingStatus.error = "Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.";
    }
  } catch (err) {
    sendingStatus.error = "Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.";
    console.error("Ошибка отправки:", err);
  } finally {
    sendingStatus.isSending = false;
  }
};

const formatTelegramMessage = () => {
  return `🔨 Заявка на свайный фундамент
  
👤 Контактная информация:
- Имя: ${customer.name || "не указано"}
- Телефон: ${customer.phone || "не указан"}
- Адрес: ${customer.address || "не указан"}

🏠 Параметры строения:
- Тип: ${buildingTypeLabel.value}
- Материал: ${materialLabel.value}
${inputMode.value === "dimensions" ? `- Размеры: ${width.value}м × ${length.value}м` : ""}

⚙️ Параметры свай:
- Количество: ${pileCount.value} шт.
- Диаметр: ${pileDiameter.value} мм
- Длина: ${pileLength.value} м
- Толщина стенки: ${wallThickness.value} мм
${inputMode.value === "dimensions" ? `- Шаг между сваями: ${usedStep.value} м` : ""}

💎 Дополнительно:
- Оголовки: ${includeHeads.value ? "Да" : "Нет"}
- Монтаж: ${includeInstallation.value ? "Да" : "Нет"}

💰 Итого: ${formatCurrency(totalCost.value)}`;
};

// Обработчики телефона
const moveCursorToFirstHash = () => {
  if (customer.phone.length != 18) {
    customer.phone = "+7 ";
  }
};

const onBlur = () => {
  if (customer.phone.length != 18) {
    customer.phone = "";
  }
};

// Инициализация
onMounted(() => {
  updateRecommendedParams();
});

// Следим за изменением режима ввода
watch(inputMode, (newVal) => {
  if (newVal === "dimensions") {
    calculate();
  }
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/main.scss" as *;
@use "sass:color";
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

.submit-btn {
  background: linear-gradient(90deg, #ea5b0c, #ff8c42);
  color: white;
  transition: transform 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.v-stepper {
  box-shadow: none;
}
:deep(.v-stepper-window) {
  margin: 0;
}

.v-text-field,
.v-select {
  margin-bottom: 8px;
}

.v-card {
  transition: all 0.3s ease;
}
</style>
