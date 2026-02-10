export const app = document.getElementById("app") as HTMLDivElement;

export function updateDeviceColor() {
  const themeTag = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
  const color = getComputedStyle(app).getPropertyValue("--secondary-bg").trim();
  themeTag.setAttribute("content", color);
}
