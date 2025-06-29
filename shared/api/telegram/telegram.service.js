import axios from "axios";
import { CHATS_ID, TOPICS_ID, TOKEN } from "./constants";
import { escapeMarkdownV2, formatMessageText } from "./utils";

const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;

export const TelegramService = {
  async sendMessage(message) {
    try {
      const formattedText = formatMessageText(message);

      await axios.post(`${BASE_URL}/sendMessage`, {
        chat_id: message.chat_id,
        text: formattedText,
        parse_mode: "MarkdownV2",
      });
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      throw error;
    }
  },

  async sendTextMessage(message) {
    try {
      const formattedText = escapeMarkdownV2(message.text);

      await axios.post(`${BASE_URL}/sendMessage`, {
        chat_id: message.chat_id,
        text: formattedText,
        parse_mode: "MarkdownV2",
        message_thread_id: message.topic_id,
      });
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      throw error;
    }
  },

  async sendMessageAsFile(message) {
    try {
      const formattedText = message.text
        .replace(/\s*\[line\]/g, "\n")
        .replace(/\n+/g, "\n")
        .trim();

      const blob = new Blob([formattedText], { type: "text/plain" });
      const formData = new FormData();
      formData.append("document", blob, message.file_name + ".txt");
      formData.append("chat_id", message.chat_id);
      formData.append("message_thread_id", message.topic_id);

      const response = await axios.post(`${BASE_URL}/sendDocument`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      throw error;
    }
  },

  async sendMediaGroup(message) {
    try {
      const media = message.screenshots.value.map((file, index) => ({
        type: "photo",
        media: `attach://photo${index}`,
        caption: index === 0 ? `📌 Отклик на вакансию\nИмя: ${message.name}\nКонтакт: ${message.email}` : undefined,
      }));

      const formData = new FormData();
      formData.append("chat_id", CHATS_ID.BASE_DEV);
      formData.append("message_thread_id", TOPICS_ID.DEV);

      message.screenshots.value.forEach((file, index) => {
        formData.append(`photo${index}`, file);
      });

      formData.append("media", JSON.stringify(media));

      const response = await axios.post(`${BASE_URL}/sendMediaGroup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error("Ошибка отправки файлов:", error.response?.data || error.message);
      throw error;
    }
  },
};
