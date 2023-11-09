export class DarkMode {
  public static isEnabled() {
    return document.documentElement.classList.contains('dark');
  }
  public static enable() {
    document.documentElement.classList.add('dark');
  }
  public static disable() {
    document.documentElement.classList.remove('dark');
  }
}
