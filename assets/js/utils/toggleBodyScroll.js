export function toggleBodyScroll(value) {
  document.documentElement.style.overflow = value ? "hidden" : "";
  // document.documentElement.style.touchAction = value ? "none" : ""; // для safari
}
