<script setup>
import { ref, computed, reactive, watch } from "vue";
import { useDisplay } from "vuetify";
import { ROUTES_PATHS } from "../assets/constants";
import { TelegramService } from "@/shared/api/telegram/telegram.service";
import { CHATS_ID, TOPICS_ID } from "@/shared/api/telegram/constants";

const { mobile } = useDisplay();

const dialog = ref(true);
const emit = defineEmits(["isVisible"]);
const form = ref(null);
const isSubmitted = ref(false);
const timeoutId = ref(null);

const props = defineProps({
  services: {
    type: Array,
    default: () => [],
  },
});

const message = reactive({
  fio: "",
  phone: "",
  bid: [],
  address: "",
  communication: [],
  notes: "",
});

const dateTime = ref(new Date().toISOString());
const selectedDateTime = ref(null);

const rules = {
  required: (value) => !!value || "Обязательное поле",
  phone: (value) => value.length === 18 || "Введите корректный телефон",
};

const isValid = computed(() => {
  return message.fio && message.phone.length == 18;
});

const formattedDateTime = computed(() => {
  const date = new Date(dateTime.value);
  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
});

const moveCursorToFirstHash = () => {
  if (message.phone.length != 18) {
    message.phone = "+7 ";
  }
};

const onBlur = () => {
  if (message.phone.length != 18) {
    message.phone = "";
  }
};

const updateDateTime = (value) => {
  dateTime.value = value;
  selectedDateTime.value = formattedDateTime.value;
};

const scrollToTextarea = (event) => {
  if (mobile.value) {
    const dialog = document.querySelector(".custom-dialog");
    setTimeout(() => {
      dialog.scrollTop = event.target.offsetTop - 100;
    }, 300);
  }
};

const handleDialogClose = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
  emit("isVisible");
};

const resetForm = () => {
  message.fio = "";
  message.phone = "";
  message.bid = [];
  message.address = "";
  message.communication = [];
  message.notes = "";
  selectedDateTime.value = null;
  isSubmitted.value = false;
};

const startCloseTimer = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }

  timeoutId.value = setTimeout(() => {
    dialog.value = false;
    handleDialogClose();
  }, 3000);
};

const formatServiceMessage = () => {
  // Преобразуем bid в массив, если это строка
  const bids = Array.isArray(message.bid) ? message.bid : [message.bid].filter(Boolean);

  const fields = [
    message.fio && `ФИО: ${message.fio}`,
    message.phone && `Телефон: ${message.phone}`,
    message.address && `Адрес: ${message.address}`,
    bids.length > 0 && `Услуга: ${bids.join(", ")}`,
    message.communication.length > 0 && `Связь: ${message.communication.join(", ")}`,
    selectedDateTime.value && `Дата звонка: ${selectedDateTime.value}`,
    message.notes && `Примечания: ${message.notes}`,
  ].filter(Boolean);

  return `
👨🏻 Заявка на услугу
${fields.length ? "\n" + fields.join("\n") : ""}
  `;
};

async function sendMessage() {
  const { valid } = await form.value.validate();
  if (!valid) return;

  try {
    const messageText = formatServiceMessage();

    await TelegramService.sendTextMessage({
      chat_id: CHATS_ID.BASE,
      text: messageText,
      topic_id: TOPICS_ID.SERVICES,
    });

    isSubmitted.value = true;
    startCloseTimer();
  } catch (error) {
    console.error("Ошибка отправки:", error);
    isSubmitted.value = false;

    // Показываем пользователю ошибку (можно добавить toast/snackbar)
    alert("Не удалось отправить заявку. Пожалуйста, попробуйте позже или позвоните нам.");
  }
}

watch(dialog, (newVal) => {
  if (!newVal) handleDialogClose();
});
</script>

