<script setup>
import { ROUTES_PATHS } from "../assets/constants";
import axios from "axios";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
import { TOPICS_ID } from "../services/botService";

// Состояния
const dialog = ref(false);
const dateTime = ref(new Date().toISOString());
const selectedDateTime = ref(null);
const form = ref(null);
const isSubmitted = ref(false);
const isLoading = ref(false);

onMounted(() => {
  // if (mobile.value) {
  //   document.querySelectorAll("input, textarea").forEach((input) => {
  //     input.addEventListener("focus", () => {
  //       input.scrollIntoView({ behavior: "smooth", block: "start" });
  //     });
  //   });
  // }
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Форматирование даты и времени
const formattedDateTime = computed(() => {
  const date = new Date(dateTime.value);
  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
});

const updateDateTime = (value) => {
  dateTime.value = value;
  selectedDateTime.value = formattedDateTime.value;
};

const CHATS_ID = {
  BASE: -1002378962422,
  BASE_DEV: -1002383432249,
};
const token = "7564255529:AAELnqPYEHTvtJzwSaf3tnn7JQb4whqx688";

const message = reactive({
  fio: "",
  email: "",
  septik: [],
  address: "",
  communication: [],
});

const isValid = computed(() => {
  return message.fio && message.email.length == 18;
});

const moveCursorToFirstHash = () => {
  if (message.email.length != 18) {
    message.email = "+7 ";
  }
};

const onBlur = () => {
  if (message.email.length != 18) {
    message.email = "";
  }
};

async function sendMessage() {
  const { valid } = await form.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;

  try {
    const formattedText = `
👨🏻 Заявка на сервис
${
  message.fio != "" ||
  message.email != "" ||
  message.address != "" ||
  selectedDateTime.value ||
  message.septik.length > 0 ||
  message.communication.length > 0
    ? `[line]`
    : ""
}
${message.fio != "" ? `ФИО: ${message.fio}` : ""}
${message.email != "" ? `Телефон: ${message.email}` : ""}
${message.address != "" ? `Адрес: ${message.address}` : ""}
${message.septik.length > 0 ? `Септик: ${message.septik.map((task) => `${task}`).join(", ")}` : ""}
${message.communication.length > 0 ? `Связь: ${message.communication.map((task) => `${task}`).join(", ")}` : ""}
${selectedDateTime.value ? `Удобное время: ${selectedDateTime.value}` : ""}
`
      .replace(/\./g, "\\\.")
      .replace(/-/g, "\\-")
      .replace(/\n+/g, "\n")
      .replace(/\s*\[line\]/g, "\n")
      .replace(/=/g, "\\=")
      .replace(/\+/g, "\\+")
      .replace(/>/g, "\\>")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/\]/g, "\\]")
      .replace(/\[/g, "\\[")
      .replace(/_/g, "\\_")
      .replace(/\*/g, "\\*")
      .replace(/~/g, "\\~")
      .replace(/`/g, "\\`")
      .replace(/#/g, "\\#")
      .replace(/\|/g, "\\|")
      .replace(/{/g, "\\{")
      .replace(/}/g, "\\}")
      .replace(/!/g, "\\!")
      .trim();

    await axios
      .post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: CHATS_ID.BASE,
        message_thread_id: TOPICS_ID.SEPTIKS,
        text: formattedText,
        parse_mode: "MarkdownV2",
        polling: true,
      })
      .then(() => {
        setTimeout(() => {
          if (mobile.value) {
            scrollToTop();
          }
          isSubmitted.value = true;
          isLoading.value = false;
          message.fio = "";
          message.email = "";
          message.address = "";
          message.septik = [];
          message.communication = [];
          selectedDateTime.value = null;
        }, 1000);
      });
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    isLoading.value = false;
  }

  document.querySelectorAll(".form__button").forEach((element) => {
    element.addEventListener("touchstart", () => element.classList.add("on-hover"));
    element.addEventListener("touchend", () => element.classList.remove("on-hover"));
  });
}
</script>

<template>
  <section id="service-form" class="service-form-section">
    <div class="_container">
      <v-card class="form-card" elevation="8">
        <div class="form-content">
          <template v-if="!isSubmitted">
            <div class="form-header">
              <v-icon color="#EA5B0C" size="48" class="header-icon">mdi-pipe-disconnected</v-icon>
              <h2 class="form-title">Обслуживание септика или ЛОС</h2>
              <p class="form-subtitle">Оставьте заявку на профессиональное обслуживание</p>
            </div>

            <v-form @submit.prevent="sendMessage" ref="form" class="service-form">
              <v-row>
                <v-col class="pb-0" cols="12" md="6">
                  <v-text-field
                    v-model="message.fio"
                    label="Ваше ФИО"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Обязательное поле']"
                    required
                    prepend-inner-icon="mdi-account"
                    color="#EA5B0C"
                    density="comfortable"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <v-text-field
                    v-model="message.email"
                    label="Номер телефона"
                    variant="outlined"
                    v-maska="'+7 (###) ###-##-##'"
                    placeholder="+7 (___) ___-__-__"
                    :rules="[(v) => !!v || 'Обязательное поле', (v) => (v && v.length === 18) || 'Введите корректный номер']"
                    required
                    prepend-inner-icon="mdi-phone"
                    color="#EA5B0C"
                    density="comfortable"
                    @focus="moveCursorToFirstHash"
                    @blur="onBlur"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <v-select
                    v-model="message.septik"
                    :items="['Евробион', 'Астра', 'Нет в списке']"
                    label="Укажите Ваш септик"
                    variant="outlined"
                    multiple
                    prepend-inner-icon="mdi-barrel"
                    color="#EA5B0C"
                    density="comfortable"
                  ></v-select>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <v-text-field
                    v-model="message.address"
                    label="Адрес дома или № объекта"
                    variant="outlined"
                    prepend-inner-icon="mdi-map-marker-outline"
                    color="#EA5B0C"
                    density="comfortable"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <v-select
                    v-model="message.communication"
                    :items="['Звонок', 'Telegram', 'WhatsApp']"
                    label="Удобный способ связи"
                    variant="outlined"
                    multiple
                    prepend-inner-icon="mdi-forum"
                    color="#EA5B0C"
                    density="comfortable"
                  ></v-select>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <v-menu :close-on-content-click="false" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        v-model="selectedDateTime"
                        label="Выберите дату выезда"
                        variant="outlined"
                        readonly
                        prepend-inner-icon="mdi-clock-outline"
                        color="#EA5B0C"
                        density="comfortable"
                        v-bind="props"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateTime"
                      mode="datetime"
                      is24hr
                      :time-picker-props="{
                        allowedMinutes: (m) => m % 10 === 0,
                      }"
                      @update:modelValue="updateDateTime"
                      class="elevated-picker"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <div class="form-footer">
                <p class="privacy-text">
                  Нажимая кнопку «Отправить», вы соглашаетесь с
                  <nuxt-link :to="{ name: ROUTES_PATHS.POLICY }" class="privacy-link">Политикой конфиденциальности</nuxt-link>
                </p>

                <v-btn
                  type="submit"
                  color="#EA5B0C"
                  :size="mobile ? 'large' : 'x-large'"
                  class="submit-btn"
                  :append-icon="mobile ? '' : 'mdi-send'"
                  :loading="isLoading"
                  :disabled="isLoading || !isValid"
                  block
                >
                  <template v-slot:loader>
                    <v-progress-circular indeterminate color="white" size="24" width="3"></v-progress-circular>
                  </template>
                  Отправить заявку
                </v-btn>
              </div>
            </v-form>
          </template>

          <template v-else>
            <div class="success-message">
              <v-icon color="success" size="64">mdi-check-circle</v-icon>
              <h2 class="success-title">Заявка успешно отправлена!</h2>
              <p class="success-subtitle">Наш специалист свяжется с вами в течение 15 минут</p>
              <v-btn color="#EA5B0C" :size="mobile ? 'large' : 'x-large'" @click="isSubmitted = false" class="new-request-btn">
                Отправить новую заявку
              </v-btn>
            </div>
          </template>
        </div>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.service-form-section {
  padding: 40px 0;
  // background-color: #f5f7fa;
}

.form-card {
  border-radius: 12px;
  overflow: hidden;
  // max-width: 900px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.form-content {
  padding: 40px;

  @media (max-width: 600px) {
    padding: 24px;
  }
}

.form-header {
  text-align: center;
  margin-bottom: 32px;

  .header-icon {
    margin-bottom: 16px;
  }
}

.form-title {
  font-size: 3rem;
  font-weight: 800;
  color: #102938;
  margin-bottom: 8px;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: -0.03em;

  @media (max-width: 600px) {
    font-size: 24px;
  }
}

.form-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 0;
}

.service-form {
  .v-row {
    margin-bottom: 8px;
  }

  .v-input__prepend-inner {
    margin-right: 8px;
  }
}

.form-footer {
  margin-top: 24px;
}

.privacy-text {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-bottom: 16px;
}

.privacy-link {
  color: #ea5b0c;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.submit-btn {
  background: linear-gradient(135deg, #ea5b0c, #ff8c42);
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(234, 91, 12, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(234, 91, 12, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  text-align: center;
}

.success-title {
  font-size: 28px;
  font-weight: 700;
  color: #102938;
  margin: 24px 0 8px;
}

.success-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  max-width: 80%;
}

.new-request-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  color: white;
}

.elevated-picker {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
</style>
