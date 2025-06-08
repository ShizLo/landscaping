import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Всегда прокручивать вверх при навигации
    return { top: 0 };
  },
};