<template>
  <div class="dialog-feedback">
    <v-dialog
      scrim="false"
      content-class="custom-dialog"
      v-model="dialog"
      width="auto"
      :fullscreen="mobile"
      transition="dialog-bottom-transition"
      @click:outside="handleDialogClose"
    >
      <v-card :width="mobile ? '95%' : 900" class="pt-1 pt-md-5 px-0 px-md-4">
        <template v-if="!isSubmitted">
          <v-card-title class="d-flex justify-space-between align-center px-4">
            <div class="d-flex align-center">
              <v-icon color="orange-darken-2" class="mr-2">mdi-account-box-outline</v-icon>
              <h2 class="text-h5 font-weight-bold">Оставьте заявку</h2>
            </div>
            <v-btn icon @click="dialog = false" variant="text">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider class="my-2 border-opacity-100"></v-divider>

          <v-card-text class="py-1 py-md-4 px-4">
            <p class="text-body-1 text-medium-emphasis mb-6">Мы свяжемся с Вами в ближайшее время</p>

            <v-form ref="form" @submit.prevent="sendMessage">
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="message.fio"
                    :rules="[rules.required]"
                    variant="outlined"
                    prepend-inner-icon="mdi-account-outline"
                    label="Ваше имя*"
                    placeholder="Иван Иванов"
                    density="comfortable"
                    color="orange-darken-2"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="message.phone"
                    :rules="[rules.required, rules.phone]"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone-outline"
                    v-maska="'+7 (###) ###-##-##'"
                    placeholder="+7 (___) ___-__-__"
                    label="Телефон*"
                    density="comfortable"
                    color="orange-darken-2"
                    @focus="moveCursorToFirstHash"
                    @blur="onBlur"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="message.bid"
                    :items="services"
                    :rules="[rules.required]"
                    variant="outlined"
                    label="Что вас интересует?*"
                    prepend-inner-icon="mdi-help-circle-outline"
                    density="comfortable"
                    color="orange-darken-2"
                    hide-details="auto"
                  ></v-select>
                </v-col>

                <!-- <v-col cols="12" md="6">
                  <v-text-field
                    v-model="message.address"
                    variant="outlined"
                    prepend-inner-icon="mdi-map-marker-outline"
                    label="Адрес или номер объекта"
                    placeholder="ул. Примерная, 123"
                    density="comfortable"
                    color="orange-darken-2"
                    hide-details="auto"
                  ></v-text-field>
                </v-col> -->

                <!-- <v-col cols="12" md="6">
                  <v-select
                    v-model="message.communication"
                    :items="['Звонок', 'Telegram', 'WhatsApp']"
                    variant="outlined"
                    label="Предпочтительный способ связи"
                    prepend-inner-icon="mdi-message-text-outline"
                    density="comfortable"
                    color="orange-darken-2"
                    multiple
                    hide-details="auto"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-menu :close-on-content-click="false" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        variant="outlined"
                        v-model="selectedDateTime"
                        label="Удобная дата для звонка"
                        readonly
                        prepend-inner-icon="mdi-clock-outline"
                        density="comfortable"
                        color="orange-darken-2"
                        v-bind="props"
                        hide-details="auto"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateTime"
                      mode="datetime"
                      is24hr
                      :valid-hours="{ min: 9, max: 18 }"
                      :time-picker-props="{ allowedMinutes: (m) => m % 10 === 0 }"
                      @update:modelValue="updateDateTime"
                      class="elevated-picker"
                    ></v-date-picker>
                  </v-menu>
                </v-col> -->

                <v-col cols="12">
                  <v-textarea
                    v-model="message.notes"
                    variant="outlined"
                    label="Примечания"
                    placeholder="Дополнительная информация"
                    rows="2"
                    auto-grow
                    density="comfortable"
                    color="orange-darken-2"
                    @focus="scrollToTextarea"
                    hide-details="auto"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" class="mt-2">
                  <v-btn
                    :disabled="!isValid"
                    block
                    size="large"
                    variant="flat"
                    type="submit"
                    :append-icon="mobile ? '' : 'mdi-send'"
                    class="submit-btn"
                  >
                    Отправить заявку
                  </v-btn>
                </v-col>

                <v-col cols="12" class="text-center mt-2">
                  <p class="text-caption text-medium-emphasis">
                    Нажимая кнопку, вы соглашаетесь с
                    <nuxt-link :to="{ name: ROUTES_PATHS.POLICY }" class="text-primary text-decoration-none"
                      >политикой конфиденциальности</nuxt-link
                    >
                  </p>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </template>

        <template v-else>
          <div class="success-message pa-6 text-center">
            <v-icon color="success" size="64" class="mb-4">mdi-check-circle</v-icon>
            <h2 class="text-h4 font-weight-bold mb-2">Заявка успешно отправлена!</h2>
            <p class="text-body-1 text-medium-emphasis mb-6">Мы свяжемся с вами в ближайшее время</p>
            <v-btn
              color="primary"
              :size="mobile ? 'large' : 'x-large'"
              class="submit-btn"
              @click="resetForm"
              :append-icon="mobile ? '' : 'mdi-send'"
            >
              Отправить новую заявку
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.submit-btn {
  background: linear-gradient(90deg, #ea5b0c, #ff8c42);
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(234, 91, 12, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.v-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  padding: 16px 24px;
}

.v-text-field,
.v-select,
.v-textarea {
  &::v-deep(.v-field) {
    border-radius: 8px;
  }
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
}

@media (max-width: 600px) {
  .v-card {
    margin: 0;
    max-width: calc(100% - 20px);
  }

  .v-card-title {
    padding: 12px 16px;
  }
}

.elevated-picker {
  position: relative;
  z-index: 2500;
}
</style>
