import fs from "fs/promises";
import path from "path";
import { globby } from "globby";
import { fileURLToPath } from "url";

// Получаем текущую директорию
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function findUnusedImages() {
  // 1. Папки для проверки (Nuxt 3)
  const imageDirs = [path.join(__dirname, "assets"), path.join(__dirname, "public")];

  // 2. Находим все изображения
  const imagePatterns = ["**/*.{png,jpg,jpeg,gif,svg,webp}"];
  const images = [];

  for (const dir of imageDirs) {
    try {
      const found = await globby(imagePatterns, { cwd: dir });
      images.push(...found.map((img) => path.join(dir, img)));
    } catch (err) {
      console.warn(`Директория ${dir} не найдена, пропускаем`);
    }
  }

  // 3. Находим все файлы проекта (кроме node_modules и .nuxt)
  const projectFiles = await globby(["**/*.{vue,js,ts,jsx,tsx,html,css,scss}", "!node_modules/**", "!.nuxt/**", "!dist/**"]);

  // 4. Ищем упоминания изображений в коде
  const usedImages = new Set();

  for (const file of projectFiles) {
    try {
      const content = await fs.readFile(file, "utf-8");

      for (const img of images) {
        const imgName = path.basename(img);
        const imgPath = path.relative(path.dirname(file), img).replace(/\\/g, "/");

        if (content.includes(imgName) || content.includes(imgPath)) {
          usedImages.add(img);
        }
      }
    } catch (err) {
      console.warn(`Не удалось прочитать файл ${file}: ${err.message}`);
    }
  }

  // 5. Фильтруем неиспользуемые изображения
  const unusedImages = images.filter((img) => !usedImages.has(img));

  // 6. Выводим результат
  if (unusedImages.length > 0) {
    console.log("Неиспользуемые изображения:");
    unusedImages.forEach((img) => console.log(`- ${img}`));
  } else {
    console.log("Неиспользуемых изображений не найдено");
  }
}

findUnusedImages().catch((err) => {
  console.error("Ошибка при выполнении скрипта:", err);
  process.exit(1);
});
