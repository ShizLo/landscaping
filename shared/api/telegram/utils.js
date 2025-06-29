// export function escapeMarkdownV2(text) {
//   return text
//     .replace(/\./g, "\\.")
//     .replace(/-/g, "\\-")
//     .replace(/\n+/g, "\n")
//     .replace(/\s*\[line\]/g, "\n")
//     .replace(/=/g, "\\=")
//     .replace(/>/g, "\\>")
//     .replace(/\+/g, "\\+")
//     .replace(/\(/g, "\\(")
//     .replace(/\)/g, "\\)")
//     .replace(/\]/g, "\\]")
//     .replace(/\[/g, "\\[")
//     .replace(/_/g, "\\_")
//     .replace(/\*/g, "\\*")
//     .replace(/~/g, "\\~")
//     .replace(/`/g, "\\`")
//     .replace(/#/g, "\\#")
//     .replace(/\|/g, "\\|")
//     .replace(/{/g, "\\{")
//     .replace(/}/g, "\\}")
//     .replace(/!/g, "\\!")
//     .trim();
// }

export function escapeMarkdownV2(text) {
  if (typeof text !== "string") {
    // Если передано не строковое значение (число, массив и т.д.)
    text = String(text);
  }

  // Порядок замен важен - сначала экранируем обратный слеш
  return (
    text
      .replace(/\\/g, "\\\\") // Экранируем сам обратный слеш в первую очередь
      .replace(/_/g, "\\_")
      .replace(/\*/g, "\\*")
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/~/g, "\\~")
      .replace(/`/g, "\\`")
      .replace(/>/g, "\\>")
      .replace(/#/g, "\\#")
      .replace(/\+/g, "\\+")
      .replace(/-/g, "\\-")
      .replace(/=/g, "\\=")
      .replace(/\|/g, "\\|")
      .replace(/{/g, "\\{")
      .replace(/}/g, "\\}")
      .replace(/\./g, "\\.")
      .replace(/!/g, "\\!")
      // Обработка переносов строк (сохраняем оригинальные переносы)
      .replace(/\r\n/g, "\n") // Нормализуем Windows (\r\n) -> Unix (\n)
      .replace(/\n+/g, "\n") // Удаляем дублированные переносы
      .trim()
  );
}

export function formatMessageText(message) {
  return `
*${message.text.header}*
${message.variables.city ? `${message.text.city}${message.variables.city}` : ""}
${
  message.variables.service
    ? `${message.text.service} ![🚨](tg://emoji?id=5458425656759032455)
${message.variables.service.map((task) => `\\- ${task}`).join("\n")}`
    : ""
}
${message.variables.name ? `${message.text.name}${message.variables.name}` : ""}
`;
}
